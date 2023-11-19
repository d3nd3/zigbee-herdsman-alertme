interface Request {
    commandId?: number;
    networkState?: number;
    parameterId?: number;
    parameter?: parameterT;
    request?: ApsDataRequest;
    seqNumber?: number;
    resolve?: Function;
    reject?: Function;
    ts?: number;
}
interface WaitForDataRequest {
    addr?: number;
    profileId?: number;
    clusterId?: number;
    transactionSequenceNumber?: number;
    resolve?: Function;
    reject?: Function;
    ts?: number;
    timeout?: number;
}
interface ReceivedDataResponse {
    commandId?: number;
    seqNr?: number;
    status?: number;
    frameLength?: number;
    payloadLength?: number;
    deviceState?: number;
    destAddrMode?: number;
    destAddr16?: number;
    destAddr64?: string;
    destEndpoint?: number;
    srcAddrMode?: number;
    srcAddr16?: number;
    srcAddr64?: string;
    srcEndpoint?: number;
    profileId?: number;
    clusterId?: number;
    asduLength?: number;
    asduPayload?: number[];
    lqi?: number;
    rssi?: number;
}
interface gpDataInd {
    rspId?: number;
    seqNr?: number;
    id?: number;
    clusterId?: number;
    options?: number;
    srcId?: number;
    frameCounter?: number;
    commandId?: number;
    commandFrameSize?: number;
    commandFrame?: number[];
}
interface DataStateResponse {
    commandId?: number;
    seqNr?: number;
    status?: number;
    frameLength?: number;
    payloadLength?: number;
    deviceState?: number;
    requestId?: number;
    destAddrMode?: number;
    destAddr16?: number;
    destAddr64?: string;
    destEndpoint?: number;
    srcEndpoint?: number;
    confirmStatus?: number;
}
interface ApsDataRequest {
    requestId?: number;
    destAddrMode?: number;
    destAddr16?: number;
    destAddr64?: string;
    destEndpoint?: number;
    profileId?: number;
    clusterId?: number;
    srcEndpoint?: number;
    asduLength?: number;
    asduPayload?: number[];
    txOptions?: number;
    radius?: number;
    timeout?: number;
}
type ParamMac = string;
type ParamPanId = number;
type ParamExtPanId = string;
type ParamNwkAddr = number;
type ParamChannel = number;
type ParamChannelMask = number;
type ParamPermitJoin = number;
type ParamNetworkKey = string;
type Command = ParamMac | ParamPanId | ParamNwkAddr | ParamExtPanId | ParamChannel | ParamChannelMask | ParamPermitJoin | ParamNetworkKey;
type parameterT = number | number[];
export { Request, WaitForDataRequest, ApsDataRequest, ReceivedDataResponse, DataStateResponse, parameterT, Command, ParamMac, ParamPanId, ParamNwkAddr, ParamExtPanId, ParamChannel, ParamChannelMask, ParamPermitJoin, ParamNetworkKey, gpDataInd };
declare const _default: {
    PARAM: {
        [s: string]: {
            [s: string]: number;
        };
    };
};
export default _default;
//# sourceMappingURL=constants.d.ts.map