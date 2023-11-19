/// <reference types="node" />
import { NetworkOptions, SerialPortOptions, Coordinator, CoordinatorVersion, NodeDescriptor, ActiveEndpoints, SimpleDescriptor, LQI, RoutingTable, NetworkParameters, StartResult, AdapterOptions } from '../../tstype';
import Adapter from '../../adapter';
import { ZclFrame, FrameType, Direction } from '../../../zcl';
import * as Events from '../../events';
import * as Models from "../../../models";
declare class EZSPAdapter extends Adapter {
    private driver;
    private port;
    private waitress;
    private interpanLock;
    private backupMan;
    private queue;
    constructor(networkOptions: NetworkOptions, serialPortOptions: SerialPortOptions, backupPath: string, adapterOptions: AdapterOptions);
    private processMessage;
    private handleDeviceJoin;
    private handleDeviceLeft;
    /**
     * Adapter methods
     */
    start(): Promise<StartResult>;
    stop(): Promise<void>;
    static isValidPath(path: string): Promise<boolean>;
    static autoDetectPath(): Promise<string>;
    getCoordinator(): Promise<Coordinator>;
    permitJoin(seconds: number, networkAddress: number): Promise<void>;
    getCoordinatorVersion(): Promise<CoordinatorVersion>;
    addInstallCode(ieeeAddress: string, key: Buffer): Promise<void>;
    reset(type: 'soft' | 'hard'): Promise<void>;
    lqi(networkAddress: number): Promise<LQI>;
    routingTable(networkAddress: number): Promise<RoutingTable>;
    nodeDescriptor(networkAddress: number): Promise<NodeDescriptor>;
    private nodeDescriptorInternal;
    activeEndpoints(networkAddress: number): Promise<ActiveEndpoints>;
    simpleDescriptor(networkAddress: number, endpointID: number): Promise<SimpleDescriptor>;
    sendZclFrameToEndpoint(ieeeAddr: string, networkAddress: number, endpoint: number, zclFrame: ZclFrame, timeout: number, disableResponse: boolean, disableRecovery: boolean, sourceEndpoint?: number): Promise<Events.ZclDataPayload>;
    private sendZclFrameToEndpointInternal;
    sendZclFrameToGroup(groupID: number, zclFrame: ZclFrame): Promise<void>;
    sendZclFrameToAll(endpoint: number, zclFrame: ZclFrame, sourceEndpoint: number): Promise<void>;
    bind(destinationNetworkAddress: number, sourceIeeeAddress: string, sourceEndpoint: number, clusterID: number, destinationAddressOrGroup: string | number, type: 'endpoint' | 'group', destinationEndpoint?: number): Promise<void>;
    unbind(destinationNetworkAddress: number, sourceIeeeAddress: string, sourceEndpoint: number, clusterID: number, destinationAddressOrGroup: string | number, type: 'endpoint' | 'group', destinationEndpoint: number): Promise<void>;
    removeDevice(networkAddress: number, ieeeAddr: string): Promise<void>;
    getNetworkParameters(): Promise<NetworkParameters>;
    supportsBackup(): Promise<boolean>;
    backup(): Promise<Models.Backup>;
    restoreChannelInterPAN(): Promise<void>;
    private checkInterpanLock;
    sendZclFrameInterPANToIeeeAddr(zclFrame: ZclFrame, ieeeAddr: string): Promise<void>;
    sendZclFrameInterPANBroadcast(zclFrame: ZclFrame, timeout: number): Promise<Events.ZclDataPayload>;
    setTransmitPower(value: number): Promise<void>;
    setChannelInterPAN(channel: number): Promise<void>;
    private waitForInternal;
    waitFor(networkAddress: number, endpoint: number, frameType: FrameType, direction: Direction, transactionSequenceNumber: number, clusterID: number, commandIdentifier: number, timeout: number): {
        promise: Promise<Events.ZclDataPayload>;
        cancel: () => void;
    };
    private waitressTimeoutFormatter;
    private waitressValidator;
}
export default EZSPAdapter;
//# sourceMappingURL=ezspAdapter.d.ts.map