/// <reference types="node" />
import { Struct } from "../struct";
/**
 * Creates a Security Service Provider (SSP) Network Descriptor struct.
 *
 * *Definition from Z-Stack 3.0.2 `ssp.h`*
 *
 * @param data Data to initialize structure with.
 */
export declare const nwkKeyDescriptor: (data?: Buffer) => import("../struct").BuiltStruct<Struct & Record<"keySeqNum", number> & Record<"key", Buffer>>;
//# sourceMappingURL=nwk-key-descriptor.d.ts.map