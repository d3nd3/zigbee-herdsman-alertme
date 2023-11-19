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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmberIeeeRawFrame = exports.EmberRawFrame = exports.EmberRoutingTable = exports.EmberRoutingTableEntry = exports.EmberNeighbors = exports.EmberNeighbor = exports.EmberMultiAddress = exports.EmberSimpleDescriptor = exports.EmberNodeDescriptor = exports.EmberGpSinkListEntry = exports.EmberGpAddress = exports.EmberRf4cePairingTableEntry = exports.EmberRf4ceApplicationInfo = exports.EmberRf4ceVendorInfo = exports.EmberTokTypeStackZllSecurity = exports.EmberTokTypeStackZllData = exports.EmberZllAddressAssignment = exports.EmberZllDeviceInfoRecord = exports.EmberZllInitialSecurityState = exports.EmberZllNetwork = exports.EmberZllSecurityAlgorithmData = exports.EmberNetworkInitStruct = exports.EmberKeyStruct = exports.EmberCurrentSecurityState = exports.EmberInitialSecurityState = exports.EmberRouteTableEntry = exports.EmberNeighborTableEntry = exports.EmberAesMmoHashContext = exports.EmberMessageDigest = exports.EmberSignature283k1Data = exports.EmberPrivateKey283k1Data = exports.EmberPublicKey283k1Data = exports.EmberCertificate283k1Data = exports.EmberSignatureData = exports.EmberSmacData = exports.EmberPrivateKeyData = exports.EmberPublicKeyData = exports.EmberCertificateData = exports.EmberKeyData = exports.EmberMulticastTableEntry = exports.EmberBindingTableEntry = exports.EmberApsFrame = exports.EmberZigbeeNetwork = exports.EmberNetworkParameters = exports.EzspStruct = void 0;
/* istanbul ignore file */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const basic = __importStar(require("./basic"));
const named = __importStar(require("./named"));
class EzspStruct {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    static serialize(cls, obj) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
        return Buffer.concat(cls._fields.map((field) => {
            const value = obj[field[0]];
            console.assert(field[1]);
            return field[1].serialize(field[1], value);
        }));
    }
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    static deserialize(cls, data) {
        const r = new cls();
        for (const [field_name, field_type] of cls._fields) {
            let v;
            [v, data] = field_type.deserialize(field_type, data);
            r[field_name] = v;
        }
        return [r, data];
    }
    toString() {
        return `${this.constructor.name}: ${JSON.stringify(this)}`;
    }
}
exports.EzspStruct = EzspStruct;
class EmberNetworkParameters extends EzspStruct {
}
EmberNetworkParameters._fields = [
    // The network's extended PAN identifier.
    ['extendedPanId', basic.fixed_list(8, basic.uint8_t)],
    // The network's PAN identifier.
    ['panId', basic.uint16_t],
    // A power setting, in dBm.
    ['radioTxPower', basic.uint8_t],
    // A radio channel.
    ['radioChannel', basic.uint8_t],
    // The method used to initially join the network.
    ['joinMethod', named.EmberJoinMethod],
    // NWK Manager ID. The ID of the network manager in the current network.
    // This may only be set at joining when using USE_NWK_COMMISSIONING as
    // the join method.
    ['nwkManagerId', named.EmberNodeId],
    // NWK Update ID. The value of the ZigBee nwkUpdateId known by the
    // stack. This is used to determine the newest instance of the network
    // after a PAN ID or channel change. This may only be set at joining
    // when using USE_NWK_COMMISSIONING as the join method.
    ['nwkUpdateId', basic.uint8_t],
    // NWK channel mask. The list of preferred channels that the NWK manager
    // has told this device to use when searching for the network. This may
    // only be set at joining when using USE_NWK_COMMISSIONING as the join
    // method.
    ['channels', basic.uint32_t],
];
exports.EmberNetworkParameters = EmberNetworkParameters;
class EmberZigbeeNetwork extends EzspStruct {
}
// The parameters of a ZigBee network.
EmberZigbeeNetwork._fields = [
    // The 802.15.4 channel associated with the network.
    ['channel', basic.uint8_t],
    // The network's PAN identifier.
    ['panId', basic.uint16_t],
    // The network's extended PAN identifier.
    ['extendedPanId', basic.fixed_list(8, basic.uint8_t)],
    // Whether the network is allowing MAC associations.
    ['allowingJoin', named.Bool],
    // The Stack Profile associated with the network.
    ['stackProfile', basic.uint8_t],
    // The instance of the Network.
    ['nwkUpdateId', basic.uint8_t],
];
exports.EmberZigbeeNetwork = EmberZigbeeNetwork;
class EmberApsFrame extends EzspStruct {
}
// ZigBee APS frame parameters.
EmberApsFrame._fields = [
    // The application profile ID that describes the format of the message.
    ['profileId', basic.uint16_t],
    // The cluster ID for this message.
    ['clusterId', basic.uint16_t],
    // The source endpoint.
    ['sourceEndpoint', basic.uint8_t],
    // The destination endpoint.
    ['destinationEndpoint', basic.uint8_t],
    // A bitmask of options.
    ['options', named.EmberApsOption],
    // The group ID for this message, if it is multicast mode.
    ['groupId', basic.uint16_t],
    // The sequence number.
    ['sequence', basic.uint8_t],
];
exports.EmberApsFrame = EmberApsFrame;
class EmberBindingTableEntry extends EzspStruct {
}
// An entry in the binding table.
EmberBindingTableEntry._fields = [
    // The type of binding.
    ['type', named.EmberBindingType],
    // The endpoint on the local node.
    ['local', basic.uint8_t],
    // A cluster ID that matches one from the local endpoint's simple
    // descriptor.This cluster ID is set by the provisioning application to
    // indicate which part an endpoint's functionality is bound to this
    // particular remote node and is used to distinguish between unicast and
    // multicast bindings.Note that a binding can be used to send messages
    // with any cluster ID, not just that listed in the binding.
    ['clusterId', basic.uint16_t],
    // The endpoint on the remote node [specified by identifier].
    ['remote', basic.uint8_t],
    // A 64- bit identifier.This is either the destination EUI64 [for
    // unicasts] or the 64- bit group address [for multicasts].
    ['identifier', named.EmberEUI64],
    // The index of the network the binding belongs to.
    ['networkIndex', basic.uint8_t],
];
exports.EmberBindingTableEntry = EmberBindingTableEntry;
class EmberMulticastTableEntry extends EzspStruct {
}
// A multicast table entry indicates that a particular endpoint is a member
// of a particular multicast group.Only devices with an endpoint in a
// multicast group will receive messages sent to that multicast group.
EmberMulticastTableEntry._fields = [
    // The multicast group ID.
    ['multicastId', named.EmberMulticastId],
    // The endpoint that is a member, or 0 if this entry is not in use[the
    // ZDO is not a member of any multicast groups.]
    ['endpoint', basic.uint8_t],
    // The network index of the network the entry is related to.
    ['networkIndex', basic.uint8_t],
];
exports.EmberMulticastTableEntry = EmberMulticastTableEntry;
class EmberKeyData extends EzspStruct {
}
// A 128- bit key.
EmberKeyData._fields = [
    // The key data.
    ['contents', basic.fixed_list(16, basic.uint8_t)],
];
exports.EmberKeyData = EmberKeyData;
class EmberCertificateData extends EzspStruct {
}
// The implicit certificate used in CBKE.
EmberCertificateData._fields = [
    // The certificate data.
    ['contents', basic.fixed_list(48, basic.uint8_t)],
];
exports.EmberCertificateData = EmberCertificateData;
class EmberPublicKeyData extends EzspStruct {
}
// The public key data used in CBKE.
EmberPublicKeyData._fields = [
    // The public key data.
    ['contents', basic.fixed_list(22, basic.uint8_t)],
];
exports.EmberPublicKeyData = EmberPublicKeyData;
class EmberPrivateKeyData extends EzspStruct {
}
// The private key data used in CBKE.
EmberPrivateKeyData._fields = [
    // The private key data.
    ['contents', basic.fixed_list(21, basic.uint8_t)],
];
exports.EmberPrivateKeyData = EmberPrivateKeyData;
class EmberSmacData extends EzspStruct {
}
// The Shared Message Authentication Code data used in CBKE.
EmberSmacData._fields = [
    // The Shared Message Authentication Code data.
    ['contents', basic.fixed_list(16, basic.uint8_t)],
];
exports.EmberSmacData = EmberSmacData;
class EmberSignatureData extends EzspStruct {
}
// An ECDSA signature
EmberSignatureData._fields = [
    // The signature data.
    ['contents', basic.fixed_list(42, basic.uint8_t)],
];
exports.EmberSignatureData = EmberSignatureData;
class EmberCertificate283k1Data extends EzspStruct {
}
// The implicit certificate used in CBKE.
EmberCertificate283k1Data._fields = [
    // The 283k1 certificate data.
    ['contents', basic.fixed_list(74, basic.uint8_t)],
];
exports.EmberCertificate283k1Data = EmberCertificate283k1Data;
class EmberPublicKey283k1Data extends EzspStruct {
}
// The public key data used in CBKE.
EmberPublicKey283k1Data._fields = [
    // The 283k1 public key data.
    ['contents', basic.fixed_list(37, basic.uint8_t)],
];
exports.EmberPublicKey283k1Data = EmberPublicKey283k1Data;
class EmberPrivateKey283k1Data extends EzspStruct {
}
// The private key data used in CBKE.
EmberPrivateKey283k1Data._fields = [
    // The 283k1 private key data.
    ['contents', basic.fixed_list(36, basic.uint8_t)],
];
exports.EmberPrivateKey283k1Data = EmberPrivateKey283k1Data;
class EmberSignature283k1Data extends EzspStruct {
}
// An ECDSA signature
EmberSignature283k1Data._fields = [
    // The 283k1 signature data.
    ['contents', basic.fixed_list(72, basic.uint8_t)],
];
exports.EmberSignature283k1Data = EmberSignature283k1Data;
class EmberMessageDigest extends EzspStruct {
}
// The calculated digest of a message
EmberMessageDigest._fields = [
    // The calculated digest of a message.
    ['contents', basic.fixed_list(16, basic.uint8_t)],
];
exports.EmberMessageDigest = EmberMessageDigest;
class EmberAesMmoHashContext extends EzspStruct {
}
// The hash context for an ongoing hash operation.
EmberAesMmoHashContext._fields = [
    // The result of ongoing the hash operation.
    ['result', basic.fixed_list(16, basic.uint8_t)],
    // The total length of the data that has been hashed so far.
    ['length', basic.uint32_t],
];
exports.EmberAesMmoHashContext = EmberAesMmoHashContext;
class EmberNeighborTableEntry extends EzspStruct {
}
// A neighbor table entry stores information about the reliability of RF
// links to and from neighboring nodes.
EmberNeighborTableEntry._fields = [
    // The neighbor's two byte network id
    ['shortId', basic.uint16_t],
    // An exponentially weighted moving average of the link quality values
    // of incoming packets from this neighbor as reported by the PHY.
    ['averageLqi', basic.uint8_t],
    // The incoming cost for this neighbor, computed from the average LQI.
    // Values range from 1 for a good link to 7 for a bad link.
    ['inCost', basic.uint8_t],
    // The outgoing cost for this neighbor, obtained from the most recently
    // received neighbor exchange message from the neighbor. A value of zero
    // means that a neighbor exchange message from the neighbor has not been
    // received recently enough, or that our id was not present in the most
    // recently received one.
    ['outCost', basic.uint8_t],
    // The number of aging periods elapsed since a link status message was
    // last received from this neighbor. The aging period is 16 seconds.
    ['age', basic.uint8_t],
    // The 8 byte EUI64 of the neighbor.
    ['longId', named.EmberEUI64],
];
exports.EmberNeighborTableEntry = EmberNeighborTableEntry;
class EmberRouteTableEntry extends EzspStruct {
}
// A route table entry stores information about the next hop along the route
// to the destination.
EmberRouteTableEntry._fields = [
    // The short id of the destination. A value of 0xFFFF indicates the
    // entry is unused.
    ['destination', basic.uint16_t],
    // The short id of the next hop to this destination.
    ['nextHop', basic.uint16_t],
    // Indicates whether this entry is active [0], being discovered [1]],
    // unused [3], or validating [4].
    ['status', basic.uint8_t],
    // The number of seconds since this route entry was last used to send a
    // packet.
    ['age', basic.uint8_t],
    // Indicates whether this destination is a High RAM Concentrator [2], a
    // Low RAM Concentrator [1], or not a concentrator [0].
    ['concentratorType', basic.uint8_t],
    // For a High RAM Concentrator, indicates whether a route record is
    // needed [2], has been sent [1], or is no long needed [0] because a
    // source routed message from the concentrator has been received.
    ['routeRecordState', basic.uint8_t],
];
exports.EmberRouteTableEntry = EmberRouteTableEntry;
class EmberInitialSecurityState extends EzspStruct {
}
// The security data used to set the configuration for the stack, or the
// retrieved configuration currently in use.
EmberInitialSecurityState._fields = [
    // A bitmask indicating the security state used to indicate what the
    // security configuration will be when the device forms or joins the
    // network.
    ['bitmask', named.EmberInitialSecurityBitmask],
    // The pre-configured Key data that should be used when forming or
    // joining the network. The security bitmask must be set with the
    // HAVE_PRECONFIGURED_KEY bit to indicate that the key contains valid
    // data.
    ['preconfiguredKey', EmberKeyData],
    // The Network Key that should be used by the Trust Center when it forms
    // the network, or the Network Key currently in use by a joined device.
    // The security bitmask must be set with HAVE_NETWORK_KEY to indicate
    // that the key contains valid data.
    ['networkKey', EmberKeyData],
    // The sequence number associated with the network key. This is only
    // valid if the HAVE_NETWORK_KEY has been set in the security bitmask.
    ['networkKeySequenceNumber', basic.uint8_t],
    // This is the long address of the trust center on the network that will
    // be joined. It is usually NOT set prior to joining the network and
    // instead it is learned during the joining message exchange. This field
    // is only examined if HAVE_TRUST_CENTER_EUI64 is set in the
    // EmberInitialSecurityState::bitmask. Most devices should clear that
    // bit and leave this field alone. This field must be set when using
    // commissioning mode.
    ['preconfiguredTrustCenterEui64', named.EmberEUI64],
];
exports.EmberInitialSecurityState = EmberInitialSecurityState;
class EmberCurrentSecurityState extends EzspStruct {
}
// The security options and information currently used by the stack.
EmberCurrentSecurityState._fields = [
    // A bitmask indicating the security options currently in use by a
    // device joined in the network.
    ['bitmask', named.EmberCurrentSecurityBitmask],
    // The IEEE Address of the Trust Center device.
    ['trustCenterLongAddress', named.EmberEUI64],
];
exports.EmberCurrentSecurityState = EmberCurrentSecurityState;
class EmberKeyStruct extends EzspStruct {
}
// A structure containing a key and its associated data.
EmberKeyStruct._fields = [
    // A bitmask indicating the presence of data within the various fields
    // in the structure.
    ['bitmask', named.EmberKeyStructBitmask],
    // The type of the key.
    ['type', named.EmberKeyType],
    // The actual key data.
    ['key', EmberKeyData],
    // The outgoing frame counter associated with the key.
    ['outgoingFrameCounter', basic.uint32_t],
    // The frame counter of the partner device associated with the key.
    ['incomingFrameCounter', basic.uint32_t],
    // The sequence number associated with the key.
    ['sequenceNumber', basic.uint8_t],
    // The IEEE address of the partner device also in possession of the key.
    ['partnerEUI64', named.EmberEUI64],
];
exports.EmberKeyStruct = EmberKeyStruct;
class EmberNetworkInitStruct extends EzspStruct {
}
// Network Initialization parameters.
EmberNetworkInitStruct._fields = [
    // Configuration options for network init.
    ['bitmask', named.EmberNetworkInitBitmask],
];
exports.EmberNetworkInitStruct = EmberNetworkInitStruct;
class EmberZllSecurityAlgorithmData extends EzspStruct {
}
// Data associated with the ZLL security algorithm.
EmberZllSecurityAlgorithmData._fields = [
    // Transaction identifier.
    ['transactionId', basic.uint32_t],
    // Response identifier.
    ['responseId', basic.uint32_t],
    // Bitmask.
    ['bitmask', basic.uint16_t],
];
exports.EmberZllSecurityAlgorithmData = EmberZllSecurityAlgorithmData;
class EmberZllNetwork extends EzspStruct {
}
// The parameters of a ZLL network.
EmberZllNetwork._fields = [
    // The parameters of a ZigBee network.
    ['zigbeeNetwork', EmberZigbeeNetwork],
    // Data associated with the ZLL security algorithm.
    ['securityAlgorithm', EmberZllSecurityAlgorithmData],
    // Associated EUI64.
    ['eui64', named.EmberEUI64],
    // The node id.
    ['nodeId', named.EmberNodeId],
    // The ZLL state.
    ['state', named.EmberZllState],
    // The node type.
    ['nodeType', named.EmberNodeType],
    // The number of sub devices.
    ['numberSubDevices', basic.uint8_t],
    // The total number of group identifiers.
    ['totalGroupIdentifiers', basic.uint8_t],
    // RSSI correction value.
    ['rssiCorrection', basic.uint8_t],
];
exports.EmberZllNetwork = EmberZllNetwork;
class EmberZllInitialSecurityState extends EzspStruct {
}
// Describes the initial security features and requirements that will be
// used when forming or joining ZLL networks.
EmberZllInitialSecurityState._fields = [
    // Unused bitmask; reserved for future use.
    ['bitmask', basic.uint32_t],
    // The key encryption algorithm advertised by the application.
    ['keyIndex', named.EmberZllKeyIndex],
    // The encryption key for use by algorithms that require it.
    ['encryptionKey', EmberKeyData],
    // The pre-configured link key used during classical ZigBee
    // commissioning.
    ['preconfiguredKey', EmberKeyData],
];
exports.EmberZllInitialSecurityState = EmberZllInitialSecurityState;
class EmberZllDeviceInfoRecord extends EzspStruct {
}
// Information about a specific ZLL Device.
EmberZllDeviceInfoRecord._fields = [
    // EUI64 associated with the device.
    ['ieeeAddress', named.EmberEUI64],
    // Endpoint id.
    ['endpointId', basic.uint8_t],
    // Profile id.
    ['profileId', basic.uint16_t],
    // Device id.
    ['deviceId', basic.uint16_t],
    // Associated version.
    ['version', basic.uint8_t],
    // Number of relevant group ids.
    ['groupIdCount', basic.uint8_t],
];
exports.EmberZllDeviceInfoRecord = EmberZllDeviceInfoRecord;
class EmberZllAddressAssignment extends EzspStruct {
}
// ZLL address assignment data.
EmberZllAddressAssignment._fields = [
    // Relevant node id.
    ['nodeId', named.EmberNodeId],
    // Minimum free node id.
    ['freeNodeIdMin', named.EmberNodeId],
    // Maximum free node id.
    ['freeNodeIdMax', named.EmberNodeId],
    // Minimum group id.
    ['groupIdMin', named.EmberMulticastId],
    // Maximum group id.
    ['groupIdMax', named.EmberMulticastId],
    // Minimum free group id.
    ['freeGroupIdMin', named.EmberMulticastId],
    // Maximum free group id.
    ['freeGroupIdMax', named.EmberMulticastId],
];
exports.EmberZllAddressAssignment = EmberZllAddressAssignment;
class EmberTokTypeStackZllData extends EzspStruct {
}
// Public API for ZLL stack data token.
EmberTokTypeStackZllData._fields = [
    // Token bitmask.
    ['bitmask', basic.uint32_t],
    // Minimum free node id.
    ['freeNodeIdMin', basic.uint16_t],
    // Maximum free node id.
    ['freeNodeIdMax', basic.uint16_t],
    // Local minimum group id.
    ['myGroupIdMin', basic.uint16_t],
    // Minimum free group id.
    ['freeGroupIdMin', basic.uint16_t],
    // Maximum free group id.
    ['freeGroupIdMax', basic.uint16_t],
    // RSSI correction value.
    ['rssiCorrection', basic.uint8_t],
];
exports.EmberTokTypeStackZllData = EmberTokTypeStackZllData;
class EmberTokTypeStackZllSecurity extends EzspStruct {
}
// Public API for ZLL stack security token.
EmberTokTypeStackZllSecurity._fields = [
    // Token bitmask.
    ['bitmask', basic.uint32_t],
    // Key index.
    ['keyIndex', basic.uint8_t],
    // Encryption key.
    ['encryptionKey', basic.fixed_list(16, basic.uint8_t)],
    // Preconfigured key.
    ['preconfiguredKey', basic.fixed_list(16, basic.uint8_t)],
];
exports.EmberTokTypeStackZllSecurity = EmberTokTypeStackZllSecurity;
class EmberRf4ceVendorInfo extends EzspStruct {
}
// The RF4CE vendor information block.
EmberRf4ceVendorInfo._fields = [
    // The vendor identifier field shall contain the vendor identifier of
    // the node.
    ['vendorId', basic.uint16_t],
    // The vendor string field shall contain the vendor string of the node.
    ['vendorString', basic.fixed_list(7, basic.uint8_t)],
];
exports.EmberRf4ceVendorInfo = EmberRf4ceVendorInfo;
class EmberRf4ceApplicationInfo extends EzspStruct {
}
// The RF4CE application information block.
EmberRf4ceApplicationInfo._fields = [
    // The application capabilities field shall contain information relating
    // to the capabilities of the application of the node.
    ['capabilities', named.EmberRf4ceApplicationCapabilities],
    // The user string field shall contain the user specified identification
    // string.
    ['userString', basic.fixed_list(15, basic.uint8_t)],
    // The device type list field shall contain the list of device types
    // supported by the node.
    ['deviceTypeList', basic.fixed_list(3, basic.uint8_t)],
    // The profile ID list field shall contain the list of profile
    // identifiers disclosed as supported by the node.
    ['profileIdList', basic.fixed_list(7, basic.uint8_t)],
];
exports.EmberRf4ceApplicationInfo = EmberRf4ceApplicationInfo;
class EmberRf4cePairingTableEntry extends EzspStruct {
}
// The internal representation of an RF4CE pairing table entry.
EmberRf4cePairingTableEntry._fields = [
    // The link key to be used to secure this pairing link.
    ['securityLinkKey', EmberKeyData],
    // The IEEE address of the destination device.
    ['destLongId', named.EmberEUI64],
    // The frame counter last received from the recipient node.
    ['frameCounter', basic.uint32_t],
    // The network address to be assumed by the source device.
    ['sourceNodeId', named.EmberNodeId],
    // The PAN identifier of the destination device.
    ['destPanId', named.EmberPanId],
    // The network address of the destination device.
    ['destNodeId', named.EmberNodeId],
    // The vendor ID of the destination device.
    ['destVendorId', basic.uint16_t],
    // The list of profiles supported by the destination device.
    ['destProfileIdList', basic.fixed_list(7, basic.uint8_t)],
    // The length of the list of supported profiles.
    ['destProfileIdListLength', basic.uint8_t],
    // Info byte.
    ['info', basic.uint8_t],
    // The expected channel of the destination device.
    ['channel', basic.uint8_t],
    // The node capabilities of the recipient node.
    ['capabilities', basic.uint8_t],
    // Last MAC sequence number seen on this pairing link.
    ['lastSeqn', basic.uint8_t],
];
exports.EmberRf4cePairingTableEntry = EmberRf4cePairingTableEntry;
class EmberGpAddress extends EzspStruct {
}
// A GP address structure.
EmberGpAddress._fields = [
    // The GPD's EUI64.
    ['gpdIeeeAddress', named.EmberEUI64],
    // The GPD's source ID.
    ['sourceId', basic.uint32_t],
    // The GPD Application ID.
    ['applicationId', basic.uint8_t],
    // The GPD endpoint.
    ['endpoint', basic.uint8_t],
];
exports.EmberGpAddress = EmberGpAddress;
class EmberGpSinkListEntry extends EzspStruct {
}
// A sink list entry
EmberGpSinkListEntry._fields = [
    // The sink list type.
    ['type', basic.uint8_t],
    // The EUI64 of the target sink.
    ['sinkEUI', named.EmberEUI64],
    // The short address of the target sink.
    ['sinkNodeId', named.EmberNodeId],
];
exports.EmberGpSinkListEntry = EmberGpSinkListEntry;
class EmberNodeDescriptor extends EzspStruct {
}
EmberNodeDescriptor._fields = [
    ['byte1', basic.uint8_t],
    ['byte2', basic.uint8_t],
    ['mac_capability_flags', basic.uint8_t],
    ['manufacturer_code', basic.uint16_t],
    ['maximum_buffer_size', basic.uint8_t],
    ['maximum_incoming_transfer_size', basic.uint16_t],
    ['server_mask', basic.uint16_t],
    ['maximum_outgoing_transfer_size', basic.uint16_t],
    ['descriptor_capability_field', basic.uint8_t],
];
exports.EmberNodeDescriptor = EmberNodeDescriptor;
class EmberSimpleDescriptor extends EzspStruct {
}
EmberSimpleDescriptor._fields = [
    ['endpoint', basic.uint8_t],
    ['profileid', basic.uint16_t],
    ['deviceid', basic.uint16_t],
    ['deviceversion', basic.uint8_t],
    ['inclusterlist', basic.LVList(basic.uint16_t)],
    ['outclusterlist', basic.LVList(basic.uint16_t)],
];
exports.EmberSimpleDescriptor = EmberSimpleDescriptor;
class EmberMultiAddress extends EzspStruct {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    static serialize(cls, obj) {
        const addrmode = obj['addrmode'];
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
        const fields = (addrmode == 3) ? cls.fields3 : cls.fields1;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
        return Buffer.concat(fields.map((field) => {
            const value = obj[field[0]];
            console.assert(field[1]);
            return field[1].serialize(field[1], value);
        }));
    }
}
EmberMultiAddress.fields3 = [
    ['addrmode', basic.uint8_t],
    ['ieee', named.EmberEUI64],
    ['endpoint', basic.uint8_t],
];
EmberMultiAddress.fields1 = [
    ['addrmode', basic.uint8_t],
    ['nwk', named.EmberNodeId],
];
exports.EmberMultiAddress = EmberMultiAddress;
class EmberNeighbor extends EzspStruct {
}
EmberNeighbor._fields = [
    ['extendedpanid', basic.fixed_list(8, basic.uint8_t)],
    ['ieee', named.EmberEUI64],
    ['nodeid', named.EmberNodeId],
    ['packed', basic.uint8_t],
    ['permitjoining', basic.uint8_t],
    ['depth', basic.uint8_t],
    ['lqi', basic.uint8_t],
];
exports.EmberNeighbor = EmberNeighbor;
class EmberNeighbors extends EzspStruct {
}
EmberNeighbors._fields = [
    ['entries', basic.uint8_t],
    ['startindex', basic.uint8_t],
    ['neighbors', basic.LVList(EmberNeighbor)],
];
exports.EmberNeighbors = EmberNeighbors;
class EmberRoutingTableEntry extends EzspStruct {
}
EmberRoutingTableEntry._fields = [
    ['destination', basic.uint16_t],
    ['status', basic.uint8_t],
    ['nexthop', basic.uint16_t],
];
exports.EmberRoutingTableEntry = EmberRoutingTableEntry;
class EmberRoutingTable extends EzspStruct {
}
EmberRoutingTable._fields = [
    ['entries', basic.uint8_t],
    ['startindex', basic.uint8_t],
    ['table', basic.LVList(EmberRoutingTableEntry)],
];
exports.EmberRoutingTable = EmberRoutingTable;
class EmberRawFrame extends EzspStruct {
}
EmberRawFrame._fields = [
    ['ieeeFrameControl', basic.uint16_t],
    ['sequence', basic.uint8_t],
    ['destPanId', named.EmberPanId],
    ['destNodeId', named.EmberNodeId],
    ['sourcePanId', named.EmberPanId],
    ['ieeeAddress', named.EmberEUI64],
    ['nwkFrameControl', basic.uint16_t],
    ['appFrameControl', basic.uint8_t],
    ['clusterId', basic.uint16_t],
    ['profileId', basic.uint16_t],
];
exports.EmberRawFrame = EmberRawFrame;
class EmberIeeeRawFrame extends EzspStruct {
}
EmberIeeeRawFrame._fields = [
    ['ieeeFrameControl', basic.uint16_t],
    ['sequence', basic.uint8_t],
    ['destPanId', named.EmberPanId],
    ['destAddress', named.EmberEUI64],
    ['sourcePanId', named.EmberPanId],
    ['sourceAddress', named.EmberEUI64],
    ['nwkFrameControl', basic.uint16_t],
    ['appFrameControl', basic.uint8_t],
    ['clusterId', basic.uint16_t],
    ['profileId', basic.uint16_t],
];
exports.EmberIeeeRawFrame = EmberIeeeRawFrame;
//# sourceMappingURL=struct.js.map