/// <reference types="node" />
import { Table } from "../table";
import { StructMemoryAlignment } from "../struct";
/**
 * Creates a network security material table.
 *
 * @param data Data to initialize table with.
 * @param alignment Memory alignment of initialization data.
 */
export declare const nwkSecMaterialDescriptorTable: (dataOrCapacity?: Buffer | Buffer[] | number, alignment?: StructMemoryAlignment) => import("../table").BuiltTable<import("../struct").BuiltStruct<import("../struct").Struct & Record<"FrameCounter", number> & Record<"extendedPanID", Buffer> & Record<"isSet", () => Boolean>>, Table<import("../struct").BuiltStruct<import("../struct").Struct & Record<"FrameCounter", number> & Record<"extendedPanID", Buffer> & Record<"isSet", () => Boolean>>>>;
//# sourceMappingURL=nwk-sec-material-descriptor-table.d.ts.map