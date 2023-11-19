import { Driver } from '../driver';
import * as Models from "../../../models";
export declare class EZSPAdapterBackup {
    private driver;
    private defaultPath;
    private debug;
    constructor(driver: Driver, path: string);
    createBackup(): Promise<Models.Backup>;
}
//# sourceMappingURL=backup.d.ts.map