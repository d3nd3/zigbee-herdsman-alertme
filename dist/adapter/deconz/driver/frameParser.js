"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
/* eslint-disable */
const MIN_BUFFER_SIZE = 3;
const littleEndian = true;
const constants_1 = __importDefault(require("./constants"));
const driver_1 = require("./driver");
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('zigbee-herdsman:deconz:frameParser');
var lastReceivedGpInd = { srcId: 0, commandId: 0, frameCounter: 0 };
var events = require('events');
var frameParserEvents = new events.EventEmitter();
module.exports.frameParserEvents = frameParserEvents;
function parseReadParameterResponse(view) {
    const parameterId = view.getUint8(7);
    switch (parameterId) {
        case constants_1.default.PARAM.Network.MAC:
            const mac = view.getBigUint64(8, littleEndian).toString(16);
            let result = mac;
            while (result.length < 16) {
                result = "0" + result;
            }
            result = "0x" + result;
            debug(`MAC: ${result}`);
            return result;
        case constants_1.default.PARAM.Network.PAN_ID:
            const panId = view.getUint16(8, littleEndian);
            debug('PANID: ' + panId.toString(16));
            return panId;
        case constants_1.default.PARAM.Network.NWK_ADDRESS:
            const nwkAddr = view.getUint16(8, littleEndian);
            debug('NWKADDR: ' + nwkAddr.toString(16));
            return nwkAddr;
        case constants_1.default.PARAM.Network.EXT_PAN_ID:
            const extPanId = view.getBigUint64(8, littleEndian).toString(16);
            let res = extPanId;
            while (res.length < 16) {
                res = "0" + res;
            }
            res = "0x" + res;
            debug(`EXT_PANID: ${res}`);
            return res;
        case constants_1.default.PARAM.Network.APS_EXT_PAN_ID:
            const apsExtPanId = view.getBigUint64(8, littleEndian).toString(16);
            let resAEPID = apsExtPanId;
            while (resAEPID.length < 16) {
                resAEPID = "0" + resAEPID;
            }
            resAEPID = "0x" + resAEPID;
            debug(`APS_EXT_PANID: ${resAEPID}`);
            return resAEPID;
        case constants_1.default.PARAM.Network.NETWORK_KEY:
            const networkKey1 = view.getBigUint64(9).toString(16);
            let res1 = networkKey1;
            while (res1.length < 16) {
                res1 = "0" + res1;
            }
            const networkKey2 = view.getBigUint64(17).toString(16);
            let res2 = networkKey2;
            while (res2.length < 16) {
                res2 = "0" + res2;
            }
            debug('NETWORK_KEY: hidden');
            return "0x" + res1 + res2;
        case constants_1.default.PARAM.Network.CHANNEL:
            const channel = view.getUint8(8);
            debug('CHANNEL: ' + channel);
            return channel;
        case constants_1.default.PARAM.Network.CHANNEL_MASK:
            const chMask = view.getUint32(8, littleEndian);
            debug('CHANNELMASK: ' + chMask.toString(16));
            return chMask;
        case constants_1.default.PARAM.Network.PERMIT_JOIN:
            const permitJoin = view.getUint8(8);
            debug('PERMIT_JOIN: ' + permitJoin);
            return permitJoin;
        case constants_1.default.PARAM.Network.WATCHDOG_TTL:
            const ttl = view.getUint32(8);
            debug('WATCHDOG_TTL: ' + ttl);
            return ttl;
        default:
            //throw new Error(`unknown parameter id ${parameterId}`);
            debug(`unknown parameter id ${parameterId}`);
            return null;
    }
}
function parseReadFirmwareResponse(view) {
    const fw = [view.getUint8(5), view.getUint8(6), view.getUint8(7), view.getUint8(8)];
    debug("read firmware version response - version: " + fw);
    return fw;
}
function parseDeviceStateResponse(view) {
    const flag = view.getUint8(5);
    debug("device state: " + flag.toString(2));
    frameParserEvents.emit('receivedDataNotification', flag);
    return flag;
}
function parseChangeNetworkStateResponse(view) {
    const status = view.getUint8(2);
    const state = view.getUint8(5);
    debug("change network state - status: " + status + " new state: " + state);
    return state;
}
function parseQuerySendDataStateResponse(view) {
    try {
        const response = {};
        let buf2, buf3;
        response.commandId = view.getUint8(0);
        response.seqNr = view.getUint8(1);
        response.status = view.getUint8(2);
        if (response.status !== 0) {
            if (response.status !== 5) {
                debug("DATA_CONFIRM RESPONSE - seqNr.: " + response.seqNr + " status: " + response.status);
            }
            return null;
        }
        response.frameLength = 7;
        response.payloadLength = view.getUint16(5, littleEndian);
        response.deviceState = view.getUint8(7);
        response.requestId = view.getUint8(8);
        response.destAddrMode = view.getUint8(9);
        let destAddr = "";
        if (response.destAddrMode === 0x03) {
            let res = view.getBigUint64(10, littleEndian).toString(16);
            while (res.length < 16) {
                res = "0" + res;
            }
            response.destAddr64 = res;
            buf2 = view.buffer.slice(18, view.buffer.byteLength);
            destAddr = response.destAddr64;
        }
        else {
            response.destAddr16 = view.getUint16(10, littleEndian);
            buf2 = view.buffer.slice(12, view.buffer.byteLength);
            destAddr = response.destAddr16.toString(16);
        }
        if (response.destAddrMode === 0x02 || response.destAddrMode === 0x03) {
            response.destEndpoint = view.getUint8(view.byteLength - 7);
        }
        response.srcEndpoint = view.getUint8(view.byteLength - 6);
        response.confirmStatus = view.getInt8(view.byteLength - 5);
        let newStatus = response.deviceState.toString(2);
        for (let l = 0; l <= (8 - newStatus.length); l++) {
            newStatus = "0" + newStatus;
        }
        // resolve send data request promise
        const i = driver_1.apsBusyQueue.findIndex((r) => (r.request && r.request.requestId === response.requestId));
        if (i < 0) {
            return;
        }
        clearTimeout(driver_1.enableRtsTimeout);
        (0, driver_1.enableRTS)(); // enable ReadyToSend because confirm received
        const req = driver_1.apsBusyQueue[i];
        // TODO timeout (at driver.ts)
        if (response.confirmStatus !== 0) {
            // reject if status is not SUCCESS
            //debug("REJECT APS_REQUEST - request id: " + response.requestId + " confirm status: " + response.confirmStatus);
            req.reject(response.confirmStatus);
        }
        else {
            //debug("RESOLVE APS_REQUEST - request id: " + response.requestId + " confirm status: " + response.confirmStatus);
            req.resolve(response.confirmStatus);
        }
        //remove from busyqueue
        driver_1.apsBusyQueue.splice(i, 1);
        debug("DATA_CONFIRM RESPONSE - destAddr: 0x" + destAddr + " request id: " + response.requestId + " confirm status: " + response.confirmStatus);
        frameParserEvents.emit('receivedDataNotification', response.deviceState);
        return response;
    }
    catch (error) {
        debug("DATA_CONFIRM RESPONSE - " + error);
        return null;
    }
}
function parseReadReceivedDataResponse(view) {
    // min 28 bytelength
    try {
        const response = {};
        let buf2, buf3;
        response.commandId = view.getUint8(0);
        response.seqNr = view.getUint8(1);
        response.status = view.getUint8(2);
        if (response.status != 0) {
            if (response.status !== 5) {
                debug("DATA_INDICATION RESPONSE - seqNr.: " + response.seqNr + " status: " + response.status);
            }
            return null;
        }
        response.frameLength = view.getUint16(3, littleEndian);
        response.payloadLength = view.getUint16(5, littleEndian);
        response.deviceState = view.getUint8(7);
        response.destAddrMode = view.getUint8(8);
        let destAddr = "";
        if (response.destAddrMode === 0x03) {
            let res = view.getBigUint64(9, littleEndian).toString(16);
            while (res.length < 16) {
                res = "0" + res;
            }
            response.destAddr64 = res;
            buf2 = view.buffer.slice(17, view.buffer.byteLength);
            destAddr = response.destAddr64;
        }
        else {
            response.destAddr16 = view.getUint16(9, littleEndian);
            buf2 = view.buffer.slice(11, view.buffer.byteLength);
            destAddr = response.destAddr16.toString(16);
        }
        view = new DataView(buf2);
        response.destEndpoint = view.getUint8(0);
        response.srcAddrMode = view.getUint8(1);
        let srcAddr = "";
        if (response.srcAddrMode === 0x02 || response.srcAddrMode === 0x04) {
            response.srcAddr16 = view.getUint16(2, littleEndian);
            buf3 = view.buffer.slice(4, view.buffer.byteLength);
            srcAddr = response.srcAddr16.toString(16);
        }
        if (response.srcAddrMode === 0x03 || response.srcAddrMode === 0x04) {
            let res = view.getBigUint64(2, littleEndian).toString(16);
            while (res.length < 16) {
                res = "0" + res;
            }
            response.srcAddr64 = res;
            buf3 = view.buffer.slice(10, view.buffer.byteLength);
            srcAddr = response.srcAddr64;
        }
        view = new DataView(buf3);
        response.srcEndpoint = view.getUint8(0);
        response.profileId = view.getUint16(1, littleEndian);
        response.clusterId = view.getUint16(3, littleEndian);
        response.asduLength = view.getUint16(5, littleEndian);
        let payload = [];
        let i = 0;
        for (let u = 7; u < (response.asduLength + 7); u++) {
            payload[i] = view.getUint8(u);
            i++;
        }
        response.asduPayload = payload;
        response.lqi = view.getUint8(view.byteLength - 8);
        response.rssi = view.getInt8(view.byteLength - 3);
        let newStatus = response.deviceState.toString(2);
        for (let l = 0; l <= (8 - newStatus.length); l++) {
            newStatus = "0" + newStatus;
        }
        debug("DATA_INDICATION RESPONSE - seqNr. " + response.seqNr + " srcAddr: 0x" + srcAddr + " destAddr: 0x" + destAddr + " profile id: 0x" + response.profileId.toString(16) + " cluster id: 0x" + response.clusterId.toString(16) + " lqi: " + response.lqi);
        debug("response payload: " + payload);
        frameParserEvents.emit('receivedDataPayload', response);
        frameParserEvents.emit('receivedDataNotification', response.deviceState);
        return response;
    }
    catch (error) {
        debug("DATA_INDICATION RESPONSE - " + error);
        return null;
    }
}
function parseEnqueueSendDataResponse(view) {
    try {
        const status = view.getUint8(2);
        const requestId = view.getUint8(8);
        const deviceState = view.getUint8(7);
        debug("DATA_REQUEST RESPONSE - request id: " + requestId + " status: " + status);
        frameParserEvents.emit('receivedDataNotification', deviceState);
        return deviceState;
    }
    catch (error) {
        debug("parseEnqueueSendDataResponse - " + error);
        return null;
    }
}
function parseWriteParameterResponse(view) {
    try {
        const parameterId = view.getUint8(7);
        debug(`write parameter response - parameter id: ${parameterId} - status: ${view.getUint8(2)}`);
        return parameterId;
    }
    catch (error) {
        debug("parseWriteParameterResponse - " + error);
        return null;
    }
}
function parseReceivedDataNotification(view) {
    try {
        const deviceState = view.getUint8(5);
        debug("DEVICE_STATE changed: " + deviceState.toString(2));
        frameParserEvents.emit('receivedDataNotification', deviceState);
        return deviceState;
    }
    catch (error) {
        debug("parseReceivedDataNotification - " + error);
        return null;
    }
}
function parseGreenPowerDataIndication(view) {
    try {
        const ind = {};
        ind.seqNr = view.getUint8(1);
        if (view.byteLength < 30) {
            debug("GP data notification");
            ind.id = 0x00; // 0 = notification, 4 = commissioning
            ind.rspId = 0x01; // 1 = pairing, 2 = commissioning
            ind.options = 0;
            view.getUint16(7, littleEndian); // frame ctrl field(7) ext.fcf(8)
            ind.srcId = view.getUint32(9, littleEndian);
            ind.frameCounter = view.getUint32(13, littleEndian);
            ind.commandId = view.getUint8(17);
            ind.commandFrameSize = view.byteLength - 18 - 6; // cut 18 from begin and 4 (sec mic) and 2 from end (cfc)
            let payload = [];
            let i = 0;
            for (let u = 18; u < (ind.commandFrameSize + 18); u++) {
                payload[i] = view.getUint8(u);
                i++;
            }
            ind.commandFrame = payload;
        }
        else {
            debug("GP commissioning notification");
            ind.id = 0x04; // 0 = notification, 4 = commissioning
            ind.rspId = 0x01; // 1 = pairing, 2 = commissioning
            ind.options = view.getUint16(14, littleEndian); // opt(14) ext.opt(15)
            ind.srcId = view.getUint32(8, littleEndian);
            ind.frameCounter = view.getUint32(36, littleEndian);
            ind.commandId = view.getUint8(12);
            ind.commandFrameSize = view.byteLength - 13 - 2; // cut 13 from begin and 2 from end (cfc)
            let payload = [];
            let i = 0;
            for (let u = 13; u < (ind.commandFrameSize + 13); u++) {
                payload[i] = view.getUint8(u);
                i++;
            }
            ind.commandFrame = payload;
        }
        if (!(lastReceivedGpInd.srcId === ind.srcId &&
            lastReceivedGpInd.commandId === ind.commandId &&
            lastReceivedGpInd.frameCounter === ind.frameCounter)) {
            lastReceivedGpInd.srcId = ind.srcId;
            lastReceivedGpInd.commandId = ind.commandId;
            lastReceivedGpInd.frameCounter = ind.frameCounter;
            //debug(`GP_DATA_INDICATION - src id: ${ind.srcId} cmd id: ${ind.commandId} frameCounter: ${ind.frameCounter}`);
            debug(`GP_DATA_INDICATION - src id: 0x${ind.srcId.toString(16)} cmd id: 0x${ind.commandId.toString(16)} frameCounter: 0x${ind.frameCounter.toString(16)}`);
            frameParserEvents.emit('receivedGreenPowerIndication', ind);
        }
        return ind;
    }
    catch (error) {
        debug("GREEN_POWER INDICATION - " + error);
        return null;
    }
}
function parseMacPollCommand(view) {
    //debug("Received command MAC_POLL");
    return 28;
}
function parseBeaconRequest(view) {
    debug("Received Beacon Request");
    return 31;
}
function parseUnknownCommand(view) {
    const id = view.getUint8(0);
    debug(`received unknown command - id ${id}`);
    return id;
}
function getParserForCommandId(id) {
    switch (id) {
        case constants_1.default.PARAM.FrameType.ReadParameter:
            return parseReadParameterResponse;
        case constants_1.default.PARAM.FrameType.WriteParameter:
            return parseWriteParameterResponse;
        case constants_1.default.PARAM.FrameType.ReadFirmwareVersion:
            return parseReadFirmwareResponse;
        case constants_1.default.PARAM.FrameType.ReadDeviceState:
            return parseDeviceStateResponse;
        case constants_1.default.PARAM.APS.DATA_INDICATION:
            return parseReadReceivedDataResponse;
        case constants_1.default.PARAM.APS.DATA_REQUEST:
            return parseEnqueueSendDataResponse;
        case constants_1.default.PARAM.APS.DATA_CONFIRM:
            return parseQuerySendDataStateResponse;
        case constants_1.default.PARAM.FrameType.DeviceStateChanged:
            return parseReceivedDataNotification;
        case constants_1.default.PARAM.NetworkState.CHANGE_NETWORK_STATE:
            return parseChangeNetworkStateResponse;
        case constants_1.default.PARAM.FrameType.GreenPowerDataInd:
            return parseGreenPowerDataIndication;
        case 28:
            return parseMacPollCommand;
        case 31:
            return parseBeaconRequest;
        default:
            return parseUnknownCommand;
        //throw new Error(`unknown command id ${id}`);
    }
}
async function processFrame(frame) {
    const [seqNumber, status, command, commandId] = await parseFrame(frame);
    //debug(`process frame with seq: ${seqNumber} status: ${status}`);
    let queue = driver_1.busyQueue;
    if (commandId === constants_1.default.PARAM.APS.DATA_INDICATION ||
        commandId === constants_1.default.PARAM.APS.DATA_REQUEST ||
        commandId === constants_1.default.PARAM.APS.DATA_CONFIRM) {
        queue = driver_1.apsBusyQueue;
    }
    const i = queue.findIndex((r) => r.seqNumber === seqNumber);
    if (i < 0) {
        return;
    }
    const req = queue[i];
    if (commandId === constants_1.default.PARAM.APS.DATA_REQUEST) {
        // if confirm is true resolve request only when data confirm arrives
        // TODO only return if a confirm was requested. if no confirm needed: go ahead
        //if (req.confirm === true) {
        return;
        //}
    }
    //remove from busyqueue
    queue.splice(i, 1);
    if (status !== 0) {
        // reject if status is not SUCCESS
        //debug("REJECT REQUEST");
        req.reject({ status });
    }
    else {
        //debug("RESOLVE REQUEST");
        req.resolve(command);
    }
}
function parseFrame(frame) {
    if (frame.length < MIN_BUFFER_SIZE) {
        debug("received frame size to small - discard frame");
        return [null, null, null, null];
    }
    const view = new DataView(frame.buffer);
    const commandId = view.getUint8(0);
    const seqNumber = view.getUint8(1);
    const status = view.getUint8(2);
    //const frameLength = view.getUint16(3, littleEndian);
    //const payloadLength = view.getUint16(5, littleEndian);
    const parser = getParserForCommandId(commandId);
    return [seqNumber, status, parser(view), commandId];
}
exports.default = processFrame;
//# sourceMappingURL=frameParser.js.map