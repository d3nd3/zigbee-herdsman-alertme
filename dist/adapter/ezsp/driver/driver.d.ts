/// <reference types="node" />
/// <reference types="node" />
import * as TsType from './../../tstype';
import { Ezsp, EZSPFrameData, EZSPZDOResponseFrameData } from './ezsp';
import { EmberZDOCmd, EmberKeyData } from './types';
import { EventEmitter } from "events";
import { EmberApsFrame, EmberNetworkParameters, EmberRawFrame, EmberIeeeRawFrame } from './types/struct';
import { EmberEUI64 } from './types/named';
import { ParamsDesc } from './commands';
interface AddEndpointParameters {
    endpoint?: number;
    profileId?: number;
    deviceId?: number;
    appFlags?: number;
    inputClusters?: number[];
    outputClusters?: number[];
}
type EmberFrame = {
    address: number;
    payload: Buffer;
    frame: EmberApsFrame;
};
export interface EmberIncomingMessage {
    messageType: number;
    apsFrame: EmberApsFrame;
    lqi: number;
    rssi: number;
    sender: number;
    bindingIndex: number;
    addressIndex: number;
    message: Buffer;
    senderEui64: EmberEUI64;
}
export declare class Driver extends EventEmitter {
    private direct;
    ezsp: Ezsp;
    private nwkOpt;
    private greenPowerGroup;
    networkParams: EmberNetworkParameters;
    version: {
        product: number;
        majorrel: string;
        minorrel: string;
        maintrel: string;
        revision: string;
    };
    private eui64ToNodeId;
    private eui64ToRelays;
    ieee: EmberEUI64;
    private multicast;
    private waitress;
    private transactionID;
    private port;
    private serialOpt;
    constructor();
    private onReset;
    startup(port: string, serialOpt: Record<string, any>, nwkOpt: TsType.NetworkOptions, greenPowerGroup: number): Promise<TsType.StartResult>;
    private needsToBeInitialised;
    private form_network;
    private handleFrame;
    private cleanupTClinkKey;
    private handleRouteRecord;
    private handleRouteError;
    private handleNodeLeft;
    private resetMfgId;
    handleNodeJoined(nwk: number, ieee: EmberEUI64 | number[]): void;
    setNode(nwk: number, ieee: EmberEUI64 | number[]): void;
    request(nwk: number | EmberEUI64, apsFrame: EmberApsFrame, data: Buffer, timeout?: number): Promise<boolean>;
    mrequest(apsFrame: EmberApsFrame, data: Buffer, timeout?: number): Promise<boolean>;
    rawrequest(rawFrame: EmberRawFrame, data: Buffer, timeout?: number): Promise<boolean>;
    ieeerawrequest(rawFrame: EmberIeeeRawFrame, data: Buffer, timeout?: number): Promise<boolean>;
    brequest(destination: number, apsFrame: EmberApsFrame, data: Buffer): Promise<boolean>;
    private nextTransactionID;
    makeApsFrame(clusterId: number, disableResponse: boolean): EmberApsFrame;
    makeEmberRawFrame(): EmberRawFrame;
    makeEmberIeeeRawFrame(): EmberIeeeRawFrame;
    zdoRequest(networkAddress: number, requestCmd: EmberZDOCmd, responseCmd: EmberZDOCmd, params: ParamsDesc): Promise<EZSPZDOResponseFrameData>;
    private onClose;
    stop(): Promise<void>;
    networkIdToEUI64(nwk: number): Promise<EmberEUI64>;
    preJoining(): Promise<void>;
    permitJoining(seconds: number): Promise<EZSPFrameData>;
    makeZDOframe(name: string | number, params: ParamsDesc): Buffer;
    parse_frame_payload(name: string | number, obj: Buffer): EZSPZDOResponseFrameData;
    addEndpoint({ endpoint, profileId, deviceId, appFlags, inputClusters, outputClusters }: AddEndpointParameters): Promise<void>;
    waitFor(address: number, clusterId: number, sequence: number, timeout?: number): {
        start: () => {
            promise: Promise<EmberFrame>;
            ID: number;
        };
        ID: number;
    };
    private waitressTimeoutFormatter;
    private waitressValidator;
    setRadioPower(value: number): Promise<EZSPFrameData>;
    setChannel(channel: number): Promise<EZSPFrameData>;
    addTransientLinkKey(partner: EmberEUI64, transientKey: EmberKeyData): Promise<EZSPFrameData>;
    addInstallCode(ieeeAddress: string, key: Buffer): Promise<void>;
    private handleGPMessage;
}
export {};
//# sourceMappingURL=driver.d.ts.map