/// <reference types="node" />
import { Table } from "../table";
import { StructMemoryAlignment } from "../struct";
/**
 * Creates an APS trust center link key data table.
 *
 * @param data Data to initialize table with.
 * @param alignment Memory alignment of initialization data.
 */
export declare const apsTcLinkKeyTable: (dataOrCapacity?: Buffer | Buffer[] | number, alignment?: StructMemoryAlignment) => import("../table").BuiltTable<import("../struct").BuiltStruct<import("../struct").Struct & Record<"txFrmCntr", number> & Record<"rxFrmCntr", number> & Record<"extAddr", Buffer> & Record<"keyAttributes", number> & Record<"keyType", number> & Record<"SeedShift_IcIndex", number>>, Table<import("../struct").BuiltStruct<import("../struct").Struct & Record<"txFrmCntr", number> & Record<"rxFrmCntr", number> & Record<"extAddr", Buffer> & Record<"keyAttributes", number> & Record<"keyType", number> & Record<"SeedShift_IcIndex", number>>>>;
//# sourceMappingURL=aps-tc-link-key-table.d.ts.map