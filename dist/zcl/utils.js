"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDataTypeAnalogOrDiscrete = exports.getGlobalCommand = exports.getCluster = void 0;
const definition_1 = require("./definition");
const DataTypeValueType = {
    discrete: [
        definition_1.DataType.data8, definition_1.DataType.data16, definition_1.DataType.data24, definition_1.DataType.data32, definition_1.DataType.data40,
        definition_1.DataType.data48, definition_1.DataType.data56, definition_1.DataType.data64, definition_1.DataType.boolean,
        definition_1.DataType.bitmap8, definition_1.DataType.bitmap16, definition_1.DataType.bitmap24, definition_1.DataType.bitmap32, definition_1.DataType.bitmap40,
        definition_1.DataType.bitmap48, definition_1.DataType.bitmap56, definition_1.DataType.bitmap64, definition_1.DataType.enum8, definition_1.DataType.enum16,
        definition_1.DataType.octetStr, definition_1.DataType.charStr, definition_1.DataType.longOctetStr, definition_1.DataType.longCharStr, definition_1.DataType.array,
        definition_1.DataType.struct, definition_1.DataType.set, definition_1.DataType.bag, definition_1.DataType.clusterId, definition_1.DataType.attrId, definition_1.DataType.bacOid,
        definition_1.DataType.ieeeAddr, definition_1.DataType.secKey,
    ],
    analog: [
        definition_1.DataType.uint8, definition_1.DataType.uint16, definition_1.DataType.uint24, definition_1.DataType.uint32, definition_1.DataType.uint40,
        definition_1.DataType.uint48, definition_1.DataType.uint56,
        definition_1.DataType.int8, definition_1.DataType.int16, definition_1.DataType.int24, definition_1.DataType.int32, definition_1.DataType.int40,
        definition_1.DataType.int48, definition_1.DataType.int56, definition_1.DataType.semiPrec, definition_1.DataType.singlePrec, definition_1.DataType.doublePrec,
        definition_1.DataType.tod, definition_1.DataType.date, definition_1.DataType.utc,
    ],
};
function IsDataTypeAnalogOrDiscrete(dataType) {
    if (DataTypeValueType.discrete.includes(dataType)) {
        return 'DISCRETE';
    }
    else if (DataTypeValueType.analog.includes(dataType)) {
        return 'ANALOG';
    }
    else {
        throw new Error(`Don't know value type for '${definition_1.DataType[dataType]}'`);
    }
}
exports.IsDataTypeAnalogOrDiscrete = IsDataTypeAnalogOrDiscrete;
function getCluster(key, manufacturerCode = null) {
    var _a, _b, _c;
    let name;
    if (typeof key === 'number') {
        if (manufacturerCode) {
            name = (_a = Object.entries(definition_1.Cluster)
                .find((e) => e[1].ID === key && e[1].manufacturerCode === manufacturerCode)) === null || _a === void 0 ? void 0 : _a[0];
        }
        if (!name) {
            name = (_b = Object.entries(definition_1.Cluster).find((e) => e[1].ID === key && !e[1].manufacturerCode)) === null || _b === void 0 ? void 0 : _b[0];
        }
        if (!name) {
            name = (_c = Object.entries(definition_1.Cluster).find((e) => e[1].ID === key)) === null || _c === void 0 ? void 0 : _c[0];
        }
    }
    else {
        name = key;
    }
    let cluster = definition_1.Cluster[name];
    if (!cluster) {
        if (typeof key === 'number') {
            name = key.toString();
            cluster = { attributes: {}, commands: {}, commandsResponse: {}, manufacturerCode: null, ID: key };
        }
        else {
            throw new Error(`Cluster with name '${key}' does not exist`);
        }
    }
    // eslint-disable-next-line
    let attributes = Object.assign({}, ...Object.entries(cluster.attributes).map(([k, v]) => ({ [k]: { ...v, name: k } })));
    // eslint-disable-next-line
    const commands = Object.assign({}, ...Object.entries(cluster.commands).map(([k, v]) => ({ [k]: { ...v, name: k } })));
    // eslint-disable-next-line
    const commandsResponse = Object.assign({}, ...Object.entries(cluster.commandsResponse).map(([k, v]) => ({ [k]: { ...v, name: k } })));
    const getAttributeInternal = (key) => {
        let result = null;
        if (typeof key === 'number') {
            if (manufacturerCode) {
                result = Object.values(attributes).find((a) => {
                    return a.ID === key && a.manufacturerCode === manufacturerCode;
                });
            }
            if (!result) {
                result = Object.values(attributes).find((a) => a.ID === key && a.manufacturerCode == null);
            }
        }
        else {
            result = Object.values(attributes).find((a) => a.name === key);
        }
        return result;
    };
    const getAttribute = (key) => {
        const result = getAttributeInternal(key);
        if (!result) {
            throw new Error(`Cluster '${name}' has no attribute '${key}'`);
        }
        return result;
    };
    const hasAttribute = (key) => {
        const result = getAttributeInternal(key);
        return !!result;
    };
    const getCommand = (key) => {
        let result = null;
        if (typeof key === 'number') {
            result = Object.values(commands).find((a) => a.ID === key);
        }
        else {
            result = Object.values(commands).find((a) => a.name === key);
        }
        if (!result) {
            throw new Error(`Cluster '${name}' has no command '${key}'`);
        }
        return result;
    };
    const getCommandResponse = (key) => {
        let result = null;
        if (typeof key === 'number') {
            result = Object.values(commandsResponse).find((a) => a.ID === key);
        }
        else {
            result = Object.values(commandsResponse).find((a) => a.name === key);
        }
        if (!result) {
            throw new Error(`Cluster '${name}' has no command response '${key}'`);
        }
        return result;
    };
    return {
        ID: cluster.ID,
        attributes,
        manufacturerCode: cluster.manufacturerCode,
        name,
        commands,
        // eslint-disable-next-line
        commandsResponse: Object.assign({}, ...Object.entries(cluster.commandsResponse).map(([k, v]) => ({ [k]: { ...v, name: k } }))),
        getAttribute,
        hasAttribute,
        getCommand,
        getCommandResponse,
    };
}
exports.getCluster = getCluster;
function getGlobalCommand(key) {
    let name;
    if (typeof key === 'number') {
        for (const commandName in definition_1.Foundation) {
            if (definition_1.Foundation[commandName].ID === key) {
                name = commandName;
                break;
            }
        }
    }
    else {
        name = key;
    }
    const command = definition_1.Foundation[name];
    if (!command) {
        throw new Error(`Global command with key '${key}' does not exist`);
    }
    const result = {
        ID: command.ID,
        name,
        parameters: command.parameters,
    };
    if (command.hasOwnProperty('response')) {
        result.response = command.response;
    }
    return result;
}
exports.getGlobalCommand = getGlobalCommand;
//# sourceMappingURL=utils.js.map