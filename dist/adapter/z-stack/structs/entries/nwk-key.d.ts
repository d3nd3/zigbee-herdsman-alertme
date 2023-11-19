/// <reference types="node" />
import { Struct } from "../struct";
/**
 * Creates a network key struct.
 *
 * @param data Data to initialize structure with.
 */
export declare const nwkKey: (data?: Buffer) => import("../struct").BuiltStruct<Struct & Record<"key", Buffer>>;
//# sourceMappingURL=nwk-key.d.ts.map