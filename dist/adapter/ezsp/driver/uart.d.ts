/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'events';
type EZSPPacket = {
    sequence: number;
};
export declare class SerialDriver extends EventEmitter {
    private serialPort;
    private socketPort;
    private writer;
    private parser;
    private initialized;
    private portType;
    private sendSeq;
    private recvSeq;
    private ackSeq;
    private waitress;
    private queue;
    constructor();
    connect(path: string, options: Record<string, number | boolean>): Promise<void>;
    private openSerialPort;
    private openSocketPort;
    private onParsed;
    private handleDATA;
    private handleACK;
    private handleNAK;
    private rstack_frame_received;
    private randomize;
    reset(): Promise<void>;
    close(): Promise<void>;
    private onPortClose;
    isInitialized(): boolean;
    sendDATA(data: Buffer): Promise<void>;
    waitFor(sequence: number, timeout?: number): {
        start: () => {
            promise: Promise<EZSPPacket>;
            ID: number;
        };
        ID: number;
    };
    private waitressTimeoutFormatter;
    private waitressValidator;
}
export {};
//# sourceMappingURL=uart.d.ts.map