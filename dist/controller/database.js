"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const debug_1 = __importDefault(require("debug"));
const debug = {
    log: (0, debug_1.default)('zigbee-herdsman:controller:database:log'),
};
class Database {
    constructor(entries, path) {
        this.entries = entries;
        this.path = path;
    }
    static open(path) {
        const entries = {};
        if (fs_1.default.existsSync(path)) {
            const rows = fs_1.default.readFileSync(path, 'utf-8').split('\n').map((r) => r.trim()).filter((r) => r != '');
            for (const row of rows) {
                const json = JSON.parse(row);
                if (json.hasOwnProperty('id')) {
                    entries[json.id] = json;
                }
            }
        }
        return new Database(entries, path);
    }
    getEntries(type) {
        return Object.values(this.entries).filter(e => type.includes(e.type));
    }
    insert(DatabaseEntry) {
        if (this.entries[DatabaseEntry.id]) {
            throw new Error(`DatabaseEntry with ID '${DatabaseEntry.id}' already exists`);
        }
        this.entries[DatabaseEntry.id] = DatabaseEntry;
        this.write();
    }
    update(DatabaseEntry, write) {
        if (!this.entries[DatabaseEntry.id]) {
            throw new Error(`DatabaseEntry with ID '${DatabaseEntry.id}' does not exist`);
        }
        this.entries[DatabaseEntry.id] = DatabaseEntry;
        if (write) {
            this.write();
        }
    }
    remove(ID) {
        if (!this.entries[ID]) {
            throw new Error(`DatabaseEntry with ID '${ID}' does not exist`);
        }
        delete this.entries[ID];
        this.write();
    }
    has(ID) {
        return this.entries.hasOwnProperty(ID);
    }
    newID() {
        for (let i = 1; i < 100000; i++) {
            if (!this.entries[i]) {
                return i;
            }
        }
    }
    write() {
        debug.log(`Writing database to '${this.path}'`);
        const lines = [];
        for (const DatabaseEntry of Object.values(this.entries)) {
            const json = JSON.stringify(DatabaseEntry);
            lines.push(json);
        }
        const tmpPath = this.path + '.tmp';
        fs_1.default.writeFileSync(tmpPath, lines.join('\n'));
        // Ensure file is on disk https://github.com/Koenkk/zigbee2mqtt/issues/11759
        const fd = fs_1.default.openSync(tmpPath, 'r+');
        fs_1.default.fsyncSync(fd);
        fs_1.default.closeSync(fd);
        fs_1.default.renameSync(tmpPath, this.path);
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map