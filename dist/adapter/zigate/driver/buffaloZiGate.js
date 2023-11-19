"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
/* eslint-disable */
const buffalo_1 = require("../../../buffalo");
const utils_1 = require("../../../utils");
const constants_1 = require("./constants");
class BuffaloZiGate extends buffalo_1.Buffalo {
    write(type, value, options) {
        if (type === 'RAW') {
            this.buffer.set(value, this.position);
            this.position++;
        }
        else if (type === 'UINT16BE') {
            this.writeUInt16BE(value);
        }
        else if (type === 'UINT32BE') {
            this.writeUInt32BE(value);
        }
        else if (type === 'IEEADDR') {
            this.readIeeeAddr();
        }
        else if (type === 'ADDRESS_WITH_TYPE_DEPENDENCY') {
            const addressMode = this.buffer.readUInt8(this.position - 1);
            if (addressMode == 3) {
                this.writeIeeeAddr(value);
            }
            else {
                this.writeUInt16BE(value);
            }
        }
        else if (type === 'BUFFER' && (Buffer.isBuffer(value) || (0, utils_1.IsNumberArray)(value))) {
            this.writeBuffer(value, value.length);
        }
        else {
            super.write(type, value, options);
        }
    }
    static addressBufferToStringBE(buffer) {
        let address = '0x';
        for (let i = 0; i < buffer.length; i++) {
            const value = buffer.readUInt8(i);
            if (value <= 15) {
                address += '0' + value.toString(16);
            }
            else {
                address += value.toString(16);
            }
        }
        return address;
    }
    read(type, options) {
        if (type === 'MACCAPABILITY') {
            const result = {};
            const mac = this.readUInt8();
            //
            result.alternatePanCoordinator = !!(mac & 0b00000001);
            // bit 0: Alternative PAN Coordinator, always 0
            result.fullFunctionDevice = !!(mac & 0b00000010);
            // bit 1: Device Type, 1 = FFD , 0 = RFD ; cf. https://fr.wikipedia.org/wiki/IEEE_802.15.4
            result.mainsPowerSource = !!(mac & 0b00000100);
            // bit 2: Power Source, 1 = mains power, 0 = other
            result.receiverOnWhenIdle = !!(mac & 0b00001000);
            // bit 3: Receiver on when Idle, 1 = non-sleepy, 0 = sleepy
            result.reserved = (mac & 0b00110000) >> 4;
            // bit 4&5: Reserved
            result.securityCapability = !!(mac & 0b01000000);
            // bit 6: Security capacity, always 0 (standard security)
            result.allocateAddress = !!(mac & 0b10000000);
            // bit 7: 1 = joining device must be issued network address
            return result;
        }
        else if (type === 'UINT16BE') {
            return this.readUInt16BE();
        }
        else if (type === 'UINT32BE') {
            return this.readUInt32BE();
        }
        else if (type === 'IEEADDR') {
            return this.readIeeeAddr();
        }
        else if (type === 'ADDRESS_WITH_TYPE_DEPENDENCY') {
            // 		rep.addressSourceMode = Enum.ADDRESS_MODE(reader.nextUInt8());
            // 		rep.addressSource = rep.addressSourceMode.name === 'short' ?
            // 		reader.nextUInt16BE() : reader.nextBuffer(8).toString('hex');
            //
            const addressMode = this.buffer.readUInt8(this.position - 1);
            return addressMode == 3 ? this.readIeeeAddr() : this.readUInt16BE();
        }
        else if (type === 'BUFFER_RAW') {
            const buffer = this.buffer.slice(this.position);
            this.position += buffer.length;
            return buffer;
        }
        else if (type === 'LOG_LEVEL') {
            return constants_1.LOG_LEVEL[this.readUInt8()];
        }
        else if (type === 'STRING') {
            const buffer = this.buffer.slice(this.position);
            this.position += buffer.length;
            return unescape(buffer.toString());
        }
        else if (type === 'MAYBE_UINT8') {
            if (this.isMore())
                return this.readUInt8();
        }
        else {
            return super.read(type, options);
        }
    }
    writeIeeeAddr(value) {
        this.writeUInt32BE(parseInt(value.slice(2, 10), 16));
        this.writeUInt32BE(parseInt(value.slice(10), 16));
    }
    readIeeeAddr() {
        const length = 8;
        const value = this.readBuffer(length);
        return BuffaloZiGate.addressBufferToStringBE(value);
    }
    readUInt16BE() {
        const value = this.buffer.readUInt16BE(this.position);
        this.position += 2;
        return value;
    }
    readUInt32BE() {
        const value = this.buffer.readUInt32BE(this.position);
        this.position += 4;
        return value;
    }
    writeUInt16BE(value) {
        this.buffer.writeUInt16BE(value, this.position);
        this.position += 2;
    }
    writeUInt32BE(value) {
        this.buffer.writeUInt32BE(value, this.position);
        this.position += 4;
    }
}
exports.default = BuffaloZiGate;
//# sourceMappingURL=buffaloZiGate.js.map