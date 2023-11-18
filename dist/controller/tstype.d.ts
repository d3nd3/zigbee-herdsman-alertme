interface KeyValue {
    [s: string]: any;
}
type SendPolicy = 'bulk' | 'queue' | 'immediate' | 'keep-payload' | 'keep-command' | 'keep-cmd-undiv';
type SendRequestWhen = 'immediate' | 'fastpoll' | 'active';
type DeviceType = 'Coordinator' | 'Router' | 'EndDevice' | 'Unknown' | 'GreenPower';
type EntityType = DeviceType | 'Group';
interface DatabaseEntry {
    id: number;
    type: EntityType;
    [s: string]: any;
}
declare enum GreenPowerEvents {
    deviceJoined = "deviceJoined"
}
interface GreenPowerDeviceJoinedPayload {
    sourceID: number;
    deviceID: number;
    networkAddress: number;
}
export { KeyValue, DatabaseEntry, EntityType, DeviceType, GreenPowerEvents, GreenPowerDeviceJoinedPayload, SendRequestWhen, SendPolicy };
//# sourceMappingURL=tstype.d.ts.map