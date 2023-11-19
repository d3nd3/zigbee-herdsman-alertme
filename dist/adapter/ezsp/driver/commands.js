"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZDORESPONSE_NAME_BY_ID = exports.ZDOREQUEST_NAME_BY_ID = exports.ZGP = exports.ZDORESPONSES = exports.ZDOREQUESTS = exports.FRAME_NAMES_BY_ID = exports.FRAMES = void 0;
/* istanbul ignore file */
const types_1 = require("./types");
exports.FRAMES = {
    // Configuration Frames
    version: {
        ID: 0x0000,
        request: {
            desiredProtocolVersion: types_1.uint8_t
        },
        response: {
            protocolVersion: types_1.uint8_t,
            stackType: types_1.uint8_t,
            stackVersion: types_1.uint16_t
        }
    },
    getConfigurationValue: {
        ID: 0x0052,
        request: {
            configId: types_1.EzspConfigId
        },
        response: {
            status: types_1.EzspStatus,
            value: types_1.uint16_t
        }
    },
    setConfigurationValue: {
        ID: 0x0053,
        request: {
            configId: types_1.EzspConfigId,
            value: types_1.uint16_t
        },
        response: {
            status: types_1.EzspStatus
        }
    },
    addEndpoint: {
        ID: 0x0002,
        request: {
            endpoint: types_1.uint8_t,
            profileId: types_1.uint16_t,
            deviceId: types_1.uint16_t,
            appFlags: types_1.uint8_t,
            inputClusterCount: types_1.uint8_t,
            outputClusterCount: types_1.uint8_t,
            inputClusterList: types_1.WordList,
            outputClusterList: types_1.WordList,
        },
        response: {
            status: types_1.EzspStatus
        }
    },
    setPolicy: {
        ID: 0x0055,
        request: {
            policyId: types_1.EzspPolicyId,
            decisionId: types_1.EzspDecisionId
        },
        response: {
            status: types_1.EzspStatus
        }
    },
    getPolicy: {
        ID: 0x0056,
        request: {
            policyId: types_1.EzspPolicyId,
        },
        response: {
            status: types_1.EzspStatus,
            decisionId: types_1.EzspDecisionId
        }
    },
    sendPanIdUpdate: {
        ID: 0x0057,
        request: {
            newPan: types_1.EmberPanId,
        },
        response: {
            status: types_1.Bool
        }
    },
    getValue: {
        ID: 0x00AA,
        request: {
            valueId: types_1.EzspValueId
        },
        response: {
            status: types_1.EzspStatus,
            value: types_1.LVBytes
        }
    },
    getExtendedValue: {
        ID: 0x0003,
        request: {
            valueId: types_1.EzspExtendedValueId,
            characteristics: types_1.uint32_t
        },
        response: {
            status: types_1.EzspStatus,
            value: types_1.LVBytes
        }
    },
    setValue: {
        ID: 0x00AB,
        request: {
            valueId: types_1.EzspValueId,
            value: types_1.LVBytes
        },
        response: {
            status: types_1.EzspStatus
        }
    },
    // Utilities Frames
    nop: {
        ID: 0x0005,
        request: null,
        response: null
    },
    echo: {
        ID: 0x0081,
        request: {
            data: types_1.LVBytes
        },
        response: {
            echo: types_1.LVBytes
        }
    },
    invalidCommand: {
        ID: 0x0058,
        request: null,
        response: {
            reason: types_1.EzspStatus
        }
    },
    callback: {
        ID: 0x0006,
        request: null,
        response: null
    },
    noCallbacks: {
        ID: 0x0007,
        request: null,
        response: null
    },
    setToken: {
        ID: 0x0009,
        request: {
            tokenId: types_1.uint8_t,
            tokenData: (0, types_1.fixed_list)(8, types_1.uint8_t)
        },
        response: {
            status: types_1.EmberStatus
        }
    },
    getToken: {
        ID: 0x000A,
        request: {
            tokenId: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus,
            tokenData: (0, types_1.fixed_list)(8, types_1.uint8_t)
        }
    },
    getMfgToken: {
        ID: 0x000B,
        request: {
            tokenId: types_1.EzspMfgTokenId
        },
        response: {
            status: types_1.EmberStatus,
            tokenData: types_1.LVBytes
        }
    },
    setMfgToken: {
        ID: 0x000C,
        request: {
            tokenId: types_1.EzspMfgTokenId,
            tokenData: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus
        }
    },
    stackTokenChangedHandler: {
        ID: 0x000D,
        request: null,
        response: {
            tokenAddress: types_1.uint16_t
        }
    },
    getRandomNumber: {
        ID: 0x0049,
        request: null,
        response: {
            status: types_1.EmberStatus,
            value: types_1.uint16_t
        }
    },
    setTimer: {
        ID: 0x000E,
        request: {
            timerId: types_1.uint8_t,
            time: types_1.uint16_t,
            units: types_1.EmberEventUnits,
            repeat: types_1.Bool
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    getTimer: {
        ID: 0x004E,
        request: {
            timerId: types_1.uint8_t
        },
        response: {
            time: types_1.uint16_t,
            units: types_1.EmberEventUnits,
            repeat: types_1.Bool
        },
    },
    timerHandler: {
        ID: 0x000F,
        request: null,
        response: {
            timerId: types_1.uint8_t
        },
    },
    debugWrite: {
        ID: 0x0012,
        request: {
            binaryMessage: types_1.Bool,
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    readAndClearCounters: {
        ID: 0x0065,
        request: null,
        response: {
            values: (0, types_1.fixed_list)(types_1.EmberCounterType.COUNTER_TYPE_COUNT, types_1.uint16_t)
        },
    },
    readCounters: {
        ID: 0x00F1,
        request: null,
        response: {
            values: (0, types_1.fixed_list)(types_1.EmberCounterType.COUNTER_TYPE_COUNT, types_1.uint16_t)
        },
    },
    counterRolloverHandler: {
        ID: 0x00F2,
        request: null,
        response: {
            type: types_1.EmberCounterType
        },
    },
    delayTest: {
        ID: 0x009D,
        request: {
            delay: types_1.uint16_t
        },
        response: null,
    },
    getLibraryStatus: {
        ID: 0x0001,
        request: {
            libraryId: types_1.uint8_t
        },
        response: {
            status: types_1.EmberLibraryStatus
        },
    },
    getXncpInfo: {
        ID: 0x0013,
        request: null,
        response: {
            status: types_1.EmberStatus,
            manufacturerId: types_1.uint16_t,
            versionNumber: types_1.uint16_t
        },
    },
    customFrame: {
        ID: 0x0047,
        request: {
            payload: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus,
            reply: types_1.LVBytes
        },
    },
    customFrameHandler: {
        ID: 0x0054,
        request: null,
        response: {
            payload: types_1.LVBytes
        },
    },
    getEui64: {
        ID: 0x0026,
        request: null,
        response: {
            eui64: types_1.EmberEUI64
        },
    },
    getNodeId: {
        ID: 0x0027,
        request: null,
        response: {
            nodeId: types_1.EmberNodeId
        },
    },
    // Networking Frames
    setManufacturerCode: {
        ID: 0x0015,
        request: {
            code: types_1.uint16_t
        },
        response: null,
    },
    setPowerDescriptor: {
        ID: 0x0016,
        request: {
            descriptor: types_1.uint16_t
        },
        response: null,
    },
    networkInit: {
        ID: 0x0017,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    networkInitExtended: {
        ID: 112,
        request: {
            networkInitStruct: types_1.EmberNetworkInitStruct
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    networkState: {
        ID: 0x0018,
        request: null,
        response: {
            status: types_1.EmberNetworkStatus
        },
    },
    stackStatusHandler: {
        ID: 0x0019,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    startScan: {
        ID: 0x001A,
        request: {
            scanType: types_1.EzspNetworkScanType,
            channelMask: types_1.uint32_t,
            duration: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    energyScanResultHandler: {
        ID: 0x0048,
        request: null,
        response: {
            channel: types_1.uint8_t,
            maxRssiValue: types_1.int8s
        },
    },
    networkFoundHandler: {
        ID: 0x001B,
        request: null,
        response: {
            networkFound: types_1.EmberZigbeeNetwork,
            lastHopLqi: types_1.uint8_t,
            lastHopRssi: types_1.int8s
        },
    },
    scanCompleteHandler: {
        ID: 0x001C,
        request: null,
        response: {
            channel: types_1.uint8_t,
            status: types_1.EmberStatus
        },
    },
    unusedPanIdFoundHandler: {
        ID: 0x00D2,
        request: null,
        response: {
            panId: types_1.EmberPanId,
            channel: types_1.uint8_t
        },
    },
    findUnusedPanId: {
        ID: 0x00D3,
        request: {
            channelMask: types_1.uint32_t,
            duration: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    stopScan: {
        ID: 0x001D,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    formNetwork: {
        ID: 0x001E,
        request: {
            parameters: types_1.EmberNetworkParameters
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    joinNetwork: {
        ID: 0x001F,
        request: {
            nodeType: types_1.EmberNodeType,
            parameters: types_1.EmberNetworkParameters
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    // joinNetworkDirectly: {
    //     ID: 0x003B,
    //     request: {
    //         localNodeType: EmberNodeType,
    //         beacon: EmberBeaconData,
    //         radioTxPower: int8s,
    //         clearBeaconsAfterNetworkUp: Bool
    //     },
    //     response: {
    //         status: EmberStatus
    //     },
    // },
    leaveNetwork: {
        ID: 0x0020,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    findAndRejoinNetwork: {
        ID: 0x0021,
        request: {
            haveCurrentNetworkKey: types_1.Bool,
            channelMask: types_1.uint32_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    permitJoining: {
        ID: 0x0022,
        request: {
            duration: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    childJoinHandler: {
        ID: 0x0023,
        request: null,
        response: {
            index: types_1.uint8_t,
            joining: types_1.Bool,
            childId: types_1.EmberNodeId,
            childEui64: types_1.EmberEUI64,
            childType: types_1.EmberNodeType
        },
    },
    energyScanRequest: {
        ID: 0x009C,
        request: {
            target: types_1.EmberNodeId,
            scanChannels: types_1.uint32_t,
            scanDuration: types_1.uint8_t,
            scanCount: types_1.uint16_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    getNetworkParameters: {
        ID: 0x0028,
        request: null,
        response: {
            status: types_1.EmberStatus,
            nodeType: types_1.EmberNodeType,
            parameters: types_1.EmberNetworkParameters
        },
    },
    getRadioParameters: {
        ID: 0x00FD,
        request: {
            childCount: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus,
            nodeType: types_1.EmberNodeType,
            parameters: types_1.EmberNetworkParameters
        },
    },
    getParentChildParameters: {
        ID: 0x0029,
        request: null,
        response: {
            childCount: types_1.uint8_t,
            parentEui64: types_1.EmberEUI64,
            parentNodeId: types_1.EmberNodeId
        },
    },
    getChildData: {
        ID: 0x004A,
        request: {
            index: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus,
            nodeId: types_1.EmberNodeId,
            eui64: types_1.EmberEUI64,
            nodeType: types_1.EmberNodeType
        },
    },
    getNeighbor: {
        ID: 0x0079,
        request: {
            index: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus,
            value: types_1.EmberNeighborTableEntry
        },
    },
    neighborCount: {
        ID: 0x007A,
        request: null,
        response: {
            value: types_1.uint8_t
        },
    },
    getRouteTableEntry: {
        ID: 0x007B,
        request: {
            index: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus,
            value: types_1.EmberRouteTableEntry
        },
    },
    setRadioPower: {
        ID: 0x0099,
        request: {
            power: types_1.int8s
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    setRadioChannel: {
        ID: 0x009A,
        request: {
            channel: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    setConcentrator: {
        ID: 0x0010,
        request: {
            on: types_1.Bool,
            concentratorType: types_1.uint16_t,
            minTime: types_1.uint16_t,
            maxTime: types_1.uint16_t,
            routeErrorThreshold: types_1.uint8_t,
            deliveryFailureThreshold: types_1.uint8_t,
            maxHops: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    // Binding Frames
    clearBindingTable: {
        ID: 0x002A,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    setBinding: {
        ID: 0x002B,
        request: {
            index: types_1.uint8_t,
            value: types_1.EmberBindingTableEntry
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    getBinding: {
        ID: 0x002C,
        request: {
            index: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus,
            value: types_1.EmberBindingTableEntry
        },
    },
    deleteBinding: {
        ID: 0x002D,
        request: {
            index: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    bindingIsActive: {
        ID: 0x002E,
        request: {
            index: types_1.uint8_t
        },
        response: {
            active: types_1.Bool
        },
    },
    getBindingRemoteNodeId: {
        ID: 0x002F,
        request: {
            index: types_1.uint8_t
        },
        response: {
            nodeId: types_1.EmberNodeId
        },
    },
    setBindingRemoteNodeId: {
        ID: 0x0030,
        request: {
            index: types_1.uint8_t,
            nodeId: types_1.EmberNodeId
        },
        response: null,
    },
    remoteSetBindingHandler: {
        ID: 0x0031,
        request: null,
        response: {
            entry: types_1.EmberBindingTableEntry,
            index: types_1.uint8_t,
            policyDecision: types_1.EmberStatus
        },
    },
    remoteDeleteBindingHandler: {
        ID: 0x0032,
        request: null,
        response: {
            index: types_1.uint8_t,
            policyDecision: types_1.EmberStatus
        },
    },
    // Messaging Frames
    maximumPayloadLength: {
        ID: 0x0033,
        request: null,
        response: {
            apsLength: types_1.uint8_t
        },
    },
    sendUnicast: {
        ID: 0x0034,
        request: {
            type: types_1.EmberOutgoingMessageType,
            indexOrDestination: types_1.EmberNodeId,
            apsFrame: types_1.EmberApsFrame,
            messageTag: types_1.uint8_t,
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus,
            sequence: types_1.uint8_t
        },
    },
    sendBroadcast: {
        ID: 0x0036,
        request: {
            destination: types_1.EmberNodeId,
            apsFrame: types_1.EmberApsFrame,
            radius: types_1.uint8_t,
            messageTag: types_1.uint8_t,
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus,
            sequence: types_1.uint8_t
        },
    },
    proxyBroadcast: {
        ID: 0x0037,
        request: {
            source: types_1.EmberNodeId,
            destination: types_1.EmberNodeId,
            nwkSequence: types_1.uint8_t,
            apsFrame: types_1.EmberApsFrame,
            radius: types_1.uint8_t,
            messageTag: types_1.uint8_t,
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus,
            apsSequence: types_1.uint8_t
        },
    },
    sendMulticast: {
        ID: 0x0038,
        request: {
            apsFrame: types_1.EmberApsFrame,
            hops: types_1.uint8_t,
            nonmemberRadius: types_1.uint8_t,
            messageTag: types_1.uint8_t,
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus,
            sequence: types_1.uint8_t
        },
    },
    sendMulticastWithAlias: {
        ID: 0x003A,
        request: {
            apsFrame: types_1.EmberApsFrame,
            hops: types_1.uint8_t,
            nonmemberRadius: types_1.uint8_t,
            alias: types_1.uint16_t,
            nwkSequence: types_1.uint8_t,
            messageTag: types_1.uint8_t,
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus,
            sequence: types_1.uint8_t
        },
    },
    sendReply: {
        ID: 0x0039,
        request: {
            sender: types_1.EmberNodeId,
            apsFrame: types_1.EmberApsFrame,
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    messageSentHandler: {
        ID: 0x003F,
        request: null,
        response: {
            type: types_1.EmberOutgoingMessageType,
            indexOrDestination: types_1.uint16_t,
            apsFrame: types_1.EmberApsFrame,
            messageTag: types_1.uint8_t,
            status: types_1.EmberStatus,
            message: types_1.LVBytes
        },
    },
    sendManyToOneRouteRequest: {
        ID: 0x0041,
        request: {
            concentratorType: types_1.uint16_t,
            radius: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    pollForData: {
        ID: 0x0042,
        request: {
            interval: types_1.uint16_t,
            units: types_1.EmberEventUnits,
            failureLimit: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    pollCompleteHandler: {
        ID: 0x0043,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    pollHandler: {
        ID: 0x0044,
        request: null,
        response: {
            childId: types_1.EmberNodeId
        },
    },
    incomingSenderEui64Handler: {
        ID: 0x0062,
        request: null,
        response: {
            senderEui64: types_1.EmberEUI64
        },
    },
    incomingMessageHandler: {
        ID: 0x0045,
        request: null,
        response: {
            type: types_1.EmberIncomingMessageType,
            apsFrame: types_1.EmberApsFrame,
            lastHopLqi: types_1.uint8_t,
            lastHopRssi: types_1.int8s,
            sender: types_1.EmberNodeId,
            bindingIndex: types_1.uint8_t,
            addressIndex: types_1.uint8_t,
            message: types_1.LVBytes
        },
    },
    incomingRouteRecordHandler: {
        ID: 0x0059,
        request: null,
        response: {
            source: types_1.EmberNodeId,
            longId: types_1.EmberEUI64,
            lastHopLqi: types_1.uint8_t,
            lastHopRssi: types_1.int8s,
            relay: types_1.LVBytes
        },
    },
    incomingManyToOneRouteRequestHandler: {
        ID: 0x007D,
        request: null,
        response: {
            source: types_1.EmberNodeId,
            longId: types_1.EmberEUI64,
            cost: types_1.uint8_t
        },
    },
    incomingRouteErrorHandler: {
        ID: 0x0080,
        request: null,
        response: {
            status: types_1.EmberStatus,
            target: types_1.EmberNodeId
        },
    },
    unicastCurrentNetworkKey: {
        ID: 0x0050,
        request: {
            targetShort: types_1.EmberNodeId,
            targetLong: types_1.EmberEUI64,
            parentShortId: types_1.EmberNodeId
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    addressTableEntryIsActive: {
        ID: 0x005B,
        request: {
            addressTableIndex: types_1.uint8_t
        },
        response: {
            active: types_1.Bool
        },
    },
    setAddressTableRemoteEui64: {
        ID: 0x005C,
        request: {
            addressTableIndex: types_1.uint8_t,
            eui64: types_1.EmberEUI64
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    setAddressTableRemoteNodeId: {
        ID: 0x005D,
        request: {
            addressTableIndex: types_1.uint8_t,
            id: types_1.EmberNodeId
        },
        response: null,
    },
    getAddressTableRemoteEui64: {
        ID: 0x005E,
        request: {
            addressTableIndex: types_1.uint8_t
        },
        response: {
            eui64: types_1.EmberEUI64
        },
    },
    getAddressTableRemoteNodeId: {
        ID: 0x005F,
        request: {
            addressTableIndex: types_1.uint8_t
        },
        response: {
            nodeId: types_1.EmberNodeId
        },
    },
    setExtendedTimeout: {
        ID: 0x007E,
        request: {
            remoteEui64: types_1.EmberEUI64,
            extendedTimeout: types_1.Bool
        },
        response: null,
    },
    getExtendedTimeout: {
        ID: 0x007F,
        request: {
            remoteEui64: types_1.EmberEUI64
        },
        response: {
            extendedTimeout: types_1.Bool
        },
    },
    replaceAddressTableEntry: {
        ID: 0x0082,
        request: {
            addressTableIndex: types_1.uint8_t,
            newEui64: types_1.EmberEUI64,
            newId: types_1.EmberNodeId,
            newExtendedTimeout: types_1.Bool
        },
        response: {
            status: types_1.EmberStatus,
            oldEui64: types_1.EmberEUI64,
            oldId: types_1.EmberNodeId,
            oldExtendedTimeout: types_1.Bool
        },
    },
    lookupNodeIdByEui64: {
        ID: 0x0060,
        request: {
            eui64: types_1.EmberEUI64
        },
        response: {
            nodeId: types_1.EmberNodeId
        },
    },
    lookupEui64ByNodeId: {
        ID: 0x0061,
        request: {
            nodeId: types_1.EmberNodeId
        },
        response: {
            status: types_1.EmberStatus,
            eui64: types_1.EmberEUI64
        },
    },
    getMulticastTableEntry: {
        ID: 0x0063,
        request: {
            index: types_1.uint8_t
        },
        response: {
            value: types_1.EmberMulticastTableEntry
        },
    },
    setMulticastTableEntry: {
        ID: 0x0064,
        request: {
            index: types_1.uint8_t,
            value: types_1.EmberMulticastTableEntry
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    idConflictHandler: {
        ID: 0x007C,
        request: null,
        response: {
            id: types_1.EmberNodeId
        },
    },
    writeNodeData: {
        ID: 0x00FE,
        request: {
            erase: types_1.Bool
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    sendRawMessage: {
        ID: 0x0096,
        request: {
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    sendRawMessageExtended: {
        ID: 0x0051,
        request: {
            message: types_1.LVBytes,
            priority: types_1.uint8_t,
            useCca: types_1.Bool
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    macPassthroughMessageHandler: {
        ID: 0x0097,
        request: null,
        response: {
            messageType: types_1.EmberMacPassthroughType,
            lastHopLqi: types_1.uint8_t,
            lastHopRssi: types_1.int8s,
            message: types_1.LVBytes
        },
    },
    macFilterMatchMessageHandler: {
        ID: 0x0046,
        request: null,
        response: {
            filterIndexMatch: types_1.uint8_t,
            legacyPassthroughType: types_1.EmberMacPassthroughType,
            lastHopLqi: types_1.uint8_t,
            lastHopRssi: types_1.int8s,
            message: types_1.LVBytes
        },
    },
    rawTransmitCompleteHandler: {
        ID: 0x0098,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    // Security Frames
    setInitialSecurityState: {
        ID: 0x0068,
        request: {
            state: types_1.EmberInitialSecurityState
        },
        response: {
            success: types_1.EmberStatus
        },
    },
    getCurrentSecurityState: {
        ID: 0x0069,
        request: null,
        response: {
            status: types_1.EmberStatus,
            state: types_1.EmberCurrentSecurityState
        },
    },
    getKey: {
        ID: 0x006a,
        request: {
            keyType: types_1.EmberKeyType
        },
        response: {
            status: types_1.EmberStatus,
            keyStruct: types_1.EmberKeyStruct
        },
    },
    switchNetworkKeyHandler: {
        ID: 0x006e,
        request: null,
        response: {
            sequenceNumber: types_1.uint8_t
        },
    },
    getKeyTableEntry: {
        ID: 0x0071,
        request: {
            index: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus,
            keyStruct: types_1.EmberKeyStruct
        },
    },
    setKeyTableEntry: {
        ID: 0x0072,
        request: {
            index: types_1.uint8_t,
            address: types_1.EmberEUI64,
            linkKey: types_1.Bool,
            keyData: types_1.EmberKeyData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    findKeyTableEntry: {
        ID: 0x0075,
        request: {
            address: types_1.EmberEUI64,
            linkKey: types_1.Bool
        },
        response: {
            index: types_1.uint8_t
        },
    },
    addOrUpdateKeyTableEntry: {
        ID: 0x0066,
        request: {
            address: types_1.EmberEUI64,
            linkKey: types_1.Bool,
            keyData: types_1.EmberKeyData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    sendTrustCenterLinkKey: {
        ID: 0x0067,
        request: {
            destinationNodeId: types_1.EmberNodeId,
            destinationEui64: types_1.EmberEUI64
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    eraseKeyTableEntry: {
        ID: 0x0076,
        request: {
            index: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    clearKeyTable: {
        ID: 0x00B1,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    requestLinkKey: {
        ID: 0x0014,
        request: {
            partner: types_1.EmberEUI64
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    updateTcLinkKey: {
        ID: 0x006C,
        request: {
            maxAttempts: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    zigbeeKeyEstablishmentHandler: {
        ID: 0x009B,
        request: null,
        response: {
            partner: types_1.EmberEUI64,
            status: types_1.EmberKeyStatus
        },
    },
    addTransientLinkKey: {
        ID: 0x00AF,
        request: {
            partner: types_1.EmberEUI64,
            transientKey: types_1.EmberKeyData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    clearTransientLinkKeys: {
        ID: 0x006B,
        request: null,
        response: null,
    },
    // getTransientLinkKey: {
    //     ID: 0x00CE,
    //     request: {
    //         eui: EmberEUI64
    //     },
    //     response: {
    //         status: EmberStatus,
    //         transientKeyData: EmberTransientKeyData
    //     },
    // },
    // Secure EZSP Frames
    setSecurityKey: {
        ID: 0x00CA,
        request: {
            key: types_1.EmberKeyData,
            securityType: types_1.SecureEzspSecurityType
        },
        response: {
            status: types_1.EzspStatus
        },
    },
    setSecurityParameters: {
        ID: 0x00CB,
        request: {
            securityLevel: types_1.SecureEzspSecurityLevel,
            hostRandomNumber: types_1.SecureEzspRandomNumber
        },
        response: {
            status: types_1.EzspStatus,
            returnNcpRandomNumber: types_1.SecureEzspRandomNumber
        },
    },
    resetToFactoryDefaults: {
        ID: 0x00CC,
        request: null,
        response: {
            status: types_1.EzspStatus
        },
    },
    getSecurityKeyStatus: {
        ID: 0x00CD,
        request: null,
        response: {
            status: types_1.EzspStatus,
            returnSecurityType: types_1.SecureEzspSecurityType
        },
    },
    // Trust Center Frames
    trustCenterJoinHandler: {
        ID: 0x0024,
        request: null,
        response: {
            newNodeId: types_1.EmberNodeId,
            newNodeEui64: types_1.EmberEUI64,
            status: types_1.EmberDeviceUpdate,
            policyDecision: types_1.EmberJoinDecision,
            parentOfNewNodeId: types_1.EmberNodeId
        },
    },
    broadcastNextNetworkKey: {
        ID: 0x0073,
        request: {
            key: types_1.EmberKeyData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    broadcastNetworkKeySwitch: {
        ID: 0x0074,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    becomeTrustCenter: {
        ID: 0x0077,
        request: {
            newNetworkKey: types_1.EmberKeyData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    aesMmoHash: {
        ID: 0x006F,
        request: {
            context: types_1.EmberAesMmoHashContext,
            finalize: types_1.Bool,
            data: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus,
            returnContext: types_1.EmberAesMmoHashContext
        },
    },
    removeDevice: {
        ID: 0x00A8,
        request: {
            destShort: types_1.EmberNodeId,
            destLong: types_1.EmberEUI64,
            targetLong: types_1.EmberEUI64
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    unicastNwkKeyUpdate: {
        ID: 0x00A9,
        request: {
            destShort: types_1.EmberNodeId,
            destLong: types_1.EmberEUI64,
            key: types_1.EmberKeyData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    // Certificate Based Key Exchange (CBKE) Frames
    generateCbkeKeys: {
        ID: 0x00A4,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    generateCbkeKeysHandler: {
        ID: 0x009E,
        request: null,
        response: {
            status: types_1.EmberStatus,
            ephemeralPublicKey: types_1.EmberPublicKeyData
        },
    },
    calculateSmacs: {
        ID: 0x009F,
        request: {
            amInitiator: types_1.Bool,
            partnerCertificate: types_1.EmberCertificateData,
            partnerEphemeralPublicKey: types_1.EmberPublicKeyData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    calculateSmacsHandler: {
        ID: 0x00A0,
        request: null,
        response: {
            status: types_1.EmberStatus,
            initiatorSmac: types_1.EmberSmacData,
            responderSmac: types_1.EmberSmacData
        },
    },
    generateCbkeKeys283k1: {
        ID: 0x00E8,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    generateCbkeKeysHandler283k1: {
        ID: 0x00E9,
        request: null,
        response: {
            status: types_1.EmberStatus,
            ephemeralPublicKey: types_1.EmberPublicKey283k1Data
        },
    },
    calculateSmacs283k1: {
        ID: 0x00EA,
        request: {
            amInitiator: types_1.Bool,
            partnerCertificate: types_1.EmberCertificate283k1Data,
            partnerEphemeralPublicKey: types_1.EmberPublicKey283k1Data
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    calculateSmacsHandler283k1: {
        ID: 0x00EB,
        request: null,
        response: {
            status: types_1.EmberStatus,
            initiatorSmac: types_1.EmberSmacData,
            responderSmac: types_1.EmberSmacData
        },
    },
    clearTemporaryDataMaybeStoreLinkKey: {
        ID: 0x00A1,
        request: {
            storeLinkKey: types_1.Bool
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    clearTemporaryDataMaybeStoreLinkKey283k1: {
        ID: 0x00EE,
        request: {
            storeLinkKey: types_1.Bool
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    getCertificate: {
        ID: 0x00A5,
        request: null,
        response: {
            status: types_1.EmberStatus,
            localCert: types_1.EmberCertificateData
        },
    },
    getCertificate283k1: {
        ID: 0x00EC,
        request: null,
        response: {
            status: types_1.EmberStatus,
            localCert: types_1.EmberCertificate283k1Data
        },
    },
    dsaSign: {
        ID: 0x00A6,
        request: {
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    dsaSignHandler: {
        ID: 0x00A7,
        request: null,
        response: {
            status: types_1.EmberStatus,
            message: types_1.LVBytes
        },
    },
    dsaVerify: {
        ID: 0x00A3,
        request: {
            digest: types_1.EmberMessageDigest,
            signerCertificate: types_1.EmberCertificateData,
            receivedSig: types_1.EmberSignatureData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    dsaVerifyHandler: {
        ID: 0x0078,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    dsaVerify283k1: {
        ID: 0x00B0,
        request: {
            digest: types_1.EmberMessageDigest,
            signerCertificate: types_1.EmberCertificate283k1Data,
            receivedSig: types_1.EmberSignature283k1Data
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    setPreinstalledCbkeData: {
        ID: 0x00A2,
        request: {
            caPublic: types_1.EmberPublicKeyData,
            myCert: types_1.EmberCertificateData,
            myKey: types_1.EmberPrivateKeyData
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    // setPreinstalledCbkeData283k1: {
    //     ID: 237,
    //     request: {
    //         attr: EmberPublicKey283k1Data,
    //         attr: EmberCertificate283k1Data,
    //         attr: EmberPrivateKey283k1Data
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // Mfglib Frames
    mfglibStart: {
        ID: 0x0083,
        request: {
            rxCallback: types_1.Bool
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibEnd: {
        ID: 0x0084,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibStartTone: {
        ID: 0x0085,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibStopTone: {
        ID: 0x0086,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibStartStream: {
        ID: 0x0087,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibStopStream: {
        ID: 0x0088,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibSendPacket: {
        ID: 0x0089,
        request: {
            packet: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibSetChannel: {
        ID: 0x008A,
        request: {
            channel: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibGetChannel: {
        ID: 0x008B,
        request: null,
        response: {
            channel: types_1.uint8_t
        },
    },
    mfglibSetPower: {
        ID: 0x008C,
        request: {
            txPowerMode: types_1.uint16_t,
            power: types_1.int8s
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    mfglibGetPower: {
        ID: 0x008D,
        request: null,
        response: {
            power: types_1.int8s
        },
    },
    mfglibRxHandler: {
        ID: 0x008E,
        request: null,
        response: {
            linkQuality: types_1.uint8_t,
            rssi: types_1.int8s,
            packet: types_1.LVBytes
        },
    },
    // Bootloader Frames
    launchStandaloneBootloader: {
        ID: 0x008F,
        request: {
            mode: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    sendBootloadMessage: {
        ID: 0x0090,
        request: {
            broadcast: types_1.Bool,
            destEui64: types_1.EmberEUI64,
            message: types_1.LVBytes
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    getStandaloneBootloaderVersionPlatMicroPhy: {
        ID: 0x0091,
        request: null,
        response: {
            bootloader_version: types_1.uint16_t,
            nodePlat: types_1.uint8_t,
            nodeMicro: types_1.uint8_t,
            nodePhy: types_1.uint8_t
        },
    },
    incomingBootloadMessageHandler: {
        ID: 0x0092,
        request: null,
        response: {
            longId: types_1.EmberEUI64,
            lastHopLqi: types_1.uint8_t,
            lastHopRssi: types_1.int8s,
            message: types_1.LVBytes
        },
    },
    bootloadTransmitCompleteHandler: {
        ID: 0x0093,
        request: null,
        response: {
            status: types_1.EmberStatus,
            message: types_1.LVBytes
        },
    },
    aesEncrypt: {
        ID: 0x0094,
        request: {
            plaintext: (0, types_1.fixed_list)(16, types_1.uint8_t),
            key: (0, types_1.fixed_list)(16, types_1.uint8_t)
        },
        response: {
            ciphertext: (0, types_1.fixed_list)(16, types_1.uint8_t)
        },
    },
    overrideCurrentChannel: {
        ID: 0x0095,
        request: {
            channel: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    // ZLL Frames
    zllNetworkOps: {
        ID: 0x00B2,
        request: {
            networkInfo: types_1.EmberZllNetwork,
            op: types_1.EzspZllNetworkOperation,
            radioTxPower: types_1.int8s
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    zllSetInitialSecurityState: {
        ID: 0x00B3,
        request: {
            networkKey: types_1.EmberKeyData,
            securityState: types_1.EmberZllInitialSecurityState
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    zllStartScan: {
        ID: 0x00B4,
        request: {
            channelMask: types_1.uint32_t,
            radioPowerForScan: types_1.int8s,
            nodeType: types_1.EmberNodeType
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    zllSetRxOnWhenIdle: {
        ID: 0x00B5,
        request: {
            durationMs: types_1.uint16_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    zllNetworkFoundHandler: {
        ID: 0x00B6,
        request: null,
        response: {
            networkInfo: types_1.EmberZllNetwork,
            isDeviceInfoNull: types_1.Bool,
            deviceInfo: types_1.EmberZllDeviceInfoRecord,
            lastHopLqi: types_1.uint8_t,
            lastHopRssi: types_1.int8s
        },
    },
    zllScanCompleteHandler: {
        ID: 0x00B7,
        request: null,
        response: {
            status: types_1.EmberStatus
        },
    },
    zllAddressAssignmentHandler: {
        ID: 0x00B8,
        request: null,
        response: {
            addressInfo: types_1.EmberZllAddressAssignment,
            lastHopLqi: types_1.uint8_t,
            lastHopRssi: types_1.int8s
        },
    },
    setLogicalAndRadioChannel: {
        ID: 0x00B9,
        request: {
            radioChannel: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    getLogicalChannel: {
        ID: 0x00BA,
        request: null,
        response: {
            logicalChannel: types_1.uint8_t
        },
    },
    zllTouchLinkTargetHandler: {
        ID: 0x00BB,
        request: null,
        response: {
            networkInfo: types_1.EmberZllNetwork
        },
    },
    zllGetTokens: {
        ID: 0x00BC,
        request: null,
        response: {
            data: types_1.EmberTokTypeStackZllData,
            security: types_1.EmberTokTypeStackZllSecurity
        },
    },
    zllSetDataToken: {
        ID: 0x00BD,
        request: {
            data: types_1.EmberTokTypeStackZllData
        },
        response: null,
    },
    zllSetNonZllNetwork: {
        ID: 0x00BF,
        request: null,
        response: null,
    },
    isZllNetwork: {
        ID: 0x00BE,
        request: null,
        response: {
            isZllNetwork: types_1.Bool
        },
    },
    // rf4ceSetPairingTableEntry: {
    //     ID: 208,
    //     request: {
    //         attr: uint8_t,
    //         attr: EmberRf4cePairingTableEntry
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceGetPairingTableEntry: {
    //     ID: 209,
    //     request: {
    //         attr: uint8_t
    //     },
    //     response: {
    //         attr: EmberStatus,
    //         attr: EmberRf4cePairingTableEntry
    //     },
    // },
    // rf4ceDeletePairingTableEntry: {
    //     ID: 210,
    //     request: {
    //         attr: uint8_t
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceKeyUpdate: {
    //     ID: 211,
    //     request: {
    //         attr: uint8_t,
    //         attr: EmberKeyData
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceSend: {
    //     ID: 212,
    //     request: {
    //         attr: uint8_t,
    //         attr: uint8_t,
    //         attr: uint16_t,
    //         attr: EmberRf4ceTxOption,
    //         attr: uint8_t,
    //         attr: LVBytes
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceIncomingMessageHandler: {
    //     ID: 213,
    //     request: null,
    //     response: {
    //         attr: uint8_t,
    //         attr: uint8_t,
    //         attr: uint16_t,
    //         attr: EmberRf4ceTxOption,
    //         attr: LVBytes
    //     },
    // },
    // rf4ceMessageSentHandler: {
    //     ID: 214,
    //     request: null,
    //     response: {
    //         attr: EmberStatus,
    //         attr: uint8_t,
    //         attr: EmberRf4ceTxOption,
    //         attr: uint8_t,
    //         attr: uint16_t,
    //         attr: uint8_t,
    //         attr: LVBytes
    //     },
    // },
    // rf4ceStart: {
    //     ID: 215,
    //     request: {
    //         attr: EmberRf4ceNodeCapabilities,
    //         attr: EmberRf4ceVendorInfo,
    //         attr: int8s
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceStop: {
    //     ID: 216,
    //     request: null,
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceDiscovery: {
    //     ID: 217,
    //     request: {
    //         attr: EmberPanId,
    //         attr: EmberNodeId,
    //         attr: uint8_t,
    //         attr: uint16_t,
    //         attr: LVBytes
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceDiscoveryCompleteHandler: {
    //     ID: 218,
    //     request: null,
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceDiscoveryRequestHandler: {
    //     ID: 219,
    //     request: null,
    //     response: {
    //         attr: EmberEUI64,
    //         attr: uint8_t,
    //         attr: EmberRf4ceVendorInfo,
    //         attr: EmberRf4ceApplicationInfo,
    //         attr: uint8_t,
    //         attr: uint8_t
    //     },
    // },
    // rf4ceDiscoveryResponseHandler: {
    //     ID: 220,
    //     request: null,
    //     response: {
    //         attr: Bool,
    //         attr: uint8_t,
    //         attr: EmberPanId,
    //         attr: EmberEUI64,
    //         attr: uint8_t,
    //         attr: EmberRf4ceVendorInfo,
    //         attr: EmberRf4ceApplicationInfo,
    //         attr: uint8_t,
    //         attr: uint8_t
    //     },
    // },
    // rf4ceEnableAutoDiscoveryResponse: {
    //     ID: 221,
    //     request: {
    //         attr: uint16_t
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceAutoDiscoveryResponseCompleteHandler: {
    //     ID: 222,
    //     request: null,
    //     response: {
    //         attr: EmberStatus,
    //         attr: EmberEUI64,
    //         attr: uint8_t,
    //         attr: EmberRf4ceVendorInfo,
    //         attr: EmberRf4ceApplicationInfo,
    //         attr: uint8_t
    //     },
    // },
    // rf4cePair: {
    //     ID: 223,
    //     request: {
    //         attr: uint8_t,
    //         attr: EmberPanId,
    //         attr: EmberEUI64,
    //         attr: uint8_t
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4cePairCompleteHandler: {
    //     ID: 224,
    //     request: null,
    //     response: {
    //         attr: EmberStatus,
    //         attr: uint8_t,
    //         attr: EmberRf4ceVendorInfo,
    //         attr: EmberRf4ceApplicationInfo
    //     },
    // },
    // rf4cePairRequestHandler: {
    //     ID: 225,
    //     request: null,
    //     response: {
    //         attr: EmberStatus,
    //         attr: uint8_t,
    //         attr: EmberEUI64,
    //         attr: uint8_t,
    //         attr: EmberRf4ceVendorInfo,
    //         attr: EmberRf4ceApplicationInfo,
    //         attr: uint8_t
    //     },
    // },
    // rf4ceUnpair: {
    //     ID: 226,
    //     request: {
    //         attr: uint8_t
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceUnpairHandler: {
    //     ID: 227,
    //     request: null,
    //     response: {
    //         attr: uint8_t
    //     },
    // },
    // rf4ceUnpairCompleteHandler: {
    //     ID: 228,
    //     request: null,
    //     response: {
    //         attr: uint8_t
    //     },
    // },
    // rf4ceSetPowerSavingParameters: {
    //     ID: 229,
    //     request: {
    //         attr: uint32_t,
    //         attr: uint32_t
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceSetFrequencyAgilityParameters: {
    //     ID: 230,
    //     request: {
    //         attr: uint8_t,
    //         attr: uint8_t,
    //         attr: int8s,
    //         attr: uint16_t,
    //         attr: uint8_t
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceSetApplicationInfo: {
    //     ID: 231,
    //     request: {
    //         attr: EmberRf4ceApplicationInfo
    //     },
    //     response: {
    //         attr: EmberStatus
    //     },
    // },
    // rf4ceGetApplicationInfo: {
    //     ID: 239,
    //     request: null,
    //     response: {
    //         attr: EmberStatus,
    //         attr: EmberRf4ceApplicationInfo
    //     },
    // },
    // rf4ceGetMaxPayload: {
    //     ID: 243,
    //     request: {
    //         attr: uint8_t,
    //         attr: EmberRf4ceTxOption
    //     },
    //     response: {
    //         attr: uint8_t
    //     },
    // },
    // rf4ceGetNetworkParameters: {
    //     ID: 244,
    //     request: null,
    //     response: {
    //         attr: EmberStatus,
    //         attr: EmberNodeType,
    //         attr: EmberNetworkParameters
    //     },
    // },
    // Green Power Frames
    gpProxyTableProcessGpPairing: {
        ID: 0x00C9,
        request: {
            options: types_1.uint32_t,
            addr: types_1.EmberGpAddress,
            commMode: types_1.uint8_t,
            sinkNetworkAddress: types_1.uint16_t,
            sinkGroupId: types_1.uint16_t,
            assignedAlias: types_1.uint16_t,
            sinkIeeeAddress: (0, types_1.fixed_list)(8, types_1.uint8_t),
            gpdKey: types_1.EmberKeyData,
            gpdSecurityFrameCounter: types_1.uint32_t,
            forwardingRadius: types_1.uint8_t
        },
        response: {
            gpPairingAdded: types_1.Bool
        },
    },
    dGpSend: {
        ID: 0x00C6,
        request: {
            action: types_1.Bool,
            useCca: types_1.Bool,
            addr: types_1.EmberGpAddress,
            gpdCommandId: types_1.uint8_t,
            gpdAsdu: types_1.LVBytes,
            gpepHandle: types_1.uint8_t,
            gpTxQueueEntryLifetimeMs: types_1.uint16_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    dGpSentHandler: {
        ID: 0x00C7,
        request: null,
        response: {
            status: types_1.EmberStatus,
            gpepHandle: types_1.uint8_t
        },
    },
    gpepIncomingMessageHandler: {
        ID: 0x00C5,
        request: null,
        response: {
            status: types_1.EmberStatus,
            gpdLink: types_1.uint8_t,
            sequenceNumber: types_1.uint8_t,
            addrType: types_1.uint8_t,
            addr: types_1.uint32_t,
            srcId: types_1.uint32_t,
            addrE: types_1.uint8_t,
            gpdfSecurityLevel: types_1.EmberGpSecurityLevel,
            gpdfSecurityKeyType: types_1.EmberGpKeyType,
            autoCommissioning: types_1.Bool,
            bidirectionalInfo: types_1.uint8_t,
            gpdSecurityFrameCounter: types_1.uint32_t,
            gpdCommandId: types_1.uint8_t,
            payload: types_1.Bytes,
            // mic: uint32_t,
            //attr: EmberGpSinkListEntry,
            // proxyTableIndex: uint8_t,
            // gpdCommandPayload: LVBytes
        },
    },
    changeSourceRouteHandler: {
        ID: 0x00C4,
        request: null,
        response: {
            newChildId: types_1.EmberNodeId,
            newParentId: types_1.EmberNodeId
        },
        maxV: 8
    },
    incomingNetworkStatusHandler: {
        ID: 0x00C4,
        request: null,
        response: {
            errorCode: types_1.uint8_t,
            target: types_1.EmberNodeId
        },
        minV: 9
    },
    setSourceRouteDiscoveryMode: {
        ID: 0x005a,
        request: {
            mode: types_1.uint8_t
        },
        response: {
            remainingTime: types_1.uint32_t
        },
    },
};
exports.FRAME_NAMES_BY_ID = {};
for (const key of Object.getOwnPropertyNames(exports.FRAMES)) {
    const frameDesc = exports.FRAMES[key];
    if (exports.FRAME_NAMES_BY_ID[frameDesc.ID]) {
        exports.FRAME_NAMES_BY_ID[frameDesc.ID].push(key);
    }
    else {
        exports.FRAME_NAMES_BY_ID[frameDesc.ID] = [key];
    }
}
exports.ZDOREQUESTS = {
    // ZDO Device and Discovery Attributes
    nodeDescReq: {
        ID: 0x0002,
        request: {
            transId: types_1.uint8_t,
            dstaddr: types_1.EmberNodeId
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    simpleDescReq: {
        ID: 0x0004,
        request: {
            transId: types_1.uint8_t,
            dstaddr: types_1.EmberNodeId,
            targetEp: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    activeEpReq: {
        ID: 0x0005,
        request: {
            transId: types_1.uint8_t,
            dstaddr: types_1.EmberNodeId
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    // ZDO Bind Manager Attributes
    bindReq: {
        ID: 0x0021,
        request: {
            transId: types_1.uint8_t,
            sourceEui: types_1.EmberEUI64,
            sourceEp: types_1.uint8_t,
            clusterId: types_1.uint16_t,
            destAddr: types_1.EmberMultiAddress
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    unBindReq: {
        ID: 0x0022,
        request: {
            transId: types_1.uint8_t,
            sourceEui: types_1.EmberEUI64,
            sourceEp: types_1.uint8_t,
            clusterId: types_1.uint16_t,
            destAddr: types_1.EmberMultiAddress
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    // ZDO network manager attributes commands 
    mgmtLqiReq: {
        ID: 0x0031,
        request: {
            transId: types_1.uint8_t,
            startindex: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    mgmtRtgReq: {
        ID: 0x0032,
        request: {
            transId: types_1.uint8_t,
            startindex: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    mgmtLeaveReq: {
        ID: 0x0034,
        request: {
            transId: types_1.uint8_t,
            destAddr: types_1.EmberEUI64,
            removechildrenRejoin: types_1.uint8_t
        },
        response: {
            status: types_1.EmberStatus
        },
    },
    mgmtPermitJoinReq: {
        ID: 0x0036,
        request: {
            transId: types_1.uint8_t,
            duration: types_1.uint8_t,
            tcSignificant: types_1.Bool
        },
        response: {
            status: types_1.EmberStatus
        },
    },
};
exports.ZDORESPONSES = {
    // ZDO Device and Discovery Attributes
    nodeDescRsp: {
        ID: 0x8002,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus,
            nwkaddr: types_1.EmberNodeId,
            descriptor: types_1.EmberNodeDescriptor
        },
    },
    simpleDescRsp: {
        ID: 0x8004,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus,
            nwkaddr: types_1.EmberNodeId,
            len: types_1.uint8_t,
            descriptor: types_1.EmberSimpleDescriptor
        },
    },
    activeEpRsp: {
        ID: 0x8005,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus,
            nwkaddr: types_1.EmberNodeId,
            activeeplist: types_1.LVBytes
        }
    },
    // ZDO Bind Manager Attributes
    bindRsp: {
        ID: 0x8021,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus
        }
    },
    unBindRsp: {
        ID: 0x8022,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus
        }
    },
    // ZDO network manager attributes commands 
    mgmtLqiRsp: {
        ID: 0x8031,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus,
            neighborlqilist: types_1.EmberNeighbors
        }
    },
    mgmtRtgRsp: {
        ID: 0x8032,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus,
            routingtablelist: types_1.EmberRoutingTable
        }
    },
    mgmtLeaveRsp: {
        ID: 0x8034,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus
        }
    },
    mgmtPermitJoinRsp: {
        ID: 0x8036,
        params: {
            transId: types_1.uint8_t,
            status: types_1.EmberStatus
        }
    },
};
exports.ZGP = {};
exports.ZDOREQUEST_NAME_BY_ID = {};
for (const key of Object.getOwnPropertyNames(exports.ZDOREQUESTS)) {
    const frameDesc = exports.ZDOREQUESTS[key];
    exports.ZDOREQUEST_NAME_BY_ID[frameDesc.ID] = key;
}
exports.ZDORESPONSE_NAME_BY_ID = {};
for (const key of Object.getOwnPropertyNames(exports.ZDORESPONSES)) {
    const frameDesc = exports.ZDORESPONSES[key];
    exports.ZDORESPONSE_NAME_BY_ID[frameDesc.ID] = key;
}
//# sourceMappingURL=commands.js.map