/// <reference types="node" />
import * as TsType from '../../tstype';
import * as Events from '../../events';
import Adapter from '../../adapter';
import { Direction, FrameType, ZclFrame } from '../../../zcl';
import { LoggerStub } from "../../../controller/logger-stub";
import * as Models from "../../../models";
declare class ZiGateAdapter extends Adapter {
    private driver;
    private joinPermitted;
    private waitress;
    private closing;
    private queue;
    constructor(networkOptions: TsType.NetworkOptions, serialPortOptions: TsType.SerialPortOptions, backupPath: string, adapterOptions: TsType.AdapterOptions, logger?: LoggerStub);
    /**
     * Adapter methods
     */
    start(): Promise<TsType.StartResult>;
    stop(): Promise<void>;
    getCoordinator(): Promise<TsType.Coordinator>;
    getCoordinatorVersion(): Promise<TsType.CoordinatorVersion>;
    permitJoin(seconds: number, networkAddress: number): Promise<void>;
    addInstallCode(ieeeAddress: string, key: Buffer): Promise<void>;
    reset(type: 'soft' | 'hard'): Promise<void>;
    getNetworkParameters(): Promise<TsType.NetworkParameters>;
    /**
     * https://zigate.fr/documentation/deplacer-le-pdm-de-la-zigate/
     * pdm from host
     */
    supportsBackup(): Promise<boolean>;
    backup(): Promise<Models.Backup>;
    setTransmitPower(value: number): Promise<void>;
    lqi(networkAddress: number): Promise<TsType.LQI>;
    routingTable(networkAddress: number): Promise<TsType.RoutingTable>;
    nodeDescriptor(networkAddress: number): Promise<TsType.NodeDescriptor>;
    activeEndpoints(networkAddress: number): Promise<TsType.ActiveEndpoints>;
    simpleDescriptor(networkAddress: number, endpointID: number): Promise<TsType.SimpleDescriptor>;
    bind(destinationNetworkAddress: number, sourceIeeeAddress: string, sourceEndpoint: number, clusterID: number, destinationAddressOrGroup: string | number, type: 'endpoint' | 'group', destinationEndpoint?: number): Promise<void>;
    unbind(destinationNetworkAddress: number, sourceIeeeAddress: string, sourceEndpoint: number, clusterID: number, destinationAddressOrGroup: string | number, type: 'endpoint' | 'group', destinationEndpoint: number): Promise<void>;
    removeDevice(networkAddress: number, ieeeAddr: string): Promise<void>;
    sendZclFrameToEndpoint(ieeeAddr: string, networkAddress: number, endpoint: number, zclFrame: ZclFrame, timeout: number, disableResponse: boolean, disableRecovery: boolean, sourceEndpoint?: number): Promise<Events.ZclDataPayload>;
    private sendZclFrameToEndpointInternal;
    sendZclFrameToAll(endpoint: number, zclFrame: ZclFrame, sourceEndpoint: number): Promise<void>;
    sendZclFrameToGroup(groupID: number, zclFrame: ZclFrame, sourceEndpoint?: number): Promise<void>;
    /**
     * Supplementary functions
     */
    private initNetwork;
    waitFor(networkAddress: number, endpoint: number, frameType: FrameType, direction: Direction, transactionSequenceNumber: number, clusterID: number, commandIdentifier: number, timeout: number): {
        promise: Promise<Events.ZclDataPayload>;
        cancel: () => void;
    };
    static isValidPath(path: string): Promise<boolean>;
    static autoDetectPath(): Promise<string>;
    /**
     * InterPAN !!! not implemented
     */
    setChannelInterPAN(channel: number): Promise<void>;
    sendZclFrameInterPANToIeeeAddr(zclFrame: ZclFrame, ieeeAddress: string): Promise<void>;
    sendZclFrameInterPANBroadcast(zclFrame: ZclFrame, timeout: number): Promise<Events.ZclDataPayload>;
    restoreChannelInterPAN(): Promise<void>;
    private deviceAnnounceListener;
    private zclDataListener;
    private rawDataListener;
    private leaveIndicationListener;
    private waitressTimeoutFormatter;
    private waitressValidator;
    private onZiGateClose;
}
export default ZiGateAdapter;
//# sourceMappingURL=zigateAdapter.d.ts.map