"use strict";
/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatorEndpoints = exports.PDMEventType = exports.ZPSNwkKeyType = exports.ZPSNwkKeyState = exports.ZiGateMessageCode = exports.ZiGateCommandCode = exports.RESTART_STATUS = exports.ON_OFF_STATUS = exports.NETWORK_JOIN_STATUS = exports.PERMIT_JOIN_STATUS = exports.STATUS = exports.NODE_LOGICAL_TYPE = exports.LOG_LEVEL = exports.BOOLEAN = exports.DEVICE_TYPE = exports.ADDRESS_MODE = void 0;
/* eslint-disable */
var ADDRESS_MODE;
(function (ADDRESS_MODE) {
    ADDRESS_MODE[ADDRESS_MODE["bound"] = 0] = "bound";
    ADDRESS_MODE[ADDRESS_MODE["group"] = 1] = "group";
    ADDRESS_MODE[ADDRESS_MODE["short"] = 2] = "short";
    ADDRESS_MODE[ADDRESS_MODE["ieee"] = 3] = "ieee";
    ADDRESS_MODE[ADDRESS_MODE["broadcast"] = 4] = "broadcast";
    ADDRESS_MODE[ADDRESS_MODE["no_transmit"] = 5] = "no_transmit";
    ADDRESS_MODE[ADDRESS_MODE["bound_no_ack"] = 6] = "bound_no_ack";
    ADDRESS_MODE[ADDRESS_MODE["short_no_ack"] = 7] = "short_no_ack";
    ADDRESS_MODE[ADDRESS_MODE["ieee_no_ack"] = 8] = "ieee_no_ack";
    ADDRESS_MODE[ADDRESS_MODE["bound_non_blocking"] = 9] = "bound_non_blocking";
    ADDRESS_MODE[ADDRESS_MODE["bound_non_blocking_no_ack"] = 10] = "bound_non_blocking_no_ack";
})(ADDRESS_MODE = exports.ADDRESS_MODE || (exports.ADDRESS_MODE = {}));
var DEVICE_TYPE;
(function (DEVICE_TYPE) {
    DEVICE_TYPE[DEVICE_TYPE["coordinator"] = 0] = "coordinator";
    DEVICE_TYPE[DEVICE_TYPE["router"] = 1] = "router";
    DEVICE_TYPE[DEVICE_TYPE["legacy_router"] = 2] = "legacy_router";
})(DEVICE_TYPE = exports.DEVICE_TYPE || (exports.DEVICE_TYPE = {}));
var BOOLEAN;
(function (BOOLEAN) {
    BOOLEAN[BOOLEAN["false"] = 0] = "false";
    BOOLEAN[BOOLEAN["true"] = 1] = "true";
})(BOOLEAN = exports.BOOLEAN || (exports.BOOLEAN = {}));
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["EMERG"] = 0] = "EMERG";
    LOG_LEVEL[LOG_LEVEL["ALERT"] = 1] = "ALERT";
    LOG_LEVEL[LOG_LEVEL["CRIT "] = 2] = "CRIT ";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["WARN "] = 4] = "WARN ";
    LOG_LEVEL[LOG_LEVEL["NOT  "] = 5] = "NOT  ";
    LOG_LEVEL[LOG_LEVEL["INFO "] = 6] = "INFO ";
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 7] = "DEBUG";
})(LOG_LEVEL = exports.LOG_LEVEL || (exports.LOG_LEVEL = {}));
var NODE_LOGICAL_TYPE;
(function (NODE_LOGICAL_TYPE) {
    NODE_LOGICAL_TYPE[NODE_LOGICAL_TYPE["coordinator"] = 0] = "coordinator";
    NODE_LOGICAL_TYPE[NODE_LOGICAL_TYPE["router"] = 1] = "router";
    NODE_LOGICAL_TYPE[NODE_LOGICAL_TYPE["end_device"] = 2] = "end_device";
})(NODE_LOGICAL_TYPE = exports.NODE_LOGICAL_TYPE || (exports.NODE_LOGICAL_TYPE = {}));
var STATUS;
(function (STATUS) {
    STATUS[STATUS["E_SL_MSG_STATUS_SUCCESS"] = 0] = "E_SL_MSG_STATUS_SUCCESS";
    STATUS[STATUS["E_SL_MSG_STATUS_INCORRECT_PARAMETERS"] = 1] = "E_SL_MSG_STATUS_INCORRECT_PARAMETERS";
    STATUS[STATUS["E_SL_MSG_STATUS_UNHANDLED_COMMAND"] = 2] = "E_SL_MSG_STATUS_UNHANDLED_COMMAND";
    STATUS[STATUS["E_SL_MSG_STATUS_BUSY"] = 3] = "E_SL_MSG_STATUS_BUSY";
    STATUS[STATUS["E_SL_MSG_STATUS_STACK_ALREADY_STARTED"] = 4] = "E_SL_MSG_STATUS_STACK_ALREADY_STARTED";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
var PERMIT_JOIN_STATUS;
(function (PERMIT_JOIN_STATUS) {
    PERMIT_JOIN_STATUS[PERMIT_JOIN_STATUS["on"] = 1] = "on";
    PERMIT_JOIN_STATUS[PERMIT_JOIN_STATUS["off"] = 0] = "off";
})(PERMIT_JOIN_STATUS = exports.PERMIT_JOIN_STATUS || (exports.PERMIT_JOIN_STATUS = {}));
var NETWORK_JOIN_STATUS;
(function (NETWORK_JOIN_STATUS) {
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["joined_existing_network"] = 0] = "joined_existing_network";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["formed_new_network"] = 1] = "formed_new_network";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_128"] = 128] = "failed_128";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_129"] = 129] = "failed_129";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_130"] = 130] = "failed_130";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_131"] = 131] = "failed_131";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_132"] = 132] = "failed_132";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_133"] = 133] = "failed_133";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_134"] = 134] = "failed_134";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_135"] = 135] = "failed_135";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_136"] = 136] = "failed_136";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_137"] = 137] = "failed_137";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_138"] = 138] = "failed_138";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_139"] = 139] = "failed_139";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_140"] = 140] = "failed_140";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_141"] = 141] = "failed_141";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_142"] = 142] = "failed_142";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_143"] = 143] = "failed_143";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_144"] = 144] = "failed_144";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_145"] = 145] = "failed_145";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_146"] = 146] = "failed_146";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_147"] = 147] = "failed_147";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_148"] = 148] = "failed_148";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_149"] = 149] = "failed_149";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_150"] = 150] = "failed_150";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_151"] = 151] = "failed_151";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_152"] = 152] = "failed_152";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_153"] = 153] = "failed_153";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_154"] = 154] = "failed_154";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_155"] = 155] = "failed_155";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_156"] = 156] = "failed_156";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_157"] = 157] = "failed_157";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_158"] = 158] = "failed_158";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_159"] = 159] = "failed_159";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_160"] = 160] = "failed_160";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_161"] = 161] = "failed_161";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_162"] = 162] = "failed_162";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_163"] = 163] = "failed_163";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_164"] = 164] = "failed_164";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_165"] = 165] = "failed_165";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_166"] = 166] = "failed_166";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_167"] = 167] = "failed_167";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_168"] = 168] = "failed_168";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_169"] = 169] = "failed_169";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_170"] = 170] = "failed_170";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_171"] = 171] = "failed_171";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_172"] = 172] = "failed_172";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_173"] = 173] = "failed_173";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_174"] = 174] = "failed_174";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_175"] = 175] = "failed_175";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_176"] = 176] = "failed_176";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_177"] = 177] = "failed_177";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_178"] = 178] = "failed_178";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_179"] = 179] = "failed_179";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_180"] = 180] = "failed_180";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_181"] = 181] = "failed_181";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_182"] = 182] = "failed_182";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_183"] = 183] = "failed_183";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_184"] = 184] = "failed_184";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_185"] = 185] = "failed_185";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_186"] = 186] = "failed_186";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_187"] = 187] = "failed_187";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_188"] = 188] = "failed_188";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_189"] = 189] = "failed_189";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_190"] = 190] = "failed_190";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_191"] = 191] = "failed_191";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_192"] = 192] = "failed_192";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_193"] = 193] = "failed_193";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_194"] = 194] = "failed_194";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_195"] = 195] = "failed_195";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_196"] = 196] = "failed_196";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_197"] = 197] = "failed_197";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_198"] = 198] = "failed_198";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_199"] = 199] = "failed_199";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_200"] = 200] = "failed_200";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_201"] = 201] = "failed_201";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_202"] = 202] = "failed_202";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_203"] = 203] = "failed_203";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_204"] = 204] = "failed_204";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_205"] = 205] = "failed_205";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_206"] = 206] = "failed_206";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_207"] = 207] = "failed_207";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_208"] = 208] = "failed_208";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_209"] = 209] = "failed_209";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_210"] = 210] = "failed_210";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_211"] = 211] = "failed_211";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_212"] = 212] = "failed_212";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_213"] = 213] = "failed_213";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_214"] = 214] = "failed_214";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_215"] = 215] = "failed_215";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_216"] = 216] = "failed_216";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_217"] = 217] = "failed_217";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_218"] = 218] = "failed_218";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_219"] = 219] = "failed_219";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_220"] = 220] = "failed_220";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_221"] = 221] = "failed_221";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_222"] = 222] = "failed_222";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_223"] = 223] = "failed_223";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_224"] = 224] = "failed_224";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_225"] = 225] = "failed_225";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_226"] = 226] = "failed_226";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_227"] = 227] = "failed_227";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_228"] = 228] = "failed_228";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_229"] = 229] = "failed_229";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_230"] = 230] = "failed_230";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_231"] = 231] = "failed_231";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_232"] = 232] = "failed_232";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_233"] = 233] = "failed_233";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_234"] = 234] = "failed_234";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_235"] = 235] = "failed_235";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_236"] = 236] = "failed_236";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_237"] = 237] = "failed_237";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_238"] = 238] = "failed_238";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_239"] = 239] = "failed_239";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_240"] = 240] = "failed_240";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_241"] = 241] = "failed_241";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_242"] = 242] = "failed_242";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_243"] = 243] = "failed_243";
    NETWORK_JOIN_STATUS[NETWORK_JOIN_STATUS["failed_244"] = 244] = "failed_244";
})(NETWORK_JOIN_STATUS = exports.NETWORK_JOIN_STATUS || (exports.NETWORK_JOIN_STATUS = {}));
var ON_OFF_STATUS;
(function (ON_OFF_STATUS) {
    ON_OFF_STATUS[ON_OFF_STATUS["on"] = 1] = "on";
    ON_OFF_STATUS[ON_OFF_STATUS["off"] = 0] = "off";
})(ON_OFF_STATUS = exports.ON_OFF_STATUS || (exports.ON_OFF_STATUS = {}));
var RESTART_STATUS;
(function (RESTART_STATUS) {
    RESTART_STATUS[RESTART_STATUS["startup"] = 0] = "startup";
    RESTART_STATUS[RESTART_STATUS["nfn_start"] = 2] = "nfn_start";
    RESTART_STATUS[RESTART_STATUS["running"] = 6] = "running";
})(RESTART_STATUS = exports.RESTART_STATUS || (exports.RESTART_STATUS = {}));
var ZiGateCommandCode;
(function (ZiGateCommandCode) {
    ZiGateCommandCode[ZiGateCommandCode["GetNetworkState"] = 9] = "GetNetworkState";
    ZiGateCommandCode[ZiGateCommandCode["RawMode"] = 2] = "RawMode";
    ZiGateCommandCode[ZiGateCommandCode["SetExtendedPANID"] = 32] = "SetExtendedPANID";
    ZiGateCommandCode[ZiGateCommandCode["SetChannelMask"] = 33] = "SetChannelMask";
    ZiGateCommandCode[ZiGateCommandCode["GetVersion"] = 16] = "GetVersion";
    ZiGateCommandCode[ZiGateCommandCode["Reset"] = 17] = "Reset";
    ZiGateCommandCode[ZiGateCommandCode["ErasePersistentData"] = 18] = "ErasePersistentData";
    ZiGateCommandCode[ZiGateCommandCode["RemoveDevice"] = 38] = "RemoveDevice";
    ZiGateCommandCode[ZiGateCommandCode["PermitJoin"] = 73] = "PermitJoin";
    ZiGateCommandCode[ZiGateCommandCode["RawAPSDataRequest"] = 1328] = "RawAPSDataRequest";
    ZiGateCommandCode[ZiGateCommandCode["GetTimeServer"] = 23] = "GetTimeServer";
    ZiGateCommandCode[ZiGateCommandCode["SetTimeServer"] = 22] = "SetTimeServer";
    ZiGateCommandCode[ZiGateCommandCode["PermitJoinStatus"] = 20] = "PermitJoinStatus";
    ZiGateCommandCode[ZiGateCommandCode["GetDevicesList"] = 21] = "GetDevicesList";
    ZiGateCommandCode[ZiGateCommandCode["StartNetwork"] = 36] = "StartNetwork";
    ZiGateCommandCode[ZiGateCommandCode["StartNetworkScan"] = 37] = "StartNetworkScan";
    ZiGateCommandCode[ZiGateCommandCode["SetCertification"] = 25] = "SetCertification";
    ZiGateCommandCode[ZiGateCommandCode["Bind"] = 48] = "Bind";
    ZiGateCommandCode[ZiGateCommandCode["UnBind"] = 49] = "UnBind";
    // ResetFactoryNew = 0x0013,
    ZiGateCommandCode[ZiGateCommandCode["OnOff"] = 146] = "OnOff";
    ZiGateCommandCode[ZiGateCommandCode["OnOffTimed"] = 147] = "OnOffTimed";
    ZiGateCommandCode[ZiGateCommandCode["ActiveEndpoint"] = 69] = "ActiveEndpoint";
    ZiGateCommandCode[ZiGateCommandCode["AttributeDiscovery"] = 320] = "AttributeDiscovery";
    ZiGateCommandCode[ZiGateCommandCode["AttributeRead"] = 256] = "AttributeRead";
    ZiGateCommandCode[ZiGateCommandCode["AttributeWrite"] = 272] = "AttributeWrite";
    ZiGateCommandCode[ZiGateCommandCode["DescriptorComplex"] = 1329] = "DescriptorComplex";
    ZiGateCommandCode[ZiGateCommandCode["NodeDescriptor"] = 66] = "NodeDescriptor";
    ZiGateCommandCode[ZiGateCommandCode["PowerDescriptor"] = 68] = "PowerDescriptor";
    ZiGateCommandCode[ZiGateCommandCode["SimpleDescriptor"] = 67] = "SimpleDescriptor";
    ZiGateCommandCode[ZiGateCommandCode["SetDeviceType"] = 35] = "SetDeviceType";
    ZiGateCommandCode[ZiGateCommandCode["IEEEAddress"] = 65] = "IEEEAddress";
    ZiGateCommandCode[ZiGateCommandCode["LED"] = 24] = "LED";
    ZiGateCommandCode[ZiGateCommandCode["SetTXpower"] = 2054] = "SetTXpower";
    ZiGateCommandCode[ZiGateCommandCode["ManagementLeaveRequest"] = 71] = "ManagementLeaveRequest";
    ZiGateCommandCode[ZiGateCommandCode["ManagementLQI"] = 78] = "ManagementLQI";
    ZiGateCommandCode[ZiGateCommandCode["SetSecurityStateKey"] = 34] = "SetSecurityStateKey";
    ZiGateCommandCode[ZiGateCommandCode["AddGroup"] = 96] = "AddGroup";
})(ZiGateCommandCode = exports.ZiGateCommandCode || (exports.ZiGateCommandCode = {}));
var ZiGateMessageCode;
(function (ZiGateMessageCode) {
    ZiGateMessageCode[ZiGateMessageCode["DeviceAnnounce"] = 77] = "DeviceAnnounce";
    ZiGateMessageCode[ZiGateMessageCode["Status"] = 32768] = "Status";
    ZiGateMessageCode[ZiGateMessageCode["LOG"] = 32769] = "LOG";
    ZiGateMessageCode[ZiGateMessageCode["DataIndication"] = 32770] = "DataIndication";
    ZiGateMessageCode[ZiGateMessageCode["NodeClusterList"] = 32771] = "NodeClusterList";
    ZiGateMessageCode[ZiGateMessageCode["NodeAttributeList"] = 32772] = "NodeAttributeList";
    ZiGateMessageCode[ZiGateMessageCode["NodeCommandIDList"] = 32773] = "NodeCommandIDList";
    ZiGateMessageCode[ZiGateMessageCode["SimpleDescriptorResponse"] = 32835] = "SimpleDescriptorResponse";
    ZiGateMessageCode[ZiGateMessageCode["NetworkState"] = 32777] = "NetworkState";
    ZiGateMessageCode[ZiGateMessageCode["VersionList"] = 32784] = "VersionList";
    ZiGateMessageCode[ZiGateMessageCode["APSDataACK"] = 32785] = "APSDataACK";
    ZiGateMessageCode[ZiGateMessageCode["APSDataConfirm"] = 32786] = "APSDataConfirm";
    ZiGateMessageCode[ZiGateMessageCode["APSDataConfirmFailed"] = 34562] = "APSDataConfirmFailed";
    ZiGateMessageCode[ZiGateMessageCode["NetworkJoined"] = 32804] = "NetworkJoined";
    ZiGateMessageCode[ZiGateMessageCode["LeaveIndication"] = 32840] = "LeaveIndication";
    ZiGateMessageCode[ZiGateMessageCode["RouterDiscoveryConfirm"] = 34561] = "RouterDiscoveryConfirm";
    ZiGateMessageCode[ZiGateMessageCode["PermitJoinStatus"] = 32788] = "PermitJoinStatus";
    ZiGateMessageCode[ZiGateMessageCode["GetTimeServer"] = 32791] = "GetTimeServer";
    ZiGateMessageCode[ZiGateMessageCode["ManagementLQIResponse"] = 32846] = "ManagementLQIResponse";
    ZiGateMessageCode[ZiGateMessageCode["ManagementLeaveResponse"] = 32839] = "ManagementLeaveResponse";
    ZiGateMessageCode[ZiGateMessageCode["PDMEvent"] = 32821] = "PDMEvent";
    ZiGateMessageCode[ZiGateMessageCode["PDMLoaded"] = 770] = "PDMLoaded";
    ZiGateMessageCode[ZiGateMessageCode["RestartNonFactoryNew"] = 32774] = "RestartNonFactoryNew";
    ZiGateMessageCode[ZiGateMessageCode["RestartFactoryNew"] = 32775] = "RestartFactoryNew";
    ZiGateMessageCode[ZiGateMessageCode["ExtendedStatusCallBack"] = 39321] = "ExtendedStatusCallBack";
    ZiGateMessageCode[ZiGateMessageCode["AddGroupResponse"] = 32864] = "AddGroupResponse";
})(ZiGateMessageCode = exports.ZiGateMessageCode || (exports.ZiGateMessageCode = {}));
var ZPSNwkKeyState;
(function (ZPSNwkKeyState) {
    ZPSNwkKeyState[ZPSNwkKeyState["ZPS_ZDO_NO_NETWORK_KEY"] = 0] = "ZPS_ZDO_NO_NETWORK_KEY";
    ZPSNwkKeyState[ZPSNwkKeyState["ZPS_ZDO_PRECONFIGURED_LINK_KEY"] = 1] = "ZPS_ZDO_PRECONFIGURED_LINK_KEY";
    ZPSNwkKeyState[ZPSNwkKeyState["ZPS_ZDO_DISTRIBUTED_LINK_KEY"] = 2] = "ZPS_ZDO_DISTRIBUTED_LINK_KEY";
    ZPSNwkKeyState[ZPSNwkKeyState["ZPS_ZDO_PRECONFIGURED_INSTALLATION_CODE"] = 3] = "ZPS_ZDO_PRECONFIGURED_INSTALLATION_CODE";
})(ZPSNwkKeyState = exports.ZPSNwkKeyState || (exports.ZPSNwkKeyState = {}));
var ZPSNwkKeyType;
(function (ZPSNwkKeyType) {
    ZPSNwkKeyType[ZPSNwkKeyType["ZPS_APS_UNIQUE_LINK_KEY"] = 0] = "ZPS_APS_UNIQUE_LINK_KEY";
    ZPSNwkKeyType[ZPSNwkKeyType["ZPS_APS_GLOBAL_LINK_KEY"] = 1] = "ZPS_APS_GLOBAL_LINK_KEY";
})(ZPSNwkKeyType = exports.ZPSNwkKeyType || (exports.ZPSNwkKeyType = {}));
var PDMEventType;
(function (PDMEventType) {
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_WEAR_COUNT_TRIGGER_VALUE_REACHED"] = 0] = "E_PDM_SYSTEM_EVENT_WEAR_COUNT_TRIGGER_VALUE_REACHED";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_DESCRIPTOR_SAVE_FAILED"] = 1] = "E_PDM_SYSTEM_EVENT_DESCRIPTOR_SAVE_FAILED";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_PDM_NOT_ENOUGH_SPACE"] = 2] = "E_PDM_SYSTEM_EVENT_PDM_NOT_ENOUGH_SPACE";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_LARGEST_RECORD_FULL_SAVE_NO_LONGER_POSSIBLE"] = 3] = "E_PDM_SYSTEM_EVENT_LARGEST_RECORD_FULL_SAVE_NO_LONGER_POSSIBLE";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SEGMENT_DATA_CHECKSUM_FAIL"] = 4] = "E_PDM_SYSTEM_EVENT_SEGMENT_DATA_CHECKSUM_FAIL";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SEGMENT_SAVE_OK"] = 5] = "E_PDM_SYSTEM_EVENT_SEGMENT_SAVE_OK";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_EEPROM_SEGMENT_HEADER_REPAIRED"] = 6] = "E_PDM_SYSTEM_EVENT_EEPROM_SEGMENT_HEADER_REPAIRED";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SYSTEM_INTERNAL_BUFFER_WEAR_COUNT_SWAP"] = 7] = "E_PDM_SYSTEM_EVENT_SYSTEM_INTERNAL_BUFFER_WEAR_COUNT_SWAP";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SYSTEM_DUPLICATE_FILE_SEGMENT_DETECTED"] = 8] = "E_PDM_SYSTEM_EVENT_SYSTEM_DUPLICATE_FILE_SEGMENT_DETECTED";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SYSTEM_ERROR"] = 9] = "E_PDM_SYSTEM_EVENT_SYSTEM_ERROR";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SEGMENT_PREWRITE"] = 10] = "E_PDM_SYSTEM_EVENT_SEGMENT_PREWRITE";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SEGMENT_POSTWRITE"] = 11] = "E_PDM_SYSTEM_EVENT_SEGMENT_POSTWRITE";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SEQUENCE_DUPLICATE_DETECTED"] = 12] = "E_PDM_SYSTEM_EVENT_SEQUENCE_DUPLICATE_DETECTED";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_SEQUENCE_VERIFY_FAIL"] = 13] = "E_PDM_SYSTEM_EVENT_SEQUENCE_VERIFY_FAIL";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_PDM_SMART_SAVE"] = 14] = "E_PDM_SYSTEM_EVENT_PDM_SMART_SAVE";
    PDMEventType[PDMEventType["E_PDM_SYSTEM_EVENT_PDM_FULL_SAVE"] = 15] = "E_PDM_SYSTEM_EVENT_PDM_FULL_SAVE";
})(PDMEventType = exports.PDMEventType || (exports.PDMEventType = {}));
const coordinatorEndpoints = [
    {
        ID: 0x01,
        profileID: 0x0104,
        deviceID: 0x0840,
        inputClusters: [
            0x0000,
            0x0003,
            0x0019,
            0x0204,
            0x000F,
        ],
        outputClusters: [
            0x0B03,
            0x0000,
            0x0300,
            0x0004,
            0x0003,
            0x0008,
            0x0006,
            0x0005,
            0x0101,
            0x0702,
            0x0500,
            0x0019,
            0x0201,
            0x0401,
            0x0400,
            0x0406,
            0x0403,
            0x0405,
            0x0402,
            0x0204,
            0x0001,
            0x0B05,
            0x1000
        ]
    },
    {
        ID: 0x0A,
        profileID: 0x0104,
        deviceID: 0x0840,
        inputClusters: [
            0x0000,
            0x0003,
            0x0019,
            0x0204,
            0x000F,
        ],
        outputClusters: [
            0x0B03,
            0x0000,
            0x0300,
            0x0004,
            0x0003,
            0x0008,
            0x0006,
            0x0005,
            0x0101,
            0x0702,
            0x0500,
            0x0019,
            0x0201,
            0x0401,
            0x0400,
            0x0406,
            0x0403,
            0x0405,
            0x0402,
            0x0204,
            0x0001,
            0x0B05,
            0x1000
        ]
    }
];
exports.coordinatorEndpoints = coordinatorEndpoints;
//# sourceMappingURL=constants.js.map