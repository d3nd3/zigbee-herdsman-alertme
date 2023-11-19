"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZiGateCommand = exports.notEqual = exports.equal = void 0;
/* istanbul ignore file */
/* eslint-disable */
const constants_1 = require("./constants");
function equal(expected, received) {
    return expected === received;
}
exports.equal = equal;
function notEqual(expected, received) {
    return expected !== received;
}
exports.notEqual = notEqual;
exports.ZiGateCommand = {
    [constants_1.ZiGateCommandCode.SetDeviceType]: {
        request: [
            { name: 'deviceType', parameterType: 'UINT8' } //<device type: uint8_t>
        ],
    },
    [constants_1.ZiGateCommandCode.StartNetwork]: {
        request: [],
        response: [
            [
                { receivedProperty: 'code', matcher: equal, value: constants_1.ZiGateMessageCode.NetworkJoined }
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.StartNetworkScan]: {
        request: [],
    },
    [constants_1.ZiGateCommandCode.GetNetworkState]: {
        request: [],
        response: [
            [
                { receivedProperty: 'code', matcher: equal, value: constants_1.ZiGateMessageCode.NetworkState },
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.GetTimeServer]: {
        request: []
    },
    [constants_1.ZiGateCommandCode.ErasePersistentData]: {
        request: [],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.RestartFactoryNew
                },
            ]
        ],
        waitStatus: false
    },
    [constants_1.ZiGateCommandCode.Reset]: {
        request: [],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.RestartNonFactoryNew
                },
            ],
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.RestartFactoryNew
                },
            ],
        ],
        waitStatus: false
    },
    [constants_1.ZiGateCommandCode.SetTXpower]: {
        request: [
            { name: 'value', parameterType: 'UINT8' }
        ]
    },
    [constants_1.ZiGateCommandCode.ManagementLQI]: {
        request: [
            { name: 'targetAddress', parameterType: 'UINT16BE' },
            { name: 'startIndex', parameterType: 'UINT8' }, //<Start Index : uint8_t>
        ],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.DataIndication
                },
                {
                    receivedProperty: 'payload.sourceAddress',
                    matcher: equal,
                    expectedProperty: 'payload.targetAddress'
                },
                {
                    receivedProperty: 'payload.clusterID',
                    matcher: equal,
                    value: 0x8031
                },
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.SetSecurityStateKey]: {
        request: [
            { name: 'keyType', parameterType: 'UINT8' },
            { name: 'key', parameterType: 'BUFFER' }, //   <key: data>
        ],
    },
    [constants_1.ZiGateCommandCode.GetVersion]: {
        request: [],
        response: [
            [
                { receivedProperty: 'code', matcher: equal, value: constants_1.ZiGateMessageCode.VersionList }
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.RawMode]: {
        request: [
            { name: 'enabled', parameterType: 'INT8' },
        ]
    },
    [constants_1.ZiGateCommandCode.SetExtendedPANID]: {
        request: [
            { name: 'panId', parameterType: 'BUFFER' }, //<64-bit Extended PAN ID:uint64_t>
        ]
    },
    [constants_1.ZiGateCommandCode.SetChannelMask]: {
        request: [
            { name: 'channelMask', parameterType: 'UINT32BE' }, //<channel mask:uint32_t>
        ]
    },
    [constants_1.ZiGateCommandCode.ManagementLeaveRequest]: {
        request: [
            { name: 'shortAddress', parameterType: 'UINT16BE' },
            { name: 'extendedAddress', parameterType: 'IEEEADDR' },
            { name: 'rejoin', parameterType: 'UINT8' },
            { name: 'removeChildren', parameterType: 'UINT8' }, // <Remove Children: uint8_t>
        ],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.LeaveIndication
                },
                {
                    receivedProperty: 'payload.extendedAddress', matcher: equal,
                    expectedProperty: 'payload.extendedAddress'
                },
            ],
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.ManagementLeaveResponse
                },
                {
                    receivedProperty: 'payload.sqn', matcher: equal,
                    expectedProperty: 'status.seqApsNum'
                },
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.RemoveDevice]: {
        request: [
            { name: 'parentAddress', parameterType: 'IEEEADDR' },
            { name: 'extendedAddress', parameterType: 'IEEEADDR' }, // <extended address: uint64_t>
        ],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.LeaveIndication
                },
                {
                    receivedProperty: 'payload.extendedAddress', matcher: equal,
                    expectedProperty: 'payload.extendedAddress'
                },
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.PermitJoin]: {
        request: [
            { name: 'targetShortAddress', parameterType: 'UINT16BE' },
            // broadcast 0xfffc
            { name: 'interval', parameterType: 'UINT8' }, //<interval: uint8_t>
            // 0 = Disable Joining
            // 1 – 254 = Time in seconds to allow joins
            // 255 = Allow all joins
            // {name: 'TCsignificance', parameterType: 'UINT8'}, //<TCsignificance: uint8_t>
            // 0 = No change in authentication
            // 1 = Authentication policy as spec
        ]
    },
    [constants_1.ZiGateCommandCode.PermitJoinStatus]: {
        request: [
            { name: 'targetShortAddress', parameterType: 'UINT16BE' },
            // broadcast 0xfffc
            { name: 'interval', parameterType: 'UINT8' },
            // 0 = Disable Joining
            // 1 – 254 = Time in seconds to allow joins
            // 255 = Allow all joins
            { name: 'TCsignificance', parameterType: 'UINT8' }, //<TCsignificance: uint8_t>
            // 0 = No change in authentication
            // 1 = Authentication policy as spec
        ],
        response: [
            [
                { receivedProperty: 'code', matcher: equal, value: constants_1.ZiGateMessageCode.PermitJoinStatus }
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.RawAPSDataRequest]: {
        request: [
            { name: 'addressMode', parameterType: 'UINT8' },
            { name: 'targetShortAddress', parameterType: 'UINT16BE' },
            { name: 'sourceEndpoint', parameterType: 'UINT8' },
            { name: 'destinationEndpoint', parameterType: 'UINT8' },
            { name: 'clusterID', parameterType: 'UINT16BE' },
            { name: 'profileID', parameterType: 'UINT16BE' },
            { name: 'securityMode', parameterType: 'UINT8' },
            { name: 'radius', parameterType: 'UINT8' },
            { name: 'dataLength', parameterType: 'UINT8' },
            { name: 'data', parameterType: 'BUFFER' }, // <data: auint8_t>
        ],
    },
    [constants_1.ZiGateCommandCode.NodeDescriptor]: {
        request: [
            { name: 'targetShortAddress', parameterType: 'UINT16BE' }, // <target short address: uint16_t>
        ],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.DataIndication
                },
                {
                    receivedProperty: 'payload.sourceAddress',
                    matcher: equal,
                    expectedProperty: 'payload.targetShortAddress'
                },
                {
                    receivedProperty: 'payload.clusterID',
                    matcher: equal,
                    value: 0x8002
                }
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.ActiveEndpoint]: {
        request: [
            { name: 'targetShortAddress', parameterType: 'UINT16BE' }, // <target short address: uint16_t>
        ],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.DataIndication
                },
                {
                    receivedProperty: 'payload.sourceAddress',
                    matcher: equal,
                    expectedProperty: 'payload.targetShortAddress'
                },
                {
                    receivedProperty: 'payload.clusterID',
                    matcher: equal,
                    value: 0x8005
                }
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.SimpleDescriptor]: {
        request: [
            { name: 'targetShortAddress', parameterType: 'UINT16BE' },
            { name: 'endpoint', parameterType: 'UINT8' }, // <endpoint: uint8_t>
        ],
        response: [
            [
                { receivedProperty: 'code', matcher: equal, value: constants_1.ZiGateMessageCode.DataIndication },
                {
                    receivedProperty: 'payload.sourceAddress',
                    matcher: equal,
                    expectedProperty: 'payload.targetShortAddress'
                },
                {
                    receivedProperty: 'payload.clusterID',
                    matcher: equal,
                    value: 0x8004
                }
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.Bind]: {
        request: [
            { name: 'targetExtendedAddress', parameterType: 'IEEEADDR' },
            { name: 'targetEndpoint', parameterType: 'UINT8' },
            { name: 'clusterID', parameterType: 'UINT16BE' },
            { name: 'destinationAddressMode', parameterType: 'UINT8' },
            {
                name: 'destinationAddress',
                parameterType: 'ADDRESS_WITH_TYPE_DEPENDENCY'
            },
            { name: 'destinationEndpoint', parameterType: 'UINT8' }, // <destination endpoint (
            // value ignored for group address): uint8_t>
        ],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.DataIndication
                },
                {
                    receivedProperty: 'payload.sourceAddress',
                    matcher: equal,
                    expectedExtraParameter: 'destinationNetworkAddress'
                },
                {
                    receivedProperty: 'payload.clusterID',
                    matcher: equal,
                    value: 0x8021
                },
                {
                    receivedProperty: 'payload.profileID',
                    matcher: equal,
                    value: 0x0000
                },
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.UnBind]: {
        request: [
            { name: 'targetExtendedAddress', parameterType: 'IEEEADDR' },
            { name: 'targetEndpoint', parameterType: 'UINT8' },
            { name: 'clusterID', parameterType: 'UINT16BE' },
            { name: 'destinationAddressMode', parameterType: 'UINT8' },
            {
                name: 'destinationAddress',
                parameterType: 'ADDRESS_WITH_TYPE_DEPENDENCY'
            },
            { name: 'destinationEndpoint', parameterType: 'UINT8' }, // <destination endpoint (
            // value ignored for group address): uint8_t>
        ],
        response: [
            [
                {
                    receivedProperty: 'code',
                    matcher: equal,
                    value: constants_1.ZiGateMessageCode.DataIndication
                },
                {
                    receivedProperty: 'payload.sourceAddress',
                    matcher: equal,
                    expectedExtraParameter: 'destinationNetworkAddress'
                },
                {
                    receivedProperty: 'payload.clusterID',
                    matcher: equal,
                    value: 0x8022
                },
                {
                    receivedProperty: 'payload.profileID',
                    matcher: equal,
                    value: 0x0000
                },
            ],
        ]
    },
    [constants_1.ZiGateCommandCode.AddGroup]: {
        request: [
            { name: 'addressMode', parameterType: 'UINT8' },
            { name: 'shortAddress', parameterType: 'UINT16BE' },
            { name: 'sourceEndpoint', parameterType: 'UINT8' },
            { name: 'destinationEndpoint', parameterType: 'UINT8' },
            { name: 'groupAddress', parameterType: 'UINT16BE' },
        ]
    }
};
//# sourceMappingURL=commandType.js.map