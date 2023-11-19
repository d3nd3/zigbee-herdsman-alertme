/// <reference types="node" />
import { Adapter, Events as AdapterEvents } from '../adapter';
import events from 'events';
declare class GreenPower extends events.EventEmitter {
    private adapter;
    constructor(adapter: Adapter);
    private encryptSecurityKey;
    private sendPairingCommand;
    onZclGreenPowerData(dataPayload: AdapterEvents.ZclDataPayload): Promise<void>;
    permitJoin(time: number, networkAddress: number): Promise<void>;
}
export default GreenPower;
//# sourceMappingURL=greenPower.d.ts.map