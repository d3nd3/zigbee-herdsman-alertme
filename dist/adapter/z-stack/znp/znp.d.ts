/// <reference types="node" />
import * as Constants from '../constants';
import ZpiObject from './zpiObject';
import { ZpiObjectPayload } from './tstype';
import { Subsystem, Type } from '../unpi/constants';
import events from 'events';
declare class Znp extends events.EventEmitter {
    private path;
    private baudRate;
    private rtscts;
    private portType;
    private serialPort;
    private socketPort;
    private unpiWriter;
    private unpiParser;
    private initialized;
    private queue;
    private waitress;
    constructor(path: string, baudRate: number, rtscts: boolean);
    private log;
    private onUnpiParsed;
    isInitialized(): boolean;
    private onPortClose;
    open(): Promise<void>;
    private openSerialPort;
    private openSocketPort;
    private skipBootloader;
    private setSerialPortOptions;
    static isValidPath(path: string): Promise<boolean>;
    static autoDetectPath(): Promise<string>;
    close(): Promise<void>;
    request(subsystem: Subsystem, command: string, payload: ZpiObjectPayload, waiterID?: number, timeout?: number, expectedStatuses?: Constants.COMMON.ZnpCommandStatus[]): Promise<ZpiObject>;
    private waitressTimeoutFormatter;
    waitFor(type: Type, subsystem: Subsystem, command: string, payload?: ZpiObjectPayload, timeout?: number): {
        start: () => {
            promise: Promise<ZpiObject>;
            ID: number;
        };
        ID: number;
    };
    private waitressValidator;
}
export default Znp;
//# sourceMappingURL=znp.d.ts.map