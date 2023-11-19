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
const definition_1 = require("./definition");
const Utils = __importStar(require("./utils"));
const buffaloZcl_1 = __importDefault(require("./buffaloZcl"));
const definition_2 = require("./definition");
const MINIMAL_FRAME_LENGTH = 3;
const ListTypes = [
    definition_1.BuffaloZclDataType.LIST_UINT8,
    definition_1.BuffaloZclDataType.LIST_UINT16,
    definition_1.BuffaloZclDataType.LIST_UINT24,
    definition_1.BuffaloZclDataType.LIST_UINT32,
    definition_1.BuffaloZclDataType.LIST_ZONEINFO,
];
class ZclFrame {
    constructor(header, payload, cluster, command) {
        this.Header = header;
        this.Payload = payload;
        this.Cluster = cluster;
        this.Command = command;
    }
    /**
     * Creating
     */
    static create(frameType, direction, disableDefaultResponse, manufacturerCode, transactionSequenceNumber, commandKey, clusterKey, payload, reservedBits = 0) {
        const cluster = Utils.getCluster(clusterKey, manufacturerCode != null ? manufacturerCode : null);
        let command = null;
        if (frameType === definition_2.FrameType.GLOBAL) {
            command = Utils.getGlobalCommand(commandKey);
        }
        else {
            command = direction === definition_1.Direction.CLIENT_TO_SERVER ?
                cluster.getCommand(commandKey) : cluster.getCommandResponse(commandKey);
        }
        const header = {
            frameControl: {
                reservedBits, frameType, direction, disableDefaultResponse,
                manufacturerSpecific: manufacturerCode != null,
            },
            transactionSequenceNumber,
            manufacturerCode,
            commandIdentifier: command.ID,
        };
        return new ZclFrame(header, payload, cluster, command);
    }
    toBuffer() {
        const buffalo = new buffaloZcl_1.default(Buffer.alloc(250));
        this.writeHeader(buffalo);
        if (this.Header.frameControl.frameType === definition_2.FrameType.GLOBAL) {
            this.writePayloadGlobal(buffalo);
        }
        else if (this.Header.frameControl.frameType === definition_2.FrameType.SPECIFIC) {
            this.writePayloadCluster(buffalo);
        }
        else {
            throw new Error(`Frametype '${this.Header.frameControl.frameType}' not valid`);
        }
        return buffalo.getWritten();
    }
    writeHeader(buffalo) {
        const frameControl = ((this.Header.frameControl.frameType & 0x03) |
            (((this.Header.frameControl.manufacturerSpecific ? 1 : 0) << 2) & 0x04) |
            ((this.Header.frameControl.direction << 3) & 0x08) |
            (((this.Header.frameControl.disableDefaultResponse ? 1 : 0) << 4) & 0x10) |
            ((this.Header.frameControl.reservedBits << 5) & 0xE0));
        buffalo.writeUInt8(frameControl);
        if (this.Header.frameControl.manufacturerSpecific) {
            buffalo.writeUInt16(this.Header.manufacturerCode);
        }
        buffalo.writeUInt8(this.Header.transactionSequenceNumber);
        buffalo.writeUInt8(this.Header.commandIdentifier);
    }
    writePayloadGlobal(buffalo) {
        const command = Object.values(definition_1.Foundation).find((c) => c.ID === this.Command.ID);
        if (command.parseStrategy === 'repetitive') {
            for (const entry of this.Payload) {
                for (const parameter of command.parameters) {
                    const options = {};
                    if (!ZclFrame.conditionsValid(parameter, entry, null)) {
                        continue;
                    }
                    if (parameter.type === definition_1.BuffaloZclDataType.USE_DATA_TYPE && typeof entry.dataType === 'number') {
                        // We need to grab the dataType to parse useDataType
                        options.dataType = definition_1.DataType[entry.dataType];
                    }
                    const typeStr = ZclFrame.getDataTypeString(parameter.type);
                    buffalo.write(typeStr, entry[parameter.name], options);
                }
            }
        }
        else if (command.parseStrategy === 'flat') {
            for (const parameter of command.parameters) {
                buffalo.write(definition_1.DataType[parameter.type], this.Payload[parameter.name], {});
            }
        }
        else {
            /* istanbul ignore else */
            if (command.parseStrategy === 'oneof') {
                /* istanbul ignore else */
                if (command === definition_1.Foundation.discoverRsp) {
                    buffalo.writeUInt8(this.Payload.discComplete);
                    for (const entry of this.Payload.attrInfos) {
                        for (const parameter of command.parameters) {
                            buffalo.write(definition_1.DataType[parameter.type], entry[parameter.name], {});
                        }
                    }
                }
            }
        }
    }
    writePayloadCluster(buffalo) {
        for (const parameter of this.Command.parameters) {
            if (!ZclFrame.conditionsValid(parameter, this.Payload, null)) {
                continue;
            }
            if (!this.Payload.hasOwnProperty(parameter.name)) {
                throw new Error(`Parameter '${parameter.name}' is missing`);
            }
            const typeStr = ZclFrame.getDataTypeString(parameter.type);
            buffalo.write(typeStr, this.Payload[parameter.name], {});
        }
    }
    /**
     * Parsing
     */
    static fromBuffer(clusterID, buffer) {
        if (buffer.length < MINIMAL_FRAME_LENGTH) {
            throw new Error("ZclFrame length is lower than minimal length");
        }
        const buffalo = new buffaloZcl_1.default(buffer);
        const header = this.parseHeader(buffalo);
        let command = null;
        if (header.frameControl.frameType === definition_2.FrameType.GLOBAL) {
            command = Utils.getGlobalCommand(header.commandIdentifier);
        }
        else {
            const cluster = Utils.getCluster(clusterID, header.manufacturerCode);
            command = header.frameControl.direction === definition_1.Direction.CLIENT_TO_SERVER ?
                cluster.getCommand(header.commandIdentifier) : cluster.getCommandResponse(header.commandIdentifier);
        }
        const cluster = Utils.getCluster(clusterID, header.frameControl.manufacturerSpecific ? header.manufacturerCode : null);
        const payload = this.parsePayload(header, cluster, buffalo);
        return new ZclFrame(header, payload, cluster, command);
    }
    static parseHeader(buffalo) {
        const frameControlValue = buffalo.readUInt8();
        const frameControl = {
            frameType: frameControlValue & 0x03,
            manufacturerSpecific: ((frameControlValue >> 2) & 0x01) === 1,
            direction: (frameControlValue >> 3) & 0x01,
            disableDefaultResponse: ((frameControlValue >> 4) & 0x01) === 1,
            reservedBits: frameControlValue >> 5,
        };
        let manufacturerCode = null;
        if (frameControl.manufacturerSpecific) {
            manufacturerCode = buffalo.readUInt16();
        }
        const transactionSequenceNumber = buffalo.readUInt8();
        const commandIdentifier = buffalo.readUInt8();
        return { frameControl, transactionSequenceNumber, manufacturerCode, commandIdentifier };
    }
    static parsePayload(header, cluster, buffalo) {
        if (header.frameControl.frameType === definition_2.FrameType.GLOBAL) {
            return this.parsePayloadGlobal(header, buffalo);
        }
        else if (header.frameControl.frameType === definition_2.FrameType.SPECIFIC) {
            return this.parsePayloadCluster(header, cluster, buffalo);
        }
        else {
            throw new Error(`Unsupported frameType '${header.frameControl.frameType}'`);
        }
    }
    static parsePayloadCluster(header, cluster, buffalo) {
        const command = header.frameControl.direction === definition_1.Direction.CLIENT_TO_SERVER ?
            cluster.getCommand(header.commandIdentifier) : cluster.getCommandResponse(header.commandIdentifier);
        const payload = {};
        for (const parameter of command.parameters) {
            const options = { payload };
            if (!this.conditionsValid(parameter, payload, buffalo.getBuffer().length - buffalo.getPosition())) {
                continue;
            }
            if (ListTypes.includes(parameter.type)) {
                const lengthParameter = command.parameters[command.parameters.indexOf(parameter) - 1];
                const length = payload[lengthParameter.name];
                /* istanbul ignore else */
                if (typeof length === 'number') {
                    options.length = length;
                }
            }
            const typeStr = ZclFrame.getDataTypeString(parameter.type);
            payload[parameter.name] = buffalo.read(typeStr, options);
        }
        return payload;
    }
    static parsePayloadGlobal(header, buffalo) {
        const command = Object.values(definition_1.Foundation).find((c) => c.ID === header.commandIdentifier);
        if (command.parseStrategy === 'repetitive') {
            const payload = [];
            while (buffalo.isMore()) {
                const entry = {};
                for (const parameter of command.parameters) {
                    const options = {};
                    if (!this.conditionsValid(parameter, entry, buffalo.getBuffer().length - buffalo.getPosition())) {
                        continue;
                    }
                    if (parameter.type === definition_1.BuffaloZclDataType.USE_DATA_TYPE && typeof entry.dataType === 'number') {
                        // We need to grab the dataType to parse useDataType
                        options.dataType = definition_1.DataType[entry.dataType];
                        if (entry.dataType === definition_1.DataType.charStr && entry.hasOwnProperty('attrId')) {
                            // For Xiaomi struct parsing we need to pass the attributeID.
                            options.attrId = entry.attrId;
                        }
                    }
                    const typeStr = definition_1.DataType[parameter.type] != null ?
                        definition_1.DataType[parameter.type] : definition_1.BuffaloZclDataType[parameter.type];
                    entry[parameter.name] = buffalo.read(typeStr, options);
                    // TODO: not needed, but temp workaroudn to make payload equal to that of zcl-packet
                    if (parameter.type === definition_1.BuffaloZclDataType.USE_DATA_TYPE && entry.dataType === definition_1.DataType.struct) {
                        entry['structElms'] = entry.attrData;
                        entry['numElms'] = entry.attrData.length;
                    }
                }
                payload.push(entry);
            }
            return payload;
        }
        else if (command.parseStrategy === 'flat') {
            const payload = {};
            for (const parameter of command.parameters) {
                payload[parameter.name] = buffalo.read(definition_1.DataType[parameter.type], {});
            }
            return payload;
        }
        else {
            /* istanbul ignore else */
            if (command.parseStrategy === 'oneof') {
                /* istanbul ignore else */
                if (command === definition_1.Foundation.discoverRsp) {
                    const payload = {};
                    payload.discComplete = buffalo.readUInt8();
                    payload.attrInfos = [];
                    while (buffalo.isMore()) {
                        const entry = {};
                        for (const parameter of command.parameters) {
                            entry[parameter.name] = buffalo.read(definition_1.DataType[parameter.type], {});
                        }
                        payload.attrInfos.push(entry);
                    }
                    return payload;
                }
            }
        }
    }
    /**
     * Utils
     */
    static getDataTypeString(dataType) {
        return definition_1.DataType[dataType] != null ? definition_1.DataType[dataType] : definition_1.BuffaloZclDataType[dataType];
    }
    static conditionsValid(parameter, entry, remainingBufferBytes) {
        if (parameter.conditions) {
            const failedCondition = parameter.conditions.find((condition) => {
                if (condition.type === 'statusEquals') {
                    return entry.status !== condition.value;
                }
                else if (condition.type == 'statusNotEquals') {
                    return entry.status === condition.value;
                }
                else if (condition.type == 'directionEquals') {
                    return entry.direction !== condition.value;
                }
                else if (condition.type == 'bitMaskSet') {
                    return (entry[condition.param] & condition.mask) !== condition.mask;
                }
                else if (condition.type == 'bitFieldEnum') {
                    return ((entry[condition.param] >> condition.offset) & ((1 << condition.size) - 1)) !== condition.value;
                }
                else if (remainingBufferBytes != null && condition.type == 'minimumRemainingBufferBytes') {
                    return remainingBufferBytes < condition.value;
                }
                else {
                    /* istanbul ignore else */
                    if (condition.type == 'dataTypeValueTypeEquals') {
                        return Utils.IsDataTypeAnalogOrDiscrete(entry.dataType) !== condition.value;
                    }
                }
            });
            if (failedCondition) {
                return false;
            }
        }
        return true;
    }
    isSpecific() {
        return this.Header.frameControl.frameType === definition_2.FrameType.SPECIFIC;
    }
    isGlobal() {
        return this.Header.frameControl.frameType === definition_2.FrameType.GLOBAL;
    }
    // List of clusters is not completed, feel free to add more.
    isCluster(clusterName) {
        return this.Cluster.name === clusterName;
    }
    // List of commands is not completed, feel free to add more.
    isCommand(commandName) {
        return this.getCommand().name === commandName;
    }
    getCommand() {
        let command = null;
        if (this.Header.frameControl.frameType === definition_2.FrameType.GLOBAL) {
            command = Utils.getGlobalCommand(this.Header.commandIdentifier);
        }
        else {
            command = this.Header.frameControl.direction === definition_1.Direction.CLIENT_TO_SERVER ?
                this.Cluster.getCommand(this.Header.commandIdentifier) :
                this.Cluster.getCommandResponse(this.Header.commandIdentifier);
        }
        return command;
    }
}
exports.default = ZclFrame;
//# sourceMappingURL=zclFrame.js.map