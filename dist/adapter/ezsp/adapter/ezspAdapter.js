"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const adapter_1 = __importDefault(require("../../adapter"));
const debug = (0, debug_1.default)("zigbee-herdsman:adapter:ezsp:debg");
const driver_1 = require("../driver");
const types_1 = require("../driver/types");
const zcl_1 = require("../../../zcl");
const Events = __importStar(require("../../events"));
const utils_1 = require("../../../utils");
const serialPortUtils_1 = __importDefault(require("../../serialPortUtils"));
const socketPortUtils_1 = __importDefault(require("../../socketPortUtils"));
const backup_1 = require("./backup");
const autoDetectDefinitions = [
    { manufacturer: 'ITEAD', vendorId: '1a86', productId: '55d4' },
    { manufacturer: 'Nabu Casa', vendorId: '10c4', productId: 'ea60' }, // Home Assistant SkyConnect
];
class EZSPAdapter extends adapter_1.default {
    constructor(networkOptions, serialPortOptions, backupPath, adapterOptions) {
        super(networkOptions, serialPortOptions, backupPath, adapterOptions);
        this.port = serialPortOptions;
        this.waitress = new utils_1.Waitress(this.waitressValidator, this.waitressTimeoutFormatter);
        this.interpanLock = false;
        const concurrent = adapterOptions && adapterOptions.concurrent ? adapterOptions.concurrent : 8;
        debug(`Adapter concurrent: ${concurrent}`);
        this.queue = new utils_1.Queue(concurrent);
        this.driver = new driver_1.Driver();
        this.driver.on('deviceJoined', this.handleDeviceJoin.bind(this));
        this.driver.on('deviceLeft', this.handleDeviceLeft.bind(this));
        this.driver.on('incomingMessage', this.processMessage.bind(this));
        this.backupMan = new backup_1.EZSPAdapterBackup(this.driver, backupPath);
    }
    async processMessage(frame) {
        debug(`processMessage: ${JSON.stringify(frame)}`);
        if (frame.apsFrame.profileId == 0) {
            if (frame.apsFrame.clusterId == types_1.EmberZDOCmd.Device_annce &&
                frame.apsFrame.destinationEndpoint == 0) {
                let nwk, rst, ieee;
                [nwk, rst] = types_1.uint16_t.deserialize(types_1.uint16_t, frame.message.subarray(1));
                [ieee, rst] = types_1.EmberEUI64.deserialize(types_1.EmberEUI64, rst);
                ieee = new types_1.EmberEUI64(ieee);
                debug("ZDO Device announce: %s, %s", nwk, ieee.toString());
                this.driver.handleNodeJoined(nwk, ieee);
            }
        }
        else if (frame.apsFrame.profileId == 260 || frame.apsFrame.profileId == 0xFFFF) {
            try {
                const payload = {
                    frame: zcl_1.ZclFrame.fromBuffer(frame.apsFrame.clusterId, frame.message),
                    address: frame.sender,
                    endpoint: frame.apsFrame.sourceEndpoint,
                    linkquality: frame.lqi,
                    groupID: frame.apsFrame.groupId,
                    wasBroadcast: false,
                    destinationEndpoint: frame.apsFrame.destinationEndpoint,
                };
                this.waitress.resolve(payload);
                this.emit(Events.Events.zclData, payload);
            }
            catch (error) {
                const payload = {
                    clusterID: frame.apsFrame.clusterId,
                    data: frame.message,
                    address: frame.sender,
                    endpoint: frame.apsFrame.sourceEndpoint,
                    linkquality: frame.lqi,
                    groupID: frame.apsFrame.groupId,
                    wasBroadcast: false,
                    destinationEndpoint: frame.apsFrame.destinationEndpoint,
                };
                this.emit(Events.Events.rawData, payload);
            }
        }
        else if (frame.apsFrame.profileId == 0xc05e && frame.senderEui64) { // ZLL Frame
            const payload = {
                frame: zcl_1.ZclFrame.fromBuffer(frame.apsFrame.clusterId, frame.message),
                address: `0x${frame.senderEui64.toString()}`,
                endpoint: 0xFE,
                linkquality: frame.lqi,
                groupID: null,
                wasBroadcast: false,
                destinationEndpoint: null,
            };
            this.waitress.resolve(payload);
            this.emit(Events.Events.zclData, payload);
        }
        else if (frame.apsFrame.profileId == 0xA1E0) { // GP Frame
            const zclFrame = zcl_1.ZclFrame.create(zcl_1.FrameType.SPECIFIC, zcl_1.Direction.CLIENT_TO_SERVER, true, null, frame.apsFrame.sequence, (frame.messageType == 0xE0) ? 'commisioningNotification' : 'notification', frame.apsFrame.clusterId, frame.message);
            const payload = {
                frame: zclFrame,
                address: frame.sender,
                endpoint: frame.apsFrame.sourceEndpoint,
                linkquality: frame.lqi,
                groupID: null,
                wasBroadcast: true,
                destinationEndpoint: frame.apsFrame.sourceEndpoint,
            };
            this.waitress.resolve(payload);
            this.emit(Events.Events.zclData, payload);
        }
        this.emit('event', frame);
    }
    async handleDeviceJoin(arr) {
        let [nwk, ieee] = arr;
        debug('Device join request received: %s %s', nwk, ieee.toString('hex'));
        const payload = {
            networkAddress: nwk,
            ieeeAddr: `0x${ieee.toString('hex')}`,
        };
        if (nwk == 0) {
            const nd = await this.nodeDescriptor(nwk);
        }
        else {
            this.emit(Events.Events.deviceJoined, payload);
        }
    }
    handleDeviceLeft(arr) {
        let [nwk, ieee] = arr;
        debug('Device left network request received: %s %s', nwk, ieee);
        const payload = {
            networkAddress: nwk,
            ieeeAddr: `0x${ieee.toString('hex')}`,
        };
        this.emit(Events.Events.deviceLeave, payload);
    }
    /**
     * Adapter methods
     */
    async start() {
        return await this.driver.startup(this.port.path, {
            baudRate: this.port.baudRate || 115200,
            rtscts: this.port.rtscts,
            parity: 'none',
            stopBits: 1,
            xon: true,
            xoff: true
        }, this.networkOptions, this.greenPowerGroup);
    }
    async stop() {
        await this.driver.stop();
    }
    static async isValidPath(path) {
        // For TCP paths we cannot get device information, therefore we cannot validate it.
        if (socketPortUtils_1.default.isTcpPath(path)) {
            return false;
        }
        try {
            return serialPortUtils_1.default.is((0, utils_1.RealpathSync)(path), autoDetectDefinitions);
        }
        catch (error) {
            debug(`Failed to determine if path is valid: '${error}'`);
            return false;
        }
    }
    static async autoDetectPath() {
        const paths = await serialPortUtils_1.default.find(autoDetectDefinitions);
        paths.sort((a, b) => (a < b) ? -1 : 1);
        return paths.length > 0 ? paths[0] : null;
    }
    async getCoordinator() {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const networkAddress = 0x0000;
            const message = await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Active_EP_req, types_1.EmberZDOCmd.Active_EP_rsp, { dstaddr: networkAddress });
            const activeEndpoints = message.activeeplist;
            const endpoints = [];
            for (const endpoint of activeEndpoints) {
                const descriptor = await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Simple_Desc_req, types_1.EmberZDOCmd.Simple_Desc_rsp, { dstaddr: networkAddress, targetEp: endpoint });
                endpoints.push({
                    profileID: descriptor.descriptor.profileid,
                    ID: descriptor.descriptor.endpoint,
                    deviceID: descriptor.descriptor.deviceid,
                    inputClusters: descriptor.descriptor.inclusterlist,
                    outputClusters: descriptor.descriptor.outclusterlist,
                });
            }
            return {
                networkAddress: networkAddress,
                manufacturerID: 0,
                ieeeAddr: `0x${this.driver.ieee.toString()}`,
                endpoints,
            };
        });
    }
    async permitJoin(seconds, networkAddress) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            if (seconds) {
                this.driver.preJoining();
            }
            if (networkAddress) {
                const result = await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Mgmt_Permit_Joining_req, types_1.EmberZDOCmd.Mgmt_Permit_Joining_rsp, { duration: seconds, tcSignificant: false });
                if (result.status !== types_1.EmberStatus.SUCCESS) {
                    throw new Error(`permitJoin for '${networkAddress}' failed`);
                }
            }
            else {
                await this.driver.permitJoining(seconds);
            }
        });
    }
    async getCoordinatorVersion() {
        return { type: `EZSP v${this.driver.version.product}`, meta: this.driver.version };
    }
    async addInstallCode(ieeeAddress, key) {
        if ([8, 10, 14, 16, 18].indexOf(key.length) === -1) {
            throw new Error('Wrong install code length');
        }
        await this.driver.addInstallCode(ieeeAddress, key);
    }
    async reset(type) {
        return Promise.reject(new Error("Not supported"));
    }
    async lqi(networkAddress) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const neighbors = [];
            const request = async (startIndex) => {
                const result = await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Mgmt_Lqi_req, types_1.EmberZDOCmd.Mgmt_Lqi_rsp, { startindex: startIndex });
                if (result.status !== types_1.EmberStatus.SUCCESS) {
                    throw new Error(`LQI for '${networkAddress}' failed with with status code ${result.status}`);
                }
                return result;
            };
            // eslint-disable-next-line
            const add = (list) => {
                for (const entry of list) {
                    this.driver.setNode(entry.nodeid, entry.ieee);
                    neighbors.push({
                        linkquality: entry.lqi,
                        networkAddress: entry.nodeid,
                        ieeeAddr: `0x${new types_1.EmberEUI64(entry.ieee).toString()}`,
                        relationship: (entry.packed >> 4) & 0x7,
                        depth: entry.depth,
                    });
                }
            };
            let response = await request(0);
            add(response.neighborlqilist.neighbors);
            const size = response.neighborlqilist.entries;
            let nextStartIndex = response.neighborlqilist.neighbors.length;
            while (neighbors.length < size) {
                response = await request(nextStartIndex);
                add(response.neighborlqilist.neighbors);
                nextStartIndex += response.neighborlqilist.neighbors.length;
            }
            return { neighbors };
        }, networkAddress);
    }
    async routingTable(networkAddress) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const table = [];
            const request = async (startIndex) => {
                const result = await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Mgmt_Rtg_req, types_1.EmberZDOCmd.Mgmt_Rtg_rsp, { startindex: startIndex });
                if (result.status !== types_1.EmberStatus.SUCCESS) {
                    throw new Error(`Routing table for '${networkAddress}' failed with status code ${result.status}`);
                }
                return result;
            };
            // eslint-disable-next-line
            const add = (list) => {
                for (const entry of list) {
                    table.push({
                        destinationAddress: entry.destination,
                        status: entry.status,
                        nextHop: entry.nexthop
                    });
                }
            };
            let response = await request(0);
            add(response.routingtablelist.table);
            const size = response.routingtablelist.entries;
            let nextStartIndex = response.routingtablelist.table.length;
            while (table.length < size) {
                response = await request(nextStartIndex);
                add(response.routingtablelist.table);
                nextStartIndex += response.routingtablelist.table.length;
            }
            return { table };
        }, networkAddress);
    }
    async nodeDescriptor(networkAddress) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            try {
                debug(`Requesting 'Node Descriptor' for '${networkAddress}'`);
                const result = await this.nodeDescriptorInternal(networkAddress);
                return result;
            }
            catch (error) {
                debug(`Node descriptor request for '${networkAddress}' failed (${error}), retry`);
                throw error;
            }
        });
    }
    async nodeDescriptorInternal(networkAddress) {
        const descriptor = await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Node_Desc_req, types_1.EmberZDOCmd.Node_Desc_rsp, { dstaddr: networkAddress });
        const logicaltype = descriptor.descriptor.byte1 & 0x07;
        return {
            manufacturerCode: descriptor.descriptor.manufacturer_code,
            type: (logicaltype == 0) ? 'Coordinator' : (logicaltype == 1) ? 'Router' : 'EndDevice'
        };
    }
    async activeEndpoints(networkAddress) {
        debug(`Requesting 'Active endpoints' for '${networkAddress}'`);
        return this.queue.execute(async () => {
            const endpoints = await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Active_EP_req, types_1.EmberZDOCmd.Active_EP_rsp, { dstaddr: networkAddress });
            return { endpoints: [...endpoints.activeeplist] };
        }, networkAddress);
    }
    async simpleDescriptor(networkAddress, endpointID) {
        debug(`Requesting 'Simple Descriptor' for '${networkAddress}' endpoint ${endpointID}`);
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const descriptor = await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Simple_Desc_req, types_1.EmberZDOCmd.Simple_Desc_rsp, { dstaddr: networkAddress, targetEp: endpointID });
            return {
                profileID: descriptor.descriptor.profileid,
                endpointID: descriptor.descriptor.endpoint,
                deviceID: descriptor.descriptor.deviceid,
                inputClusters: descriptor.descriptor.inclusterlist,
                outputClusters: descriptor.descriptor.outclusterlist,
            };
        }, networkAddress);
    }
    async sendZclFrameToEndpoint(ieeeAddr, networkAddress, endpoint, zclFrame, timeout, disableResponse, disableRecovery, sourceEndpoint) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            return this.sendZclFrameToEndpointInternal(ieeeAddr, networkAddress, endpoint, sourceEndpoint || 1, zclFrame, timeout, disableResponse, disableRecovery, 0, 0, false, false, false, null);
        }, networkAddress);
    }
    async sendZclFrameToEndpointInternal(ieeeAddr, networkAddress, endpoint, sourceEndpoint, zclFrame, timeout, disableResponse, disableRecovery, responseAttempt, dataRequestAttempt, checkedNetworkAddress, discoveredRoute, assocRemove, assocRestore) {
        if (ieeeAddr == null) {
            ieeeAddr = `0x${this.driver.ieee.toString()}`;
        }
        debug('sendZclFrameToEndpointInternal %s:%i/%i (%i,%i,%i)', ieeeAddr, networkAddress, endpoint, responseAttempt, dataRequestAttempt, this.queue.count());
        let response = null;
        const command = zclFrame.getCommand();
        if (command.hasOwnProperty('response') && disableResponse === false) {
            response = this.waitForInternal(networkAddress, endpoint, zclFrame.Header.transactionSequenceNumber, zclFrame.Cluster.ID, command.response, timeout);
        }
        else if (!zclFrame.Header.frameControl.disableDefaultResponse) {
            response = this.waitForInternal(networkAddress, endpoint, zclFrame.Header.transactionSequenceNumber, zclFrame.Cluster.ID, zcl_1.Foundation.defaultRsp.ID, timeout);
        }
        const frame = this.driver.makeApsFrame(zclFrame.Cluster.ID, disableResponse || zclFrame.Header.frameControl.disableDefaultResponse);
        frame.profileId = 0x0104;
        frame.sourceEndpoint = sourceEndpoint || 0x01;
        frame.destinationEndpoint = endpoint;
        frame.groupId = 0;
        this.driver.setNode(networkAddress, new types_1.EmberEUI64(ieeeAddr));
        const dataConfirmResult = await this.driver.request(networkAddress, frame, zclFrame.toBuffer());
        if (!dataConfirmResult) {
            if (response != null) {
                response.cancel();
            }
            throw Error('sendZclFrameToEndpointInternal error');
        }
        if (response !== null) {
            try {
                const result = await response.start().promise;
                return result;
            }
            catch (error) {
                debug('Response timeout (%s:%d,%d)', ieeeAddr, networkAddress, responseAttempt);
                if (responseAttempt < 1 && !disableRecovery) {
                    return this.sendZclFrameToEndpointInternal(ieeeAddr, networkAddress, endpoint, sourceEndpoint, zclFrame, timeout, disableResponse, disableRecovery, responseAttempt + 1, dataRequestAttempt, checkedNetworkAddress, discoveredRoute, assocRemove, assocRestore);
                }
                else {
                    throw error;
                }
            }
        }
        else {
            return null;
        }
    }
    async sendZclFrameToGroup(groupID, zclFrame) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const frame = this.driver.makeApsFrame(zclFrame.Cluster.ID, false);
            frame.profileId = 0x0104;
            frame.sourceEndpoint = 0x01;
            frame.destinationEndpoint = 0x01;
            frame.groupId = groupID;
            const dataConfirmResult = await this.driver.mrequest(frame, zclFrame.toBuffer());
            /**
             * As a group command is not confirmed and thus immidiately returns
             * (contrary to network address requests) we will give the
             * command some time to 'settle' in the network.
             */
            await (0, utils_1.Wait)(200);
        });
    }
    async sendZclFrameToAll(endpoint, zclFrame, sourceEndpoint) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const frame = this.driver.makeApsFrame(zclFrame.Cluster.ID, false);
            frame.profileId = sourceEndpoint === 242 && endpoint === 242 ? 0xA1E0 : 0x0104;
            frame.sourceEndpoint = sourceEndpoint;
            frame.destinationEndpoint = endpoint;
            frame.groupId = 0xFFFD;
            const dataConfirmResult = await this.driver.mrequest(frame, zclFrame.toBuffer());
            /**
             * As a broadcast command is not confirmed and thus immidiately returns
             * (contrary to network address requests) we will give the
             * command some time to 'settle' in the network.
             */
            await (0, utils_1.Wait)(200);
        });
    }
    async bind(destinationNetworkAddress, sourceIeeeAddress, sourceEndpoint, clusterID, destinationAddressOrGroup, type, destinationEndpoint) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const ieee = new types_1.EmberEUI64(sourceIeeeAddress);
            let destAddr;
            if (type === 'group') {
                // 0x01 = 16-bit group address for DstAddr and DstEndpoint not present
                destAddr = {
                    addrmode: 0x01,
                    nwk: destinationAddressOrGroup,
                };
            }
            else {
                // 0x03 = 64-bit extended address for DstAddr and DstEndpoint present
                destAddr = {
                    addrmode: 0x03,
                    ieee: new types_1.EmberEUI64(destinationAddressOrGroup),
                    endpoint: destinationEndpoint,
                };
                this.driver.setNode(destinationNetworkAddress, destAddr.ieee);
            }
            await this.driver.zdoRequest(destinationNetworkAddress, types_1.EmberZDOCmd.Bind_req, types_1.EmberZDOCmd.Bind_rsp, { sourceEui: ieee, sourceEp: sourceEndpoint, clusterId: clusterID, destAddr: destAddr });
        }, destinationNetworkAddress);
    }
    async unbind(destinationNetworkAddress, sourceIeeeAddress, sourceEndpoint, clusterID, destinationAddressOrGroup, type, destinationEndpoint) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const ieee = new types_1.EmberEUI64(sourceIeeeAddress);
            let destAddr;
            if (type === 'group') {
                // 0x01 = 16-bit group address for DstAddr and DstEndpoint not present
                destAddr = {
                    addrmode: 0x01,
                    nwk: destinationAddressOrGroup,
                };
            }
            else {
                // 0x03 = 64-bit extended address for DstAddr and DstEndpoint present
                destAddr = {
                    addrmode: 0x03,
                    ieee: new types_1.EmberEUI64(destinationAddressOrGroup),
                    endpoint: destinationEndpoint,
                };
                this.driver.setNode(destinationNetworkAddress, destAddr.ieee);
            }
            await this.driver.zdoRequest(destinationNetworkAddress, types_1.EmberZDOCmd.Unbind_req, types_1.EmberZDOCmd.Unbind_rsp, { sourceEui: ieee, sourceEp: sourceEndpoint, clusterId: clusterID, destAddr: destAddr });
        }, destinationNetworkAddress);
    }
    removeDevice(networkAddress, ieeeAddr) {
        return this.queue.execute(async () => {
            this.checkInterpanLock();
            const ieee = new types_1.EmberEUI64(ieeeAddr);
            this.driver.setNode(networkAddress, ieee);
            await this.driver.zdoRequest(networkAddress, types_1.EmberZDOCmd.Mgmt_Leave_req, types_1.EmberZDOCmd.Mgmt_Leave_rsp, { destAddr: ieee, removechildrenRejoin: 0x00 });
        }, networkAddress);
    }
    async getNetworkParameters() {
        return {
            panID: this.driver.networkParams.panId,
            extendedPanID: this.driver.networkParams.extendedPanId[0],
            channel: this.driver.networkParams.radioChannel
        };
    }
    async supportsBackup() {
        return true;
    }
    async backup() {
        return this.backupMan.createBackup();
    }
    async restoreChannelInterPAN() {
        return this.queue.execute(async () => {
            const channel = (await this.getNetworkParameters()).channel;
            await this.driver.setChannel(channel);
            // Give adapter some time to restore, otherwise stuff crashes
            await (0, utils_1.Wait)(3000);
            this.interpanLock = false;
        });
    }
    checkInterpanLock() {
        if (this.interpanLock) {
            throw new Error(`Cannot execute command, in Inter-PAN mode`);
        }
    }
    async sendZclFrameInterPANToIeeeAddr(zclFrame, ieeeAddr) {
        return this.queue.execute(async () => {
            debug(`sendZclFrameInterPANToIeeeAddr to ${ieeeAddr}`);
            try {
                const frame = this.driver.makeEmberIeeeRawFrame();
                frame.ieeeFrameControl = 0xcc21;
                frame.destPanId = 0xFFFF;
                frame.destAddress = new types_1.EmberEUI64(ieeeAddr);
                frame.sourcePanId = this.driver.networkParams.panId;
                frame.sourceAddress = this.driver.ieee;
                frame.nwkFrameControl = 0x000b;
                frame.appFrameControl = 0x03;
                frame.clusterId = zclFrame.Cluster.ID;
                frame.profileId = 0xc05e;
                const dataConfirmResult = await this.driver.ieeerawrequest(frame, zclFrame.toBuffer());
            }
            catch (error) {
                throw error;
            }
        });
    }
    async sendZclFrameInterPANBroadcast(zclFrame, timeout) {
        return this.queue.execute(async () => {
            debug(`sendZclFrameInterPANBroadcast`);
            const command = zclFrame.getCommand();
            if (!command.hasOwnProperty('response')) {
                throw new Error(`Command '${command.name}' has no response, cannot wait for response`);
            }
            const response = this.waitForInternal(null, 0xFE, null, zclFrame.Cluster.ID, command.response, timeout);
            try {
                const frame = this.driver.makeEmberRawFrame();
                frame.ieeeFrameControl = 0xc801;
                frame.destPanId = 0xFFFF;
                frame.destNodeId = 0xFFFF;
                frame.sourcePanId = this.driver.networkParams.panId;
                frame.ieeeAddress = this.driver.ieee;
                frame.nwkFrameControl = 0x000b;
                frame.appFrameControl = 0x0b;
                frame.clusterId = zclFrame.Cluster.ID;
                frame.profileId = 0xc05e;
                const dataConfirmResult = await this.driver.rawrequest(frame, zclFrame.toBuffer());
            }
            catch (error) {
                response.cancel();
                throw error;
            }
            return response.start().promise;
        });
    }
    async setTransmitPower(value) {
        debug(`setTransmitPower to ${value}`);
        return this.queue.execute(async () => {
            await this.driver.setRadioPower(value);
        });
    }
    async setChannelInterPAN(channel) {
        return this.queue.execute(async () => {
            this.interpanLock = true;
            await this.driver.setChannel(channel);
        });
    }
    waitForInternal(networkAddress, endpoint, transactionSequenceNumber, clusterID, commandIdentifier, timeout) {
        const payload = {
            address: networkAddress, endpoint, clusterID, commandIdentifier,
            transactionSequenceNumber,
        };
        const waiter = this.waitress.waitFor(payload, timeout);
        const cancel = () => this.waitress.remove(waiter.ID);
        return { start: waiter.start, cancel };
    }
    waitFor(networkAddress, endpoint, frameType, direction, transactionSequenceNumber, clusterID, commandIdentifier, timeout) {
        const waiter = this.waitForInternal(networkAddress, endpoint, transactionSequenceNumber, clusterID, commandIdentifier, timeout);
        return { cancel: waiter.cancel, promise: waiter.start().promise };
    }
    waitressTimeoutFormatter(matcher, timeout) {
        return `Timeout - ${matcher.address} - ${matcher.endpoint}` +
            ` - ${matcher.transactionSequenceNumber} - ${matcher.clusterID}` +
            ` - ${matcher.commandIdentifier} after ${timeout}ms`;
    }
    waitressValidator(payload, matcher) {
        const transactionSequenceNumber = payload.frame.Header.transactionSequenceNumber;
        return (!matcher.address || payload.address === matcher.address) &&
            payload.endpoint === matcher.endpoint &&
            (!matcher.transactionSequenceNumber || transactionSequenceNumber === matcher.transactionSequenceNumber) &&
            payload.frame.Cluster.ID === matcher.clusterID &&
            matcher.commandIdentifier === payload.frame.Header.commandIdentifier;
    }
}
exports.default = EZSPAdapter;
//# sourceMappingURL=ezspAdapter.js.map