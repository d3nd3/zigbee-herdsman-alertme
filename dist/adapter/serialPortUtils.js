"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serialPort_1 = require("./serialPort");
const utils_1 = require("../utils");
async function find(matchers) {
    let devices = await serialPort_1.SerialPort.list();
    devices = devices.filter((device) => matchers.find((matcher) => (0, utils_1.EqualsPartial)(device, matcher)) != null);
    return devices.map((device) => device.path);
}
async function is(path, matchers) {
    const devices = await serialPort_1.SerialPort.list();
    const device = devices.find((device) => device.path === path);
    if (!device) {
        return false;
    }
    return matchers.find((matcher) => (0, utils_1.EqualsPartial)(device, matcher)) != null;
}
exports.default = { is, find };
//# sourceMappingURL=serialPortUtils.js.map