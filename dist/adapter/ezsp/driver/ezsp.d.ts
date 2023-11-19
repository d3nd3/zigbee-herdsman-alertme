/// <reference types="node" />
/// <reference types="node" />
import * as t from './types';
import { EZSPFrameDesc, ParamsDesc } from './commands';
import { EmberStatus, EmberOutgoingMessageType, EzspPolicyId } from './types/named';
import { EventEmitter } from 'events';
import { EmberApsFrame, EmberNetworkParameters } from './types/struct';
type EZSPFrame = {
    sequence: number;
    frameId: number;
    frameName: string;
    payload: EZSPFrameData;
};
export declare class EZSPFrameData {
    _cls_: string;
    _id_: number;
    _isRequest_: boolean;
    [name: string]: any;
    static createFrame(ezspv: number, frame_id: number, isRequest: boolean, params: ParamsDesc | Buffer): EZSPFrameData;
    static getFrame(name: string): EZSPFrameDesc;
    constructor(key: string, isRequest: boolean, params: ParamsDesc | Buffer);
    serialize(): Buffer;
    get name(): string;
    get id(): number;
}
export declare class EZSPZDORequestFrameData {
    _cls_: string;
    _id_: number;
    _isRequest_: boolean;
    [name: string]: any;
    static getFrame(key: string | number): EZSPFrameDesc;
    constructor(key: string | number, isRequest: boolean, params: ParamsDesc | Buffer);
    serialize(): Buffer;
    get name(): string;
    get id(): number;
}
export declare class EZSPZDOResponseFrameData {
    _cls_: string;
    _id_: number;
    [name: string]: any;
    static getFrame(key: string | number): ParamsDesc;
    constructor(key: string | number, params: ParamsDesc | Buffer);
    serialize(): Buffer;
    get name(): string;
    get id(): number;
}
export declare class Ezsp extends EventEmitter {
    ezspV: number;
    cmdSeq: number;
    private serialDriver;
    private waitress;
    private queue;
    private watchdogTimer;
    private failures;
    constructor();
    connect(path: string, options: Record<string, number | boolean>): Promise<void>;
    private onClose;
    close(force: boolean): Promise<void>;
    private getFrameDesc;
    private onFrameReceived;
    version(): Promise<number>;
    networkInit(): Promise<boolean>;
    leaveNetwork(): Promise<number>;
    setConfigurationValue(configId: number, value: number): Promise<void>;
    getConfigurationValue(configId: number): Promise<number>;
    getMulticastTableEntry(index: number): Promise<t.EmberMulticastTableEntry>;
    setMulticastTableEntry(index: number, entry: t.EmberMulticastTableEntry): Promise<EmberStatus>;
    setInitialSecurityState(entry: t.EmberInitialSecurityState): Promise<EmberStatus>;
    getCurrentSecurityState(): Promise<EZSPFrameData>;
    setValue(valueId: t.EzspValueId, value: number): Promise<EZSPFrameData>;
    getValue(valueId: t.EzspValueId): Promise<Buffer>;
    setPolicy(policyId: EzspPolicyId, value: number): Promise<EZSPFrameData>;
    updateConfig(): Promise<void>;
    updatePolicies(): Promise<void>;
    makeZDOframe(name: string | number, params: ParamsDesc): Buffer;
    private makeFrame;
    execCommand(name: string, params?: ParamsDesc): Promise<EZSPFrameData>;
    formNetwork(params: EmberNetworkParameters): Promise<number>;
    parse_frame_payload(name: string | number, data: Buffer): EZSPZDOResponseFrameData;
    sendUnicast(direct: EmberOutgoingMessageType, nwk: number, apsFrame: EmberApsFrame, seq: number, data: Buffer): Promise<EZSPFrameData>;
    sendMulticast(apsFrame: EmberApsFrame, seq: number, data: Buffer): Promise<EZSPFrameData>;
    setSourceRouting(): Promise<void>;
    sendBroadcast(destination: number, apsFrame: EmberApsFrame, seq: number, data: Buffer): Promise<EZSPFrameData>;
    waitFor(frameId: string | number, sequence: number | null, timeout?: number): {
        start: () => {
            promise: Promise<EZSPFrame>;
            ID: number;
        };
        ID: number;
    };
    private waitressTimeoutFormatter;
    private waitressValidator;
    private watchdogHandler;
    private resetHandler;
}
export {};
//# sourceMappingURL=ezsp.d.ts.map