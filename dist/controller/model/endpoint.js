"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __importDefault(require("./entity"));
const Zcl = __importStar(require("../../zcl"));
const zclTransactionSequenceNumber_1 = __importDefault(require("../helpers/zclTransactionSequenceNumber"));
const ZclFrameConverter = __importStar(require("../helpers/zclFrameConverter"));
const request_1 = __importDefault(require("../helpers/request"));
const group_1 = __importDefault(require("./group"));
const device_1 = __importDefault(require("./device"));
const debug_1 = __importDefault(require("debug"));
const assert_1 = __importDefault(require("assert"));
const debug = {
    info: (0, debug_1.default)('zigbee-herdsman:controller:endpoint'),
    error: (0, debug_1.default)('zigbee-herdsman:controller:endpoint'),
};
class Endpoint extends entity_1.default {
    // Getters/setters
    get binds() {
        return this._binds.map((entry) => {
            let target = null;
            if (entry.type === 'endpoint') {
                const device = device_1.default.byIeeeAddr(entry.deviceIeeeAddress);
                if (device) {
                    target = device.getEndpoint(entry.endpointID);
                }
            }
            else {
                target = group_1.default.byGroupID(entry.groupID);
            }
            if (target) {
                return { target, cluster: Zcl.Utils.getCluster(entry.cluster, this.getDevice().manufacturerID) };
            }
            else {
                return undefined;
            }
        }).filter(b => b !== undefined);
    }
    get configuredReportings() {
        return this._configuredReportings.map((entry) => {
            const cluster = Zcl.Utils.getCluster(entry.cluster, entry.manufacturerCode);
            let attribute;
            if (cluster.hasAttribute(entry.attrId)) {
                attribute = cluster.getAttribute(entry.attrId);
            }
            else {
                attribute = {
                    ID: entry.attrId,
                    name: undefined,
                    type: undefined,
                    manufacturerCode: undefined
                };
            }
            return {
                cluster, attribute,
                minimumReportInterval: entry.minRepIntval,
                maximumReportInterval: entry.maxRepIntval,
                reportableChange: entry.repChange,
            };
        });
    }
    constructor(ID, profileID, deviceID, inputClusters, outputClusters, deviceNetworkAddress, deviceIeeeAddress, clusters, binds, configuredReportings, meta) {
        super();
        this.ID = ID;
        this.profileID = profileID;
        this.deviceID = deviceID;
        this.inputClusters = inputClusters;
        this.outputClusters = outputClusters;
        this.deviceNetworkAddress = deviceNetworkAddress;
        this.deviceIeeeAddress = deviceIeeeAddress;
        this.clusters = clusters;
        this._binds = binds;
        this._configuredReportings = configuredReportings;
        this.meta = meta;
        this.pendingRequests = new Set;
        this.sendInProgress = false;
    }
    /**
     * Get device of this endpoint
     */
    getDevice() {
        return device_1.default.byIeeeAddr(this.deviceIeeeAddress);
    }
    /**
     * @param {number|string} clusterKey
     * @returns {boolean}
     */
    supportsInputCluster(clusterKey) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        return this.inputClusters.includes(cluster.ID);
    }
    /**
     * @param {number|string} clusterKey
     * @returns {boolean}
     */
    supportsOutputCluster(clusterKey) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        return this.outputClusters.includes(cluster.ID);
    }
    /**
     * @returns {Zcl.TsType.Cluster[]}
     */
    getInputClusters() {
        return this.clusterNumbersToClusters(this.inputClusters);
    }
    /**
     * @returns {Zcl.TsType.Cluster[]}
     */
    getOutputClusters() {
        return this.clusterNumbersToClusters(this.outputClusters);
    }
    clusterNumbersToClusters(clusterNumbers) {
        return clusterNumbers.map((c) => Zcl.Utils.getCluster(c, this.getDevice().manufacturerID));
    }
    /*
     * CRUD
     */
    static fromDatabaseRecord(record, deviceNetworkAddress, deviceIeeeAddress) {
        // Migrate attrs to attributes
        for (const entry of Object.values(record.clusters).filter((e) => e.hasOwnProperty('attrs'))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            entry.attributes = entry.attrs;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete entry.attrs;
        }
        return new Endpoint(record.epId, record.profId, record.devId, record.inClusterList, record.outClusterList, deviceNetworkAddress, deviceIeeeAddress, record.clusters, record.binds || [], record.configuredReportings || [], record.meta || {});
    }
    toDatabaseRecord() {
        return {
            profId: this.profileID, epId: this.ID, devId: this.deviceID,
            inClusterList: this.inputClusters, outClusterList: this.outputClusters, clusters: this.clusters,
            binds: this._binds, configuredReportings: this._configuredReportings, meta: this.meta,
        };
    }
    static create(ID, profileID, deviceID, inputClusters, outputClusters, deviceNetworkAddress, deviceIeeeAddress) {
        return new Endpoint(ID, profileID, deviceID, inputClusters, outputClusters, deviceNetworkAddress, deviceIeeeAddress, {}, [], [], {});
    }
    saveClusterAttributeKeyValue(clusterKey, list) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        if (!this.clusters[cluster.name])
            this.clusters[cluster.name] = { attributes: {} };
        for (const [attribute, value] of Object.entries(list)) {
            this.clusters[cluster.name].attributes[attribute] = value;
        }
    }
    getClusterAttributeValue(clusterKey, attributeKey) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        const attribute = cluster.getAttribute(attributeKey);
        if (this.clusters[cluster.name] && this.clusters[cluster.name].attributes) {
            return this.clusters[cluster.name].attributes[attribute.name];
        }
        return null;
    }
    hasPendingRequests() {
        return this.pendingRequests.size > 0;
    }
    async sendPendingRequests(fastPolling) {
        if (this.pendingRequests.size === 0)
            return;
        if (this.sendInProgress) {
            debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): sendPendingRequests already in progress`);
            return;
        }
        this.sendInProgress = true;
        // Remove expired requests first
        const now = Date.now();
        for (const request of this.pendingRequests) {
            if (now > request.expires) {
                debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): discard after timeout. ` +
                    `Size before: ${this.pendingRequests.size}`);
                request.reject();
                this.pendingRequests.delete(request);
            }
        }
        debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): send pending requests (` +
            `${this.pendingRequests.size}, ${fastPolling})`);
        for (const request of this.pendingRequests) {
            if (fastPolling || (request.sendWhen !== 'fastpoll' && request.sendPolicy !== 'bulk')) {
                try {
                    const result = await request.send();
                    debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): send success`);
                    request.resolve(result);
                }
                catch (error) {
                    debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): send failed, expires in ` +
                        `${(request.expires - now) / 1000} seconds`);
                    request.reject(error);
                }
                this.pendingRequests.delete(request);
            }
        }
        this.sendInProgress = false;
    }
    async queueRequest(request) {
        debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): Sending when active. ` +
            `Timeout ${this.getDevice().pendingRequestTimeout / 1000} seconds`);
        return new Promise((resolve, reject) => {
            request.addCallbacks(resolve, reject);
            this.pendingRequests.add(request);
        });
    }
    filterRequests(newRequest) {
        var _a, _b;
        if (this.pendingRequests.size === 0 || !(typeof newRequest.frame.getCommand === 'function')) {
            return;
        }
        const clusterID = newRequest.frame.Cluster.ID;
        const payload = newRequest.frame.Payload;
        const commandID = newRequest.frame.getCommand().ID;
        debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): ZCL ${newRequest.frame.getCommand().name} ` +
            `command, filter requests. Before: ${this.pendingRequests.size}`);
        for (const request of this.pendingRequests) {
            if (((_b = (_a = request === null || request === void 0 ? void 0 : request.frame) === null || _a === void 0 ? void 0 : _a.Cluster) === null || _b === void 0 ? void 0 : _b.ID) === undefined || typeof request.frame.getCommand !== 'function') {
                continue;
            }
            if (['bulk', 'queue', 'immediate'].includes(request.sendPolicy)) {
                continue;
            }
            /* istanbul ignore else */
            if (request.frame.Cluster.ID === clusterID && request.frame.getCommand().ID === commandID) {
                /* istanbul ignore else */
                if (newRequest.sendPolicy === 'keep-payload'
                    && JSON.stringify(request.frame.Payload) === JSON.stringify(payload)) {
                    debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): Merge duplicate request`);
                    this.pendingRequests.delete(request);
                    newRequest.moveCallbacks(request);
                }
                else if ((newRequest.sendPolicy === 'keep-command' || newRequest.sendPolicy === 'keep-cmd-undiv') &&
                    Array.isArray(request.frame.Payload)) {
                    const filteredPayload = request.frame.Payload.filter((oldEl) => !payload.find((newEl) => oldEl.attrId === newEl.attrId));
                    if (filteredPayload.length == 0) {
                        debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): Remove & reject request`);
                        if (JSON.stringify(request.frame.Payload) === JSON.stringify(payload)) {
                            newRequest.moveCallbacks(request);
                        }
                        else {
                            request.reject();
                        }
                        this.pendingRequests.delete(request);
                    }
                    else if (newRequest.sendPolicy !== 'keep-cmd-undiv') {
                        // remove all duplicate attributes if we shall not write undivided
                        request.frame.Payload = filteredPayload;
                        debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): `
                            + `Remove commands from request`);
                    }
                }
            }
        }
        debug.info(`Request Queue (${this.deviceIeeeAddress}/${this.ID}): After: ${this.pendingRequests.size}`);
    }
    async sendRequest(frame, options, func = (d) => {
        return entity_1.default.adapter.sendZclFrameToEndpoint(this.deviceIeeeAddress, this.deviceNetworkAddress, this.ID, d, options.timeout, options.disableResponse, options.disableRecovery, options.srcEndpoint);
    }) {
        const logPrefix = `Request Queue (${this.deviceIeeeAddress}/${this.ID}): `;
        const request = new request_1.default(func, frame, this.getDevice().pendingRequestTimeout, options.sendWhen, options.sendPolicy);
        if (request.sendPolicy !== 'bulk') {
            // Check if such a request is already in the queue and remove the old one(s) if necessary
            this.filterRequests(request);
        }
        // send without queueing if sendWhen or sendPolicy is 'immediate' or if the device has no timeout set
        if (request.sendWhen === 'immediate' || request.sendPolicy === 'immediate'
            || !this.getDevice().pendingRequestTimeout) {
            if (this.getDevice().defaultSendRequestWhen !== 'immediate') {
                debug.info(logPrefix + `send ${frame.getCommand().name} request immediately ` +
                    `(sendWhen=${options.sendWhen})`);
            }
            return request.send();
        }
        // If this is a bulk message, we queue directly.
        if (request.sendPolicy === 'bulk') {
            debug.info(logPrefix + `queue request (${this.pendingRequests.size} / ${this.sendInProgress})))`);
            return this.queueRequest(request);
        }
        try {
            debug.info(logPrefix + `send request`);
            return await request.send();
        }
        catch (error) {
            // If we got a failed transaction, the device is likely sleeping.
            // Queue for transmission later.
            debug.info(logPrefix + `queue request (transaction failed)`);
            return this.queueRequest(request);
        }
    }
    /*
     * Zigbee functions
     */
    checkStatus(payload) {
        const codes = Array.isArray(payload) ? payload.map((i) => i.status) : [payload.statusCode];
        const invalid = codes.find((c) => c !== Zcl.Status.SUCCESS);
        if (invalid)
            throw new Zcl.ZclStatusError(invalid);
    }
    async report(clusterKey, attributes, options) {
        var _a;
        const cluster = Zcl.Utils.getCluster(clusterKey);
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.CLIENT_TO_SERVER, cluster.manufacturerCode);
        const payload = [];
        for (const [nameOrID, value] of Object.entries(attributes)) {
            if (cluster.hasAttribute(nameOrID)) {
                const attribute = cluster.getAttribute(nameOrID);
                payload.push({ attrId: attribute.ID, attrData: value, dataType: attribute.type });
            }
            else if (!isNaN(Number(nameOrID))) {
                payload.push({ attrId: Number(nameOrID), attrData: value.value, dataType: value.type });
            }
            else {
                throw new Error(`Unknown attribute '${nameOrID}', specify either an existing attribute or a number`);
            }
        }
        const log = `Report to ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}(${JSON.stringify(attributes)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, options.direction, options.disableDefaultResponse, options.manufacturerCode, (_a = options.transactionSequenceNumber) !== null && _a !== void 0 ? _a : zclTransactionSequenceNumber_1.default.next(), "report", cluster.ID, payload, options.reservedBits);
            await this.sendRequest(frame, options);
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async write(clusterKey, attributes, options) {
        var _a;
        const cluster = Zcl.Utils.getCluster(clusterKey);
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.CLIENT_TO_SERVER, cluster.manufacturerCode);
        const payload = [];
        for (const [nameOrID, value] of Object.entries(attributes)) {
            if (cluster.hasAttribute(nameOrID)) {
                const attribute = cluster.getAttribute(nameOrID);
                payload.push({ attrId: attribute.ID, attrData: value, dataType: attribute.type });
            }
            else if (!isNaN(Number(nameOrID))) {
                payload.push({ attrId: Number(nameOrID), attrData: value.value, dataType: value.type });
            }
            else {
                throw new Error(`Unknown attribute '${nameOrID}', specify either an existing attribute or a number`);
            }
        }
        const log = `Write ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}(${JSON.stringify(attributes)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, options.direction, options.disableDefaultResponse, options.manufacturerCode, (_a = options.transactionSequenceNumber) !== null && _a !== void 0 ? _a : zclTransactionSequenceNumber_1.default.next(), options.writeUndiv ? "writeUndiv" : "write", cluster.ID, payload, options.reservedBits);
            const result = await this.sendRequest(frame, options);
            if (!options.disableResponse) {
                this.checkStatus(result.frame.Payload);
            }
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async writeResponse(clusterKey, transactionSequenceNumber, attributes, options) {
        (0, assert_1.default)(!options || !options.hasOwnProperty('transactionSequenceNumber'), 'Use parameter');
        const cluster = Zcl.Utils.getCluster(clusterKey);
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.SERVER_TO_CLIENT, cluster.manufacturerCode);
        const payload = [];
        for (const [nameOrID, value] of Object.entries(attributes)) {
            if (value.hasOwnProperty('status')) {
                if (cluster.hasAttribute(nameOrID)) {
                    const attribute = cluster.getAttribute(nameOrID);
                    payload.push({ attrId: attribute.ID, status: value.status });
                }
                else if (!isNaN(Number(nameOrID))) {
                    payload.push({ attrId: Number(nameOrID), status: value.status });
                }
                else {
                    throw new Error(`Unknown attribute '${nameOrID}', specify either an existing attribute or a number`);
                }
            }
            else {
                throw new Error(`Missing attribute 'status'`);
            }
        }
        const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, options.direction, options.disableDefaultResponse, options.manufacturerCode, transactionSequenceNumber, 'writeRsp', cluster.ID, payload, options.reservedBits);
        const log = `WriteResponse ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}(${JSON.stringify(attributes)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            await this.sendRequest(frame, options);
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async read(clusterKey, attributes, options) {
        var _a;
        const cluster = Zcl.Utils.getCluster(clusterKey);
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.CLIENT_TO_SERVER, cluster.manufacturerCode);
        const payload = [];
        for (const attribute of attributes) {
            payload.push({ attrId: typeof attribute === 'number' ? attribute : cluster.getAttribute(attribute).ID });
        }
        const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, options.direction, options.disableDefaultResponse, options.manufacturerCode, (_a = options.transactionSequenceNumber) !== null && _a !== void 0 ? _a : zclTransactionSequenceNumber_1.default.next(), 'read', cluster.ID, payload, options.reservedBits);
        const log = `Read ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}(${JSON.stringify(attributes)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            const result = await this.sendRequest(frame, options);
            if (!options.disableResponse) {
                this.checkStatus(result.frame.Payload);
                return ZclFrameConverter.attributeKeyValue(result.frame);
            }
            else {
                return null;
            }
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async readResponse(clusterKey, transactionSequenceNumber, attributes, options) {
        (0, assert_1.default)(!options || !options.hasOwnProperty('transactionSequenceNumber'), 'Use parameter');
        const cluster = Zcl.Utils.getCluster(clusterKey);
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.SERVER_TO_CLIENT, cluster.manufacturerCode);
        const payload = [];
        for (const [nameOrID, value] of Object.entries(attributes)) {
            if (cluster.hasAttribute(nameOrID)) {
                const attribute = cluster.getAttribute(nameOrID);
                payload.push({ attrId: attribute.ID, attrData: value, dataType: attribute.type, status: 0 });
            }
            else if (!isNaN(Number(nameOrID))) {
                payload.push({ attrId: Number(nameOrID), attrData: value.value, dataType: value.type, status: 0 });
            }
            else {
                throw new Error(`Unknown attribute '${nameOrID}', specify either an existing attribute or a number`);
            }
        }
        const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, options.direction, options.disableDefaultResponse, options.manufacturerCode, transactionSequenceNumber, 'readRsp', cluster.ID, payload, options.reservedBits);
        const log = `ReadResponse ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}(${JSON.stringify(attributes)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            await this.sendRequest(frame, options);
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    addBinding(clusterKey, target) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        if (typeof target === 'number') {
            target = group_1.default.byGroupID(target) || group_1.default.create(target);
        }
        if (!this.binds.find((b) => b.cluster.ID === cluster.ID && b.target === target)) {
            if (target instanceof group_1.default) {
                this._binds.push({ cluster: cluster.ID, groupID: target.groupID, type: 'group' });
            }
            else {
                this._binds.push({
                    cluster: cluster.ID, type: 'endpoint', deviceIeeeAddress: target.deviceIeeeAddress,
                    endpointID: target.ID
                });
            }
            this.save();
        }
    }
    async bind(clusterKey, target) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        const type = target instanceof Endpoint ? 'endpoint' : 'group';
        if (typeof target === 'number') {
            target = group_1.default.byGroupID(target) || group_1.default.create(target);
        }
        const destinationAddress = target instanceof Endpoint ? target.deviceIeeeAddress : target.groupID;
        const log = `Bind ${this.deviceIeeeAddress}/${this.ID} ${cluster.name} from ` +
            `'${target instanceof Endpoint ? `${destinationAddress}/${target.ID}` : destinationAddress}'`;
        debug.info(log);
        try {
            await entity_1.default.adapter.bind(this.deviceNetworkAddress, this.deviceIeeeAddress, this.ID, cluster.ID, destinationAddress, type, target instanceof Endpoint ? target.ID : null);
            this.addBinding(clusterKey, target);
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    save() {
        this.getDevice().save();
    }
    async unbind(clusterKey, target) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        const type = target instanceof Endpoint ? 'endpoint' : 'group';
        const destinationAddress = target instanceof Endpoint ? target.deviceIeeeAddress : (target instanceof group_1.default ? target.groupID : target);
        const log = `Unbind ${this.deviceIeeeAddress}/${this.ID} ${cluster.name} from ` +
            `'${target instanceof Endpoint ? `${destinationAddress}/${target.ID}` : destinationAddress}'`;
        debug.info(log);
        try {
            await entity_1.default.adapter.unbind(this.deviceNetworkAddress, this.deviceIeeeAddress, this.ID, cluster.ID, destinationAddress, type, target instanceof Endpoint ? target.ID : null);
            if (typeof target === 'number' && group_1.default.byGroupID(target)) {
                target = group_1.default.byGroupID(target);
            }
            const index = this.binds.findIndex((b) => b.cluster.ID === cluster.ID && b.target === target);
            if (index !== -1) {
                this._binds.splice(index, 1);
                this.save();
            }
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async defaultResponse(commandID, status, clusterID, transactionSequenceNumber, options) {
        (0, assert_1.default)(!options || !options.hasOwnProperty('transactionSequenceNumber'), 'Use parameter');
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.SERVER_TO_CLIENT, null);
        const payload = { cmdId: commandID, statusCode: status };
        const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, options.direction, options.disableDefaultResponse, options.manufacturerCode, transactionSequenceNumber, 'defaultRsp', clusterID, payload, options.reservedBits);
        const log = `DefaultResponse ${this.deviceIeeeAddress}/${this.ID} ` +
            `${clusterID}(${commandID}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            await this.sendRequest(frame, options);
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async configureReporting(clusterKey, items, options) {
        var _a;
        const cluster = Zcl.Utils.getCluster(clusterKey);
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.CLIENT_TO_SERVER, cluster.manufacturerCode);
        const payload = items.map((item) => {
            let dataType, attrId;
            if (typeof item.attribute === 'object') {
                dataType = item.attribute.type;
                attrId = item.attribute.ID;
            }
            else {
                /* istanbul ignore else */
                if (cluster.hasAttribute(item.attribute)) {
                    const attribute = cluster.getAttribute(item.attribute);
                    dataType = attribute.type;
                    attrId = attribute.ID;
                }
            }
            return {
                direction: Zcl.Direction.CLIENT_TO_SERVER,
                attrId, dataType,
                minRepIntval: item.minimumReportInterval,
                maxRepIntval: item.maximumReportInterval,
                repChange: item.reportableChange,
            };
        });
        const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, options.direction, options.disableDefaultResponse, options.manufacturerCode, (_a = options.transactionSequenceNumber) !== null && _a !== void 0 ? _a : zclTransactionSequenceNumber_1.default.next(), 'configReport', cluster.ID, payload, options.reservedBits);
        const log = `ConfigureReporting ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}(${JSON.stringify(items)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            const result = await this.sendRequest(frame, options);
            if (!options.disableResponse) {
                this.checkStatus(result.frame.Payload);
            }
            for (const e of payload) {
                this._configuredReportings = this._configuredReportings.filter((c) => !(c.attrId === e.attrId &&
                    c.cluster === cluster.ID && c.manufacturerCode === options.manufacturerCode));
            }
            for (const entry of payload) {
                if (entry.maxRepIntval !== 0xFFFF) {
                    this._configuredReportings.push({
                        cluster: cluster.ID, attrId: entry.attrId, minRepIntval: entry.minRepIntval,
                        maxRepIntval: entry.maxRepIntval, repChange: entry.repChange,
                        manufacturerCode: options.manufacturerCode,
                    });
                }
            }
            this.save();
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async writeStructured(clusterKey, payload, options) {
        var _a;
        const cluster = Zcl.Utils.getCluster(clusterKey);
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.CLIENT_TO_SERVER, cluster.manufacturerCode);
        const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, options.direction, options.disableDefaultResponse, options.manufacturerCode, (_a = options.transactionSequenceNumber) !== null && _a !== void 0 ? _a : zclTransactionSequenceNumber_1.default.next(), `writeStructured`, cluster.ID, payload, options.reservedBits);
        const log = `WriteStructured ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}(${JSON.stringify(payload)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            await this.sendRequest(frame, options);
            // TODO: support `writeStructuredResponse`
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async command(clusterKey, commandKey, payload, options) {
        var _a;
        const cluster = Zcl.Utils.getCluster(clusterKey);
        const command = cluster.getCommand(commandKey);
        const hasResponse = command.hasOwnProperty('response');
        options = this.getOptionsWithDefaults(options, hasResponse, Zcl.Direction.CLIENT_TO_SERVER, cluster.manufacturerCode);
        const frame = Zcl.ZclFrame.create(Zcl.FrameType.SPECIFIC, options.direction, options.disableDefaultResponse, options.manufacturerCode, (_a = options.transactionSequenceNumber) !== null && _a !== void 0 ? _a : zclTransactionSequenceNumber_1.default.next(), command.name, cluster.name, payload, options.reservedBits);
        const log = `Command ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}.${command.name}(${JSON.stringify(payload)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            const result = await this.sendRequest(frame, options);
            if (result) {
                return result.frame.Payload;
            }
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    async commandResponse(clusterKey, commandKey, payload, options, transactionSequenceNumber) {
        (0, assert_1.default)(!options || !options.hasOwnProperty('transactionSequenceNumber'), 'Use parameter');
        const cluster = Zcl.Utils.getCluster(clusterKey);
        const command = cluster.getCommandResponse(commandKey);
        transactionSequenceNumber = transactionSequenceNumber || zclTransactionSequenceNumber_1.default.next();
        options = this.getOptionsWithDefaults(options, true, Zcl.Direction.SERVER_TO_CLIENT, cluster.manufacturerCode);
        const frame = Zcl.ZclFrame.create(Zcl.FrameType.SPECIFIC, options.direction, options.disableDefaultResponse, options.manufacturerCode, transactionSequenceNumber, command.name, cluster.name, payload, options.reservedBits);
        const log = `CommandResponse ${this.deviceIeeeAddress}/${this.ID} ` +
            `${cluster.name}.${command.name}(${JSON.stringify(payload)}, ${JSON.stringify(options)})`;
        debug.info(log);
        try {
            await this.sendRequest(frame, options, async (f) => {
                // Broadcast Green Power responses
                if (this.ID === 242) {
                    await entity_1.default.adapter.sendZclFrameToAll(242, f, 242);
                }
                else {
                    await entity_1.default.adapter.sendZclFrameToEndpoint(this.deviceIeeeAddress, this.deviceNetworkAddress, this.ID, f, options.timeout, options.disableResponse, options.disableRecovery, options.srcEndpoint);
                }
            });
        }
        catch (error) {
            error.message = `${log} failed (${error.message})`;
            debug.error(error.message);
            throw error;
        }
    }
    waitForCommand(clusterKey, commandKey, transactionSequenceNumber, timeout) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        const command = cluster.getCommand(commandKey);
        const waiter = entity_1.default.adapter.waitFor(this.deviceNetworkAddress, this.ID, Zcl.FrameType.SPECIFIC, Zcl.Direction.CLIENT_TO_SERVER, transactionSequenceNumber, cluster.ID, command.ID, timeout);
        const promise = new Promise((resolve, reject) => {
            waiter.promise.then((payload) => resolve({ header: payload.frame.Header, payload: payload.frame.Payload }), (error) => reject(error));
        });
        return { promise, cancel: waiter.cancel };
    }
    getOptionsWithDefaults(options, disableDefaultResponse, direction, manufacturerCode) {
        const providedOptions = options || {};
        return {
            sendWhen: this.getDevice().defaultSendRequestWhen,
            timeout: 10000,
            disableResponse: false,
            disableRecovery: false,
            disableDefaultResponse,
            direction,
            srcEndpoint: null,
            reservedBits: 0,
            manufacturerCode: manufacturerCode ? manufacturerCode : null,
            transactionSequenceNumber: null,
            writeUndiv: false,
            ...providedOptions
        };
    }
    async addToGroup(group) {
        await this.command('genGroups', 'add', { groupid: group.groupID, groupname: '' });
        group.addMember(this);
    }
    /**
     * Remove endpoint from a group, accepts both a Group and number as parameter.
     * The number parameter type should only be used when removing from a group which is not known
     * to zigbee-herdsman.
     */
    async removeFromGroup(group) {
        await this.command('genGroups', 'remove', { groupid: group instanceof group_1.default ? group.groupID : group });
        if (group instanceof group_1.default) {
            group.removeMember(this);
        }
    }
    async removeFromAllGroups() {
        await this.command('genGroups', 'removeAll', {}, { disableDefaultResponse: true });
        this.removeFromAllGroupsDatabase();
    }
    removeFromAllGroupsDatabase() {
        for (const group of group_1.default.all()) {
            if (group.hasMember(this)) {
                group.removeMember(this);
            }
        }
    }
}
exports.default = Endpoint;
//# sourceMappingURL=endpoint.js.map