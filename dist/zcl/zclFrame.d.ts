/// <reference types="node" />
import { Direction } from './definition';
import ZclHeader from './zclHeader';
import * as TsType from './tstype';
import { FrameType } from './definition';
type ZclPayload = any;
declare class ZclFrame {
    readonly Header: ZclHeader;
    readonly Payload: ZclPayload;
    readonly Cluster: TsType.Cluster;
    private readonly Command;
    private constructor();
    /**
     * Creating
     */
    static create(frameType: FrameType, direction: Direction, disableDefaultResponse: boolean, manufacturerCode: number, transactionSequenceNumber: number, commandKey: number | string, clusterKey: number | string, payload: ZclPayload, reservedBits?: number): ZclFrame;
    toBuffer(): Buffer;
    private writeHeader;
    private writePayloadGlobal;
    private writePayloadCluster;
    /**
     * Parsing
     */
    static fromBuffer(clusterID: number, buffer: Buffer): ZclFrame;
    private static parseHeader;
    private static parsePayload;
    private static parsePayloadCluster;
    private static parsePayloadGlobal;
    /**
     * Utils
     */
    private static getDataTypeString;
    private static conditionsValid;
    isSpecific(): boolean;
    isGlobal(): boolean;
    isCluster(clusterName: 'genTime' | 'genAnalogInput' | 'genBasic' | 'genGroups' | 'genPollCtrl' | 'ssIasZone'): boolean;
    isCommand(commandName: 'read' | 'report' | 'readRsp' | 'remove' | 'add' | 'write' | 'enrollReq' | 'configReport' | 'checkin' | 'writeRsp'): boolean;
    getCommand(): TsType.Command;
}
export default ZclFrame;
//# sourceMappingURL=zclFrame.d.ts.map