import crc16ccitt from './crc16ccitt';
import { EmberInitialSecurityState } from '../types/struct';
export declare class Deferred<T> {
    promise: Promise<T>;
    _resolve: Function;
    _reject: Function;
    _isResolved: boolean;
    _isRejected: boolean;
    constructor();
    resolve(value: T): void;
    reject(value: T): void;
    get isResolved(): boolean;
    get isRejected(): boolean;
    get isFullfilled(): boolean;
}
declare function ember_security(config: Record<string, any>): EmberInitialSecurityState;
declare function channelsMask2list(channelMask: number): number[];
export { crc16ccitt, ember_security, channelsMask2list };
//# sourceMappingURL=index.d.ts.map