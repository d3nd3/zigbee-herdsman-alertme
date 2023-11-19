"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableRtsTimeout = exports.disableRTS = exports.enableRTS = exports.readyToSend = exports.apsBusyQueue = exports.busyQueue = void 0;
/* istanbul ignore file */
/* eslint-disable */
const debug_1 = __importDefault(require("debug"));
const events_1 = __importDefault(require("events"));
const writer_1 = __importDefault(require("./writer"));
const parser_1 = __importDefault(require("./parser"));
const constants_1 = __importDefault(require("./constants"));
const serialPort_1 = require("../../serialPort");
const serialPortUtils_1 = __importDefault(require("../../serialPortUtils"));
const socketPortUtils_1 = __importDefault(require("../../socketPortUtils"));
const net_1 = __importDefault(require("net"));
// @ts-ignore
const slip_1 = __importDefault(require("slip"));
const debug = (0, debug_1.default)('zigbee-herdsman:deconz:driver');
const autoDetectDefinitions = [
    { manufacturer: 'dresden elektronik ingenieurtechnik GmbH', vendorId: '1cf1', productId: '0030' }, // Conbee II
];
var queue = [];
var busyQueue = [];
exports.busyQueue = busyQueue;
var apsQueue = [];
var apsBusyQueue = [];
exports.apsBusyQueue = apsBusyQueue;
var apsConfirmIndQueue = [];
var timeoutCounter = 0;
var readyToSend = true;
exports.readyToSend = readyToSend;
var currentBaudRate = 0;
function enableRTS() {
    if (readyToSend === false) {
        exports.readyToSend = readyToSend = true;
    }
}
exports.enableRTS = enableRTS;
function disableRTS() {
    exports.readyToSend = readyToSend = false;
}
exports.disableRTS = disableRTS;
var enableRtsTimeout = null;
exports.enableRtsTimeout = enableRtsTimeout;
var frameParser = require('./frameParser');
const littleEndian = true;
class Driver extends events_1.default.EventEmitter {
    constructor(path) {
        super();
        this.frameParserEvent = frameParser.frameParserEvents;
        this.intervals = [];
        this.path = path;
        this.initialized = false;
        this.seqNumber = 0;
        this.timeoutResetTimeout = null;
        this.portType = socketPortUtils_1.default.isTcpPath(path) ? 'socket' : 'serial';
        this.apsRequestFreeSlots = 1;
        this.apsDataConfirm = 0;
        this.apsDataIndication = 0;
        this.configChanged = 0;
        this.DELAY = 0;
        this.READY_TO_SEND_TIMEOUT = 1;
        this.HANDLE_DEVICE_STATUS_DELAY = 5;
        this.PROCESS_QUEUES = 5;
        const that = this;
        setInterval(() => {
            that.deviceStateRequest()
                .then(result => { })
                .catch(error => { });
        }, 10000);
        setInterval(() => {
            that.writeParameterRequest(0x26, 600) // reset watchdog // 10 minutes
                .then(result => { })
                .catch(error => {
                //try again
                debug("try again to reset watchdog");
                that.writeParameterRequest(0x26, 600)
                    .then(result => { })
                    .catch(error => { debug("warning watchdog was not reset"); });
            });
        }, (1000 * 60 * 8)); // 8 minutes
        this.onParsed = this.onParsed.bind(this);
        this.frameParserEvent.on('receivedDataNotification', (data) => { this.catchPromise(this.checkDeviceStatus(data)); });
        this.on('close', () => {
            this.intervals.forEach(i => clearInterval(i));
            queue.length = 0;
            busyQueue.length = 0;
            apsQueue.length = 0;
            apsBusyQueue.length = 0;
            apsConfirmIndQueue.length = 0;
            timeoutCounter = 0;
        });
    }
    registerInterval(interval) {
        this.intervals.push(interval);
    }
    catchPromise(val) {
        return Promise.resolve(val)
            .catch(err => debug(`Promise was caught with reason: ${err}`));
    }
    setDelay(delay) {
        debug(`Set delay to ${delay}`);
        this.DELAY = delay;
        this.READY_TO_SEND_TIMEOUT = delay;
        this.PROCESS_QUEUES = delay;
        this.HANDLE_DEVICE_STATUS_DELAY = delay;
        if (this.READY_TO_SEND_TIMEOUT === 0) {
            this.READY_TO_SEND_TIMEOUT = 1;
        }
        if (this.PROCESS_QUEUES < 5) {
            this.PROCESS_QUEUES = 5;
        }
        if (this.HANDLE_DEVICE_STATUS_DELAY < 5) {
            this.HANDLE_DEVICE_STATUS_DELAY = 5;
        }
        if (this.PROCESS_QUEUES > 60) {
            this.PROCESS_QUEUES = 60;
        }
        if (this.HANDLE_DEVICE_STATUS_DELAY > 60) {
            this.HANDLE_DEVICE_STATUS_DELAY = 60;
        }
        const that = this;
        this.registerInterval(setInterval(() => { that.processQueue(); }, this.PROCESS_QUEUES)); // fire non aps requests
        this.registerInterval(setInterval(() => { this.catchPromise(that.processBusyQueue()); }, this.PROCESS_QUEUES)); // check timeouts for non aps requests
        this.registerInterval(setInterval(() => { this.catchPromise(that.processApsQueue()); }, this.PROCESS_QUEUES)); // fire aps request
        this.registerInterval(setInterval(() => { that.processApsBusyQueue(); }, this.PROCESS_QUEUES)); // check timeouts for all open aps requests
        this.registerInterval(setInterval(() => { this.catchPromise(that.processApsConfirmIndQueue()); }, this.PROCESS_QUEUES)); // fire aps indications and confirms
        this.registerInterval(setInterval(() => { this.catchPromise(that.handleDeviceStatus()); }, this.HANDLE_DEVICE_STATUS_DELAY)); // query confirm and indication requests
    }
    static async isValidPath(path) {
        return serialPortUtils_1.default.is(path, autoDetectDefinitions);
    }
    static async autoDetectPath() {
        const paths = await serialPortUtils_1.default.find(autoDetectDefinitions);
        return paths.length > 0 ? paths[0] : null;
    }
    onPortClose() {
        debug('Port closed');
        this.initialized = false;
        this.emit('close');
    }
    async open(baudrate) {
        currentBaudRate = baudrate;
        return this.portType === 'serial' ? this.openSerialPort(baudrate) : this.openSocketPort();
    }
    openSerialPort(baudrate) {
        debug(`Opening with ${this.path}`);
        this.serialPort = new serialPort_1.SerialPort({ path: this.path, baudRate: baudrate, autoOpen: false }); //38400 RaspBee //115200 ConBee3
        this.writer = new writer_1.default();
        // @ts-ignore
        this.writer.pipe(this.serialPort);
        this.parser = new parser_1.default();
        this.serialPort.pipe(this.parser);
        this.parser.on('parsed', this.onParsed);
        return new Promise((resolve, reject) => {
            this.serialPort.open(async (error) => {
                if (error) {
                    reject(new Error(`Error while opening serialport '${error}'`));
                    this.initialized = false;
                    if (this.serialPort.isOpen) {
                        this.serialPort.close();
                    }
                }
                else {
                    debug('Serialport opened');
                    this.initialized = true;
                    resolve();
                }
            });
        });
    }
    async openSocketPort() {
        const info = socketPortUtils_1.default.parseTcpPath(this.path);
        debug(`Opening TCP socket with ${info.host}:${info.port}`);
        this.socketPort = new net_1.default.Socket();
        this.socketPort.setNoDelay(true);
        this.socketPort.setKeepAlive(true, 15000);
        this.writer = new writer_1.default();
        this.writer.pipe(this.socketPort);
        this.parser = new parser_1.default();
        this.socketPort.pipe(this.parser);
        this.parser.on('parsed', this.onParsed);
        return new Promise((resolve, reject) => {
            this.socketPort.on('connect', function () {
                debug('Socket connected');
            });
            // eslint-disable-next-line
            const self = this;
            this.socketPort.on('ready', async function () {
                debug('Socket ready');
                self.initialized = true;
                resolve();
            });
            this.socketPort.once('close', this.onPortClose);
            this.socketPort.on('error', function () {
                debug('Socket error');
                reject(new Error(`Error while opening socket`));
                self.initialized = false;
            });
            this.socketPort.connect(info.port, info.host);
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            if (this.initialized) {
                if (this.portType === 'serial') {
                    this.serialPort.flush(() => {
                        this.serialPort.close((error) => {
                            this.initialized = false;
                            error == null ?
                                resolve() :
                                reject(new Error(`Error while closing serialport '${error}'`));
                            this.emit('close');
                        });
                    });
                }
                else {
                    this.socketPort.destroy();
                    resolve();
                }
            }
            else {
                resolve();
                this.emit('close');
            }
        });
    }
    readParameterRequest(parameterId) {
        const seqNumber = this.nextSeqNumber();
        return new Promise((resolve, reject) => {
            //debug(`push read parameter request to queue. seqNr: ${seqNumber} paramId: ${parameterId}`);
            const ts = 0;
            const commandId = constants_1.default.PARAM.FrameType.ReadParameter;
            const req = { commandId, parameterId, seqNumber, resolve, reject, ts };
            queue.push(req);
        });
    }
    writeParameterRequest(parameterId, parameter) {
        const seqNumber = this.nextSeqNumber();
        return new Promise((resolve, reject) => {
            //debug(`push write parameter request to queue. seqNr: ${seqNumber} paramId: ${parameterId} parameter: ${parameter}`);
            const ts = 0;
            const commandId = constants_1.default.PARAM.FrameType.WriteParameter;
            const req = { commandId, parameterId, parameter, seqNumber, resolve, reject, ts };
            queue.push(req);
        });
    }
    readFirmwareVersionRequest() {
        const seqNumber = this.nextSeqNumber();
        return new Promise((resolve, reject) => {
            //debug(`push read firmware version request to queue. seqNr: ${seqNumber}`);
            const ts = 0;
            const commandId = constants_1.default.PARAM.FrameType.ReadFirmwareVersion;
            const req = { commandId, seqNumber, resolve, reject, ts };
            queue.push(req);
        });
    }
    sendReadParameterRequest(parameterId, seqNumber) {
        /* command id, sequence number, 0, framelength(U16), payloadlength(U16), parameter id */
        const requestFrame = [constants_1.default.PARAM.FrameType.ReadParameter, seqNumber, 0x00, 0x08, 0x00, 0x01, 0x00, parameterId];
        if (parameterId === constants_1.default.PARAM.Network.NETWORK_KEY) {
            const requestFrame2 = [constants_1.default.PARAM.FrameType.ReadParameter, seqNumber, 0x00, 0x09, 0x00, 0x02, 0x00, parameterId, 0x00];
            this.sendRequest(requestFrame2);
        }
        else {
            this.sendRequest(requestFrame);
        }
    }
    sendWriteParameterRequest(parameterId, value, seqNumber) {
        /* command id, sequence number, 0, framelength(U16), payloadlength(U16), parameter id, pameter */
        let parameterLength = 0;
        if (parameterId === constants_1.default.PARAM.STK.Endpoint) {
            let arrayParameterValue = value;
            parameterLength = arrayParameterValue.length;
        }
        else {
            parameterLength = this.getLengthOfParameter(parameterId);
        }
        //debug("SEND WRITE_PARAMETER Request - parameter id: " + parameterId + " value: " + value.toString(16) + " length: " + parameterLength);
        const payloadLength = 1 + parameterLength;
        const frameLength = 7 + payloadLength;
        const fLength1 = frameLength & 0xff;
        const fLength2 = frameLength >> 8;
        const pLength1 = payloadLength & 0xff;
        const pLength2 = payloadLength >> 8;
        if (parameterId === constants_1.default.PARAM.Network.NETWORK_KEY) {
            const requestFrame2 = [constants_1.default.PARAM.FrameType.WriteParameter, seqNumber, 0x00, 0x19, 0x00, 0x12, 0x00, parameterId, 0x00].concat(value);
            this.sendRequest(requestFrame2);
        }
        else {
            const requestframe = [constants_1.default.PARAM.FrameType.WriteParameter, seqNumber, 0x00, fLength1, fLength2, pLength1, pLength2, parameterId].concat(this.parameterBuffer(value, parameterLength));
            this.sendRequest(requestframe);
        }
    }
    getLengthOfParameter(parameterId) {
        switch (parameterId) {
            case 9:
            case 16:
            case 21:
            case 28:
            case 33:
            case 36:
                return 1;
            case 5:
            case 7:
            case 34:
                return 2;
            case 10:
            case 38:
                return 4;
            case 1:
            case 8:
            case 11:
            case 14:
                return 8;
            case 24:
            case 25:
                return 16;
            default:
                return 0;
        }
    }
    parameterBuffer(parameter, parameterLength) {
        const paramArray = new Array();
        if (typeof parameter === 'number') {
            // for parameter <= 4 Byte
            if (parameterLength > 4)
                throw new Error("parameter to big for type number");
            for (let i = 0; i < parameterLength; i++) {
                paramArray[i] = (parameter >> (8 * i)) & 0xff;
            }
        }
        else {
            return parameter.reverse();
        }
        return paramArray;
    }
    sendReadFirmwareVersionRequest(seqNumber) {
        /* command id, sequence number, 0, framelength(U16) */
        const requestFrame = [constants_1.default.PARAM.FrameType.ReadFirmwareVersion, seqNumber, 0x00, 0x09, 0x00, 0x00, 0x00, 0x00, 0x00];
        //debug(requestFrame);
        this.sendRequest(requestFrame);
    }
    sendReadDeviceStateRequest(seqNumber) {
        /* command id, sequence number, 0, framelength(U16) */
        const requestFrame = [constants_1.default.PARAM.FrameType.ReadDeviceState, seqNumber, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00];
        this.sendRequest(requestFrame);
    }
    sendRequest(buffer) {
        const crc = this.calcCrc(Buffer.from(buffer));
        const frame = Buffer.from(buffer.concat([crc[0], crc[1]]));
        const slipframe = slip_1.default.encode(frame);
        if (this.portType === 'serial') {
            this.serialPort.write(slipframe, function (err) {
                if (err) {
                    debug("Error writing serial Port: " + err.message);
                }
            });
        }
        else {
            this.socketPort.write(slipframe, function (err) {
                if (err) {
                    debug("Error writing socket Port: " + err.message);
                }
            });
        }
    }
    processQueue() {
        if (queue.length === 0) {
            return;
        }
        if (busyQueue.length > 0) {
            return;
        }
        const req = queue.shift();
        req.ts = Date.now();
        switch (req.commandId) {
            case constants_1.default.PARAM.FrameType.ReadParameter:
                debug(`send read parameter request from queue. seqNr: ${req.seqNumber} paramId: ${req.parameterId}`);
                this.sendReadParameterRequest(req.parameterId, req.seqNumber);
                break;
            case constants_1.default.PARAM.FrameType.WriteParameter:
                debug(`send write parameter request from queue. seqNr: ${req.seqNumber} paramId: ${req.parameterId} param: ${req.parameter}`);
                this.sendWriteParameterRequest(req.parameterId, req.parameter, req.seqNumber);
                break;
            case constants_1.default.PARAM.FrameType.ReadFirmwareVersion:
                debug(`send read firmware version request from queue. seqNr: ${req.seqNumber}`);
                this.sendReadFirmwareVersionRequest(req.seqNumber);
                break;
            case constants_1.default.PARAM.FrameType.ReadDeviceState:
                debug(`send read device state from queue. seqNr: ${req.seqNumber}`);
                this.sendReadDeviceStateRequest(req.seqNumber);
                break;
            case constants_1.default.PARAM.NetworkState.CHANGE_NETWORK_STATE:
                debug(`send change network state request from queue. seqNr: ${req.seqNumber}`);
                this.sendChangeNetworkStateRequest(req.seqNumber, req.networkState);
                break;
            default:
                throw new Error("process queue - unknown command id");
                break;
        }
        busyQueue.push(req);
    }
    async processBusyQueue() {
        var _a;
        let i = busyQueue.length;
        while (i--) {
            const req = busyQueue[i];
            const now = Date.now();
            if ((now - req.ts) > 10000) {
                debug(`Timeout for request - CMD: 0x${req.commandId.toString(16)} seqNr: ${req.seqNumber}`);
                //remove from busyQueue
                busyQueue.splice(i, 1);
                timeoutCounter++;
                // after a timeout the timeoutcounter will be reset after 1 min. If another timeout happen then the timeoutcounter
                // will not be reset
                clearTimeout(this.timeoutResetTimeout);
                this.timeoutResetTimeout = null;
                this.resetTimeoutCounterAfter1min();
                req.reject("TIMEOUT");
                if (timeoutCounter >= 2) {
                    timeoutCounter = 0;
                    debug("too many timeouts - restart serial connecion");
                    if ((_a = this.serialPort) === null || _a === void 0 ? void 0 : _a.isOpen) {
                        this.serialPort.close();
                    }
                    if (this.socketPort) {
                        this.socketPort.destroy();
                    }
                    await this.open(currentBaudRate);
                }
            }
        }
    }
    changeNetworkStateRequest(networkState) {
        const seqNumber = this.nextSeqNumber();
        return new Promise((resolve, reject) => {
            //debug(`push change network state request to apsQueue. seqNr: ${seqNumber}`);
            const ts = 0;
            const commandId = constants_1.default.PARAM.NetworkState.CHANGE_NETWORK_STATE;
            const req = { commandId, networkState, seqNumber, resolve, reject, ts };
            queue.push(req);
        });
    }
    sendChangeNetworkStateRequest(seqNumber, networkState) {
        const requestFrame = [constants_1.default.PARAM.NetworkState.CHANGE_NETWORK_STATE, seqNumber, 0x00, 0x06, 0x00, networkState];
        this.sendRequest(requestFrame);
    }
    deviceStateRequest() {
        const seqNumber = this.nextSeqNumber();
        return new Promise((resolve, reject) => {
            //debug(`DEVICE_STATE Request - seqNr: ${seqNumber}`);
            const ts = 0;
            const commandId = constants_1.default.PARAM.FrameType.ReadDeviceState;
            const req = { commandId, seqNumber, resolve, reject, ts };
            queue.push(req);
        });
    }
    async checkDeviceStatus(currentDeviceStatus) {
        const networkState = currentDeviceStatus & 0x03;
        this.apsDataConfirm = (currentDeviceStatus >> 2) & 0x01;
        this.apsDataIndication = (currentDeviceStatus >> 3) & 0x01;
        this.configChanged = (currentDeviceStatus >> 4) & 0x01;
        this.apsRequestFreeSlots = (currentDeviceStatus >> 5) & 0x01;
        debug("networkstate: " + networkState + " apsDataConfirm: " + this.apsDataConfirm + " apsDataIndication: " + this.apsDataIndication +
            " configChanged: " + this.configChanged + " apsRequestFreeSlots: " + this.apsRequestFreeSlots);
    }
    async handleDeviceStatus() {
        if (this.apsDataConfirm === 1) {
            try {
                debug("query aps data confirm");
                this.apsDataConfirm = 0;
                const x = await this.querySendDataStateRequest();
            }
            catch (e) {
                if (e.status === 5) {
                    this.apsDataConfirm = 0;
                }
            }
        }
        if (this.apsDataIndication === 1) {
            try {
                debug("query aps data indication");
                this.apsDataIndication = 0;
                const x = await this.readReceivedDataRequest();
            }
            catch (e) {
                if (e.status === 5) {
                    this.apsDataIndication = 0;
                }
            }
        }
        if (this.configChanged === 1) {
            // when network settings changed
        }
    }
    // DATA_IND
    readReceivedDataRequest() {
        const seqNumber = this.nextSeqNumber();
        return new Promise((resolve, reject) => {
            //debug(`push read received data request to apsQueue. seqNr: ${seqNumber}`);
            const ts = 0;
            const commandId = constants_1.default.PARAM.APS.DATA_INDICATION;
            const req = { commandId, seqNumber, resolve, reject, ts };
            apsConfirmIndQueue.push(req);
        });
    }
    // DATA_REQ
    enqueueSendDataRequest(request) {
        const seqNumber = this.nextSeqNumber();
        return new Promise((resolve, reject) => {
            //debug(`push enqueue send data request to apsQueue. seqNr: ${seqNumber}`);
            const ts = 0;
            const requestId = request.requestId;
            const commandId = constants_1.default.PARAM.APS.DATA_REQUEST;
            const req = { commandId, seqNumber, request, resolve, reject, ts };
            apsQueue.push(req);
        });
    }
    // DATA_CONF
    querySendDataStateRequest() {
        const seqNumber = this.nextSeqNumber();
        return new Promise((resolve, reject) => {
            //debug(`push query send data state request to apsQueue. seqNr: ${seqNumber}`);
            const ts = 0;
            const commandId = constants_1.default.PARAM.APS.DATA_CONFIRM;
            const req = { commandId, seqNumber, resolve, reject, ts };
            apsConfirmIndQueue.push(req);
        });
    }
    async processApsQueue() {
        if (apsQueue.length === 0) {
            return;
        }
        if (this.apsRequestFreeSlots !== 1) {
            debug("no free slots. Delay sending of APS Request");
            await this.sleep(1000);
            return;
        }
        const req = apsQueue.shift();
        req.ts = Date.now();
        switch (req.commandId) {
            case constants_1.default.PARAM.APS.DATA_REQUEST:
                if (readyToSend === false) { // wait until last request was confirmed or given time elapsed
                    debug("delay sending of APS Request");
                    apsQueue.unshift(req);
                    break;
                }
                else {
                    disableRTS();
                    exports.enableRtsTimeout = enableRtsTimeout = setTimeout(function () { enableRTS(); }, this.READY_TO_SEND_TIMEOUT);
                    apsBusyQueue.push(req);
                    this.sendEnqueueSendDataRequest(req.request, req.seqNumber);
                    break;
                }
            default:
                throw new Error("process APS queue - unknown command id");
                break;
        }
    }
    async processApsConfirmIndQueue() {
        if (apsConfirmIndQueue.length === 0) {
            return;
        }
        const req = apsConfirmIndQueue.shift();
        req.ts = Date.now();
        apsBusyQueue.push(req);
        switch (req.commandId) {
            case constants_1.default.PARAM.APS.DATA_INDICATION:
                //debug(`read received data request. seqNr: ${req.seqNumber}`);
                if (this.DELAY === 0) {
                    this.sendReadReceivedDataRequest(req.seqNumber);
                }
                else {
                    await this.sendReadReceivedDataRequest(req.seqNumber);
                }
                break;
            case constants_1.default.PARAM.APS.DATA_CONFIRM:
                //debug(`query send data state request. seqNr: ${req.seqNumber}`);
                if (this.DELAY === 0) {
                    this.sendQueryDataStateRequest(req.seqNumber);
                }
                else {
                    await this.sendQueryDataStateRequest(req.seqNumber);
                }
                break;
            default:
                throw new Error("process APS Confirm/Ind queue - unknown command id");
                break;
        }
    }
    sendQueryDataStateRequest(seqNumber) {
        debug(`DATA_CONFIRM - sending data state request - SeqNr. ${seqNumber}`);
        const requestFrame = [constants_1.default.PARAM.APS.DATA_CONFIRM, seqNumber, 0x00, 0x07, 0x00, 0x00, 0x00];
        this.sendRequest(requestFrame);
    }
    sendReadReceivedDataRequest(seqNumber) {
        debug(`DATA_INDICATION - sending read data request - SeqNr. ${seqNumber}`);
        // payloadlength = 0, flag = none
        const requestFrame = [constants_1.default.PARAM.APS.DATA_INDICATION, seqNumber, 0x00, 0x08, 0x00, 0x01, 0x00, 0x01];
        this.sendRequest(requestFrame);
    }
    sendEnqueueSendDataRequest(request, seqNumber) {
        const payloadLength = 12 + ((request.destAddrMode === 0x01) ? 2 : (request.destAddrMode === 0x02) ? 3 : 9) + request.asduLength;
        const frameLength = 7 + payloadLength;
        const cid1 = request.clusterId & 0xff;
        const cid2 = (request.clusterId >> 8) & 0xff;
        const asdul1 = request.asduLength & 0xff;
        const asdul2 = (request.asduLength >> 8) & 0xff;
        let destArray = [];
        let dest = "";
        if (request.destAddr16 != null) {
            destArray[0] = request.destAddr16 & 0xff;
            destArray[1] = (request.destAddr16 >> 8) & 0xff;
            dest = request.destAddr16.toString(16);
        }
        if (request.destAddr64 != null) {
            dest = request.destAddr64;
            destArray = this.macAddrStringToArray(request.destAddr64);
        }
        if (request.destEndpoint != null) {
            destArray.push(request.destEndpoint);
            dest += " EP:";
            dest += request.destEndpoint;
        }
        debug(`DATA_REQUEST - destAddr: 0x${dest} SeqNr. ${seqNumber} request id: ${request.requestId}`);
        const requestFrame = [constants_1.default.PARAM.APS.DATA_REQUEST, seqNumber, 0x00, frameLength & 0xff, (frameLength >> 8) & 0xff,
            payloadLength & 0xff, (payloadLength >> 8) & 0xff,
            request.requestId, 0x00, request.destAddrMode].concat(destArray).concat([request.profileId & 0xff, (request.profileId >> 8) & 0xff,
            cid1, cid2, request.srcEndpoint, asdul1, asdul2]).concat(request.asduPayload).concat([request.txOptions, request.radius]);
        this.sendRequest(requestFrame);
    }
    processApsBusyQueue() {
        let i = apsBusyQueue.length;
        while (i--) {
            const req = apsBusyQueue[i];
            const now = Date.now();
            let timeout = 60000;
            if (req.request != null && req.request.timeout != null) {
                timeout = req.request.timeout * 1000; // seconds * 1000 = milliseconds
            }
            if ((now - req.ts) > timeout) {
                debug(`Timeout for aps request CMD: 0x${req.commandId.toString(16)} seq: ${req.seqNumber}`);
                //remove from busyQueue
                apsBusyQueue.splice(i, 1);
                req.reject(new Error("APS TIMEOUT"));
            }
        }
    }
    calcCrc(buffer) {
        let crc = 0;
        for (let i = 0; i < buffer.length; i++) {
            crc += buffer[i];
        }
        const crc0 = (~crc + 1) & 0xff;
        const crc1 = ((~crc + 1) >> 8) & 0xff;
        return [crc0, crc1];
    }
    macAddrStringToArray(addr) {
        if (addr.indexOf("0x") === 0) {
            addr = addr.slice(2, addr.length);
        }
        if (addr.length < 16) {
            for (let l = 0; l < (16 - addr.length); l++) {
                addr = "0" + addr;
            }
        }
        let result = new Array();
        let y = 0;
        for (let i = 0; i < 8; i++) {
            result[i] = parseInt(addr.substr(y, 2), 16);
            y += 2;
        }
        const reverse = result.reverse();
        return reverse;
    }
    macAddrArrayToString(addr) {
        if (addr.length != 8) {
            throw new Error("invalid array length for MAC address: " + addr.length);
        }
        let result = "0x";
        let char = '';
        let i = 8;
        while (i--) {
            char = addr[i].toString(16);
            if (char.length < 2) {
                char = "0" + char;
            }
            result += char;
        }
        return result;
    }
    /**
     *  generalArrayToString result is not reversed!
     */
    generalArrayToString(key, length) {
        let result = "0x";
        let char = '';
        let i = 0;
        while (i < length) {
            char = key[i].toString(16);
            if (char.length < 2) {
                char = "0" + char;
            }
            result += char;
            i++;
        }
        return result;
    }
    nextSeqNumber() {
        this.seqNumber++;
        if (this.seqNumber > 254) {
            this.seqNumber = 1;
        }
        return this.seqNumber;
    }
    onParsed(frame) {
        this.emit('rxFrame', frame);
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    resetTimeoutCounterAfter1min() {
        if (this.timeoutResetTimeout === null) {
            this.timeoutResetTimeout = setTimeout(() => {
                timeoutCounter = 0;
                this.timeoutResetTimeout = null;
            }, 60000);
        }
    }
}
exports.default = Driver;
//# sourceMappingURL=driver.js.map