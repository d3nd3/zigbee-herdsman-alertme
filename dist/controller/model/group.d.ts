import { KeyValue } from '../tstype';
import Entity from './entity';
import * as Zcl from '../../zcl';
import Endpoint from './endpoint';
interface Options {
    manufacturerCode?: number;
    direction?: Zcl.Direction;
    srcEndpoint?: number;
    reservedBits?: number;
    transactionSequenceNumber?: number;
}
declare class Group extends Entity {
    private databaseID;
    readonly groupID: number;
    private readonly _members;
    get members(): Endpoint[];
    readonly meta: KeyValue;
    private static groups;
    private constructor();
    private static fromDatabaseEntry;
    private toDatabaseRecord;
    private static loadFromDatabaseIfNecessary;
    static byGroupID(groupID: number): Group;
    static all(): Group[];
    static create(groupID: number): Group;
    removeFromNetwork(): Promise<void>;
    removeFromDatabase(): void;
    save(writeDatabase?: boolean): void;
    addMember(endpoint: Endpoint): void;
    removeMember(endpoint: Endpoint): void;
    hasMember(endpoint: Endpoint): boolean;
    write(clusterKey: number | string, attributes: KeyValue, options?: Options): Promise<void>;
    read(clusterKey: number | string, attributes: string[] | number[], options?: Options): Promise<void>;
    command(clusterKey: number | string, commandKey: number | string, payload: KeyValue, options?: Options): Promise<void>;
    private getOptionsWithDefaults;
}
export default Group;
//# sourceMappingURL=group.d.ts.map