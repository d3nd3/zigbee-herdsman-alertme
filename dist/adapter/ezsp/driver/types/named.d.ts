/// <reference types="node" />
import * as basic from './basic';
export declare class NcpResetCode extends basic.uint8_t {
    static RESET_UNKNOWN_REASON: number;
    static RESET_EXTERNAL: number;
    static RESET_POWER_ON: number;
    static RESET_WATCHDOG: number;
    static RESET_ASSERT: number;
    static RESET_BOOTLOADER: number;
    static RESET_SOFTWARE: number;
    static ERROR_EXCEEDED_MAXIMUM_ACK_TIMEOUT_COUNT: number;
    static ERROR_UNKNOWN_EM3XX_ERROR: number;
}
export declare class EmberRf4ceTxOption extends basic.uint8_t {
}
export declare class EmberRf4ceNodeCapabilities extends basic.uint8_t {
}
export declare class EmberRf4ceApplicationCapabilities extends basic.uint8_t {
}
export declare class EmberNodeId extends basic.uint16_t {
}
export declare class EmberPanId extends basic.uint16_t {
}
export declare class EmberMulticastId extends basic.uint16_t {
}
declare const EmberEUI64_base: {
    new (): any;
    deserialize(cls: any, data: Buffer): any;
};
export declare class EmberEUI64 extends EmberEUI64_base {
    private _value;
    constructor(_value: ArrayLike<number> | string);
    static deserialize(cls: any, data: Buffer): any[];
    static serialize(cls: any, value: number[] | EmberEUI64): Buffer;
    get value(): any;
    toString(): string;
}
export declare class EmberLibraryStatus extends basic.uint8_t {
}
export declare class SecureEzspSecurityType extends basic.uint32_t {
}
export declare class SecureEzspSecurityLevel extends basic.uint8_t {
}
export declare class EmberGpSecurityLevel extends basic.uint8_t {
}
export declare class EmberGpKeyType extends basic.uint8_t {
}
export declare class SecureEzspRandomNumber extends basic.uint64_t {
}
export declare class SecureEzspSessionId extends basic.uint64_t {
}
export declare class Bool extends basic.uint8_t {
    static false: number;
    static true: number;
}
export declare class EzspConfigId extends basic.uint8_t {
    static CONFIG_PACKET_BUFFER_COUNT: number;
    static CONFIG_NEIGHBOR_TABLE_SIZE: number;
    static CONFIG_APS_UNICAST_MESSAGE_COUNT: number;
    static CONFIG_BINDING_TABLE_SIZE: number;
    static CONFIG_ADDRESS_TABLE_SIZE: number;
    static CONFIG_MULTICAST_TABLE_SIZE: number;
    static CONFIG_ROUTE_TABLE_SIZE: number;
    static CONFIG_DISCOVERY_TABLE_SIZE: number;
    static CONFIG_BROADCAST_ALARM_DATA_SIZE: number;
    static CONFIG_UNICAST_ALARM_DATA_SIZE: number;
    static CONFIG_STACK_PROFILE: number;
    static CONFIG_SECURITY_LEVEL: number;
    static CONFIG_MAX_HOPS: number;
    static CONFIG_MAX_END_DEVICE_CHILDREN: number;
    static CONFIG_INDIRECT_TRANSMISSION_TIMEOUT: number;
    static CONFIG_END_DEVICE_POLL_TIMEOUT: number;
    static CONFIG_MOBILE_NODE_POLL_TIMEOUT: number;
    static CONFIG_RESERVED_MOBILE_CHILD_ENTRIES: number;
    static CONFIG_TX_POWER_MODE: number;
    static CONFIG_DISABLE_RELAY: number;
    static CONFIG_TRUST_CENTER_ADDRESS_CACHE_SIZE: number;
    static CONFIG_SOURCE_ROUTE_TABLE_SIZE: number;
    static CONFIG_END_DEVICE_POLL_TIMEOUT_SHIFT: number;
    static CONFIG_FRAGMENT_WINDOW_SIZE: number;
    static CONFIG_FRAGMENT_DELAY_MS: number;
    static CONFIG_KEY_TABLE_SIZE: number;
    static CONFIG_APS_ACK_TIMEOUT: number;
    static CONFIG_ACTIVE_SCAN_DURATION: number;
    static CONFIG_END_DEVICE_BIND_TIMEOUT: number;
    static CONFIG_PAN_ID_CONFLICT_REPORT_THRESHOLD: number;
    static CONFIG_REQUEST_KEY_TIMEOUT: number;
    static CONFIG_CERTIFICATE_TABLE_SIZE: number;
    static CONFIG_APPLICATION_ZDO_FLAGS: number;
    static CONFIG_BROADCAST_TABLE_SIZE: number;
    static CONFIG_MAC_FILTER_TABLE_SIZE: number;
    static CONFIG_SUPPORTED_NETWORKS: number;
    static CONFIG_SEND_MULTICASTS_TO_SLEEPY_ADDRESS: number;
    static CONFIG_ZLL_GROUP_ADDRESSES: number;
    static CONFIG_ZLL_RSSI_THRESHOLD: number;
    static CONFIG_RF4CE_PAIRING_TABLE_SIZE: number;
    static CONFIG_RF4CE_PENDING_OUTGOING_PACKET_TABLE_SIZE: number;
    static CONFIG_MTORR_FLOW_CONTROL: number;
    static CONFIG_RETRY_QUEUE_SIZE: number;
    static CONFIG_NEW_BROADCAST_ENTRY_THRESHOLD: number;
    static CONFIG_TRANSIENT_KEY_TIMEOUT_S: number;
    static CONFIG_BROADCAST_MIN_ACKS_NEEDED: number;
    static CONFIG_TC_REJOINS_USING_WELL_KNOWN_KEY_TIMEOUT_S: number;
}
export declare class EzspValueId extends basic.uint8_t {
    static VALUE_TOKEN_STACK_NODE_DATA: number;
    static VALUE_MAC_PASSTHROUGH_FLAGS: number;
    static VALUE_EMBERNET_PASSTHROUGH_SOURCE_ADDRESS: number;
    static VALUE_FREE_BUFFERS: number;
    static VALUE_UART_SYNCH_CALLBACKS: number;
    static VALUE_MAXIMUM_INCOMING_TRANSFER_SIZE: number;
    static VALUE_MAXIMUM_OUTGOING_TRANSFER_SIZE: number;
    static VALUE_STACK_TOKEN_WRITING: number;
    static VALUE_STACK_IS_PERFORMING_REJOIN: number;
    static VALUE_MAC_FILTER_LIST: number;
    static VALUE_EXTENDED_SECURITY_BITMASK: number;
    static VALUE_NODE_SHORT_ID: number;
    static VALUE_DESCRIPTOR_CAPABILITY: number;
    static VALUE_STACK_DEVICE_REQUEST_SEQUENCE_NUMBER: number;
    static VALUE_RADIO_HOLD_OFF: number;
    static VALUE_ENDPOINT_FLAGS: number;
    static VALUE_MFG_SECURITY_CONFIG: number;
    static VALUE_VERSION_INFO: number;
    static VALUE_NEXT_HOST_REJOIN_REASON: number;
    static VALUE_LAST_REJOIN_REASON: number;
    static VALUE_NEXT_ZIGBEE_SEQUENCE_NUMBER: number;
    static VALUE_CCA_THRESHOLD: number;
    static VALUE_SET_COUNTER_THRESHOLD: number;
    static VALUE_RESET_COUNTER_THRESHOLDS: number;
    static VALUE_CLEAR_COUNTERS: number;
    static VALUE_RF4CE_BASE_CHANNEL: number;
    static VALUE_RF4CE_SUPPORTED_DEVICE_TYPES_LIST: number;
    static VALUE_RF4CE_SUPPORTED_PROFILES_LIST: number;
    static VALUE_ENABLE_R21_BEHAVIOR: number;
    static VALUE_ANTENNA_MODE: number;
    static VALUE_RF4CE_GDP_BINDING_RECIPIENT_PARAMETERS: number;
    static VALUE_RF4CE_GDP_PUSH_BUTTON_STIMULUS_RECEIVED_PENDING_FLAG: number;
    static VALUE_RF4CE_GDP_BINDING_PROXY_FLAG: number;
    static VALUE_RF4CE_GDP_APPLICATION_SPECIFIC_USER_STRING: number;
    static VALUE_RF4CE_MSO_USER_STRING: number;
    static VALUE_RF4CE_MSO_BINDING_RECIPIENT_PARAMETERS: number;
    static VALUE_NWK_FRAME_COUNTER: number;
    static VALUE_APS_FRAME_COUNTER: number;
    static VALUE_RETRY_DEVICE_TYPE: number;
    static VALUE_RF4CE_BASE_CHANNEL2: number;
    static VALUE_RF4CE_SUPPORTED_DEVICE_TYPES_LIST2: number;
    static VALUE_RF4CE_SUPPORTED_PROFILES_LIST2: number;
    static VALUE_ENABLE_PTA: number;
    static VALUE_PTA_OPTIONS: number;
    static VALUE_MFGLIB_OPTIONS: number;
    static VALUE_END_DEVICE_KEEP_ALIVE_SUPPORT_MODE: number;
}
export declare class EzspExtendedValueId extends basic.uint8_t {
    static EXTENDED_VALUE_ENDPOINT_FLAGS: number;
    static EXTENDED_VALUE_LAST_LEAVE_REASON: number;
    static EXTENDED_VALUE_GET_SOURCE_ROUTE_OVERHEAD: number;
}
export declare class EzspEndpointFlags extends basic.uint16_t {
    static ENDPOINT_DISABLED: number;
    static ENDPOINT_ENABLED: number;
}
export declare class EmberConfigTxPowerMode extends basic.uint16_t {
    static TX_POWER_MODE_DEFAULT: number;
    static TX_POWER_MODE_BOOST: number;
    static TX_POWER_MODE_ALTERNATE: number;
}
export declare class EzspPolicyId extends basic.uint8_t {
    static TRUST_CENTER_POLICY: number;
    static BINDING_MODIFICATION_POLICY: number;
    static UNICAST_REPLIES_POLICY: number;
    static POLL_HANDLER_POLICY: number;
    static MESSAGE_CONTENTS_IN_CALLBACK_POLICY: number;
    static TC_KEY_REQUEST_POLICY: number;
    static APP_KEY_REQUEST_POLICY: number;
    static PACKET_VALIDATE_LIBRARY_POLICY: number;
    static ZLL_POLICY: number;
    static TC_REJOINS_USING_WELL_KNOWN_KEY_POLICY: number;
}
export declare class EzspDecisionId extends basic.uint16_t {
    static ALLOW_JOINS: number;
    static ALLOW_JOINS_REJOINS_HAVE_LINK_KEY: number;
    static ALLOW_PRECONFIGURED_KEY_JOINS: number;
    static ALLOW_REJOINS_ONLY: number;
    static DISALLOW_ALL_JOINS_AND_REJOINS: number;
    static IGNORE_TRUST_CENTER_REJOINS: number;
    static DISALLOW_BINDING_MODIFICATION: number;
    static ALLOW_BINDING_MODIFICATION: number;
    static CHECK_BINDING_MODIFICATIONS_ARE_VALID_ENDPOINT_CLUSTERS: number;
    static HOST_WILL_NOT_SUPPLY_REPLY: number;
    static HOST_WILL_SUPPLY_REPLY: number;
    static POLL_HANDLER_IGNORE: number;
    static POLL_HANDLER_CALLBACK: number;
    static MESSAGE_TAG_ONLY_IN_CALLBACK: number;
    static MESSAGE_TAG_AND_CONTENTS_IN_CALLBACK: number;
    static DENY_TC_KEY_REQUESTS: number;
    static ALLOW_TC_KEY_REQUESTS: number;
    static GENERATE_NEW_TC_LINK_KEY: number;
    static DENY_APP_KEY_REQUESTS: number;
    static ALLOW_APP_KEY_REQUESTS: number;
    static PACKET_VALIDATE_LIBRARY_CHECKS_ENABLED: number;
    static PACKET_VALIDATE_LIBRARY_CHECKS_DISABLED: number;
}
export declare class EzspMfgTokenId extends basic.uint8_t {
    static MFG_CUSTOM_VERSION: number;
    static MFG_STRING: number;
    static MFG_BOARD_NAME: number;
    static MFG_MANUF_ID: number;
    static MFG_PHY_CONFIG: number;
    static MFG_BOOTLOAD_AES_KEY: number;
    static MFG_ASH_CONFIG: number;
    static MFG_STORAGE: number;
    static STACK_CAL_DATA: number;
    static MFG_CBKE_DATA: number;
    static MFG_INSTALLATION_CODE: number;
    static STACK_CAL_FILTER: number;
    static MFG_CUSTOM_EUI_64: number;
    static MFG_CTUNE: number;
}
export declare class EzspStatus extends basic.uint8_t {
    static SUCCESS: number;
    static SPI_ERR_FATAL: number;
    static SPI_ERR_NCP_RESET: number;
    static SPI_ERR_OVERSIZED_FRAME: number;
    static SPI_ERR_ABORTED_TRANSACTION: number;
    static SPI_ERR_MISSING_FRAME_TERMINATOR: number;
    static SPI_ERR_WAIT_SECTION_TIMEOUT: number;
    static SPI_ERR_NO_FRAME_TERMINATOR: number;
    static SPI_ERR_COMMAND_OVERSIZED: number;
    static SPI_ERR_RESPONSE_OVERSIZED: number;
    static SPI_WAITING_FOR_RESPONSE: number;
    static SPI_ERR_HANDSHAKE_TIMEOUT: number;
    static SPI_ERR_STARTUP_TIMEOUT: number;
    static SPI_ERR_STARTUP_FAIL: number;
    static SPI_ERR_UNSUPPORTED_SPI_COMMAND: number;
    static ASH_IN_PROGRESS: number;
    static HOST_FATAL_ERROR: number;
    static ASH_NCP_FATAL_ERROR: number;
    static DATA_FRAME_TOO_LONG: number;
    static DATA_FRAME_TOO_SHORT: number;
    static NO_TX_SPACE: number;
    static NO_RX_SPACE: number;
    static NO_RX_DATA: number;
    static NOT_CONNECTED: number;
    static ERROR_VERSION_NOT_SET: number;
    static ERROR_INVALID_FRAME_ID: number;
    static ERROR_WRONG_DIRECTION: number;
    static ERROR_TRUNCATED: number;
    static ERROR_OVERFLOW: number;
    static ERROR_OUT_OF_MEMORY: number;
    static ERROR_INVALID_VALUE: number;
    static ERROR_INVALID_ID: number;
    static ERROR_INVALID_CALL: number;
    static ERROR_NO_RESPONSE: number;
    static ERROR_COMMAND_TOO_LONG: number;
    static ERROR_QUEUE_FULL: number;
    static ERROR_COMMAND_FILTERED: number;
    static ERROR_SECURITY_KEY_ALREADY_SET: number;
    static ERROR_SECURITY_TYPE_INVALID: number;
    static ERROR_SECURITY_PARAMETERS_INVALID: number;
    static ERROR_SECURITY_PARAMETERS_ALREADY_SET: number;
    static ERROR_SECURITY_KEY_NOT_SET: number;
    static ERROR_SECURITY_PARAMETERS_NOT_SET: number;
    static ERROR_UNSUPPORTED_CONTROL: number;
    static ERROR_UNSECURE_FRAME: number;
    static ASH_ERROR_VERSION: number;
    static ASH_ERROR_TIMEOUTS: number;
    static ASH_ERROR_RESET_FAIL: number;
    static ASH_ERROR_NCP_RESET: number;
    static ERROR_SERIAL_INIT: number;
    static ASH_ERROR_NCP_TYPE: number;
    static ASH_ERROR_RESET_METHOD: number;
    static ASH_ERROR_XON_XOFF: number;
    static ASH_STARTED: number;
    static ASH_CONNECTED: number;
    static ASH_DISCONNECTED: number;
    static ASH_ACK_TIMEOUT: number;
    static ASH_CANCELLED: number;
    static ASH_OUT_OF_SEQUENCE: number;
    static ASH_BAD_CRC: number;
    static ASH_COMM_ERROR: number;
    static ASH_BAD_ACKNUM: number;
    static ASH_TOO_SHORT: number;
    static ASH_TOO_LONG: number;
    static ASH_BAD_CONTROL: number;
    static ASH_BAD_LENGTH: number;
    static ASH_ACK_RECEIVED: number;
    static ASH_ACK_SENT: number;
    static NO_ERROR: number;
}
export declare class EmberStatus extends basic.uint8_t {
    static SUCCESS: number;
    static ERR_FATAL: number;
    static BAD_ARGUMENT: number;
    static EEPROM_MFG_STACK_VERSION_MISMATCH: number;
    static INCOMPATIBLE_STATIC_MEMORY_DEFINITIONS: number;
    static EEPROM_MFG_VERSION_MISMATCH: number;
    static EEPROM_STACK_VERSION_MISMATCH: number;
    static NO_BUFFERS: number;
    static SERIAL_INVALID_BAUD_RATE: number;
    static SERIAL_INVALID_PORT: number;
    static SERIAL_TX_OVERFLOW: number;
    static SERIAL_RX_OVERFLOW: number;
    static SERIAL_RX_FRAME_ERROR: number;
    static SERIAL_RX_PARITY_ERROR: number;
    static SERIAL_RX_EMPTY: number;
    static SERIAL_RX_OVERRUN_ERROR: number;
    static MAC_TRANSMIT_QUEUE_FULL: number;
    static MAC_UNKNOWN_HEADER_TYPE: number;
    static MAC_SCANNING: number;
    static MAC_NO_DATA: number;
    static MAC_JOINED_NETWORK: number;
    static MAC_BAD_SCAN_DURATION: number;
    static MAC_INCORRECT_SCAN_TYPE: number;
    static MAC_INVALID_CHANNEL_MASK: number;
    static MAC_COMMAND_TRANSMIT_FAILURE: number;
    static MAC_NO_ACK_RECEIVED: number;
    static MAC_INDIRECT_TIMEOUT: number;
    static SIM_EEPROM_ERASE_PAGE_GREEN: number;
    static SIM_EEPROM_ERASE_PAGE_RED: number;
    static SIM_EEPROM_FULL: number;
    static ERR_FLASH_WRITE_INHIBITED: number;
    static ERR_FLASH_VERIFY_FAILED: number;
    static SIM_EEPROM_INIT_1_FAILED: number;
    static SIM_EEPROM_INIT_2_FAILED: number;
    static SIM_EEPROM_INIT_3_FAILED: number;
    static ERR_FLASH_PROG_FAIL: number;
    static ERR_FLASH_ERASE_FAIL: number;
    static ERR_BOOTLOADER_TRAP_TABLE_BAD: number;
    static ERR_BOOTLOADER_TRAP_UNKNOWN: number;
    static ERR_BOOTLOADER_NO_IMAGE: number;
    static DELIVERY_FAILED: number;
    static BINDING_INDEX_OUT_OF_RANGE: number;
    static ADDRESS_TABLE_INDEX_OUT_OF_RANGE: number;
    static INVALID_BINDING_INDEX: number;
    static INVALID_CALL: number;
    static COST_NOT_KNOWN: number;
    static MAX_MESSAGE_LIMIT_REACHED: number;
    static MESSAGE_TOO_LONG: number;
    static BINDING_IS_ACTIVE: number;
    static ADDRESS_TABLE_ENTRY_IS_ACTIVE: number;
    static ADC_CONVERSION_DONE: number;
    static ADC_CONVERSION_BUSY: number;
    static ADC_CONVERSION_DEFERRED: number;
    static ADC_NO_CONVERSION_PENDING: number;
    static SLEEP_INTERRUPTED: number;
    static PHY_TX_UNDERFLOW: number;
    static PHY_TX_INCOMPLETE: number;
    static PHY_INVALID_CHANNEL: number;
    static PHY_INVALID_POWER: number;
    static PHY_TX_BUSY: number;
    static PHY_OSCILLATOR_CHECK_FAILED: number;
    static PHY_ACK_RECEIVED: number;
    static NETWORK_UP: number;
    static NETWORK_DOWN: number;
    static JOIN_FAILED: number;
    static MOVE_FAILED: number;
    static CANNOT_JOIN_AS_ROUTER: number;
    static NODE_ID_CHANGED: number;
    static PAN_ID_CHANGED: number;
    static NO_BEACONS: number;
    static RECEIVED_KEY_IN_THE_CLEAR: number;
    static NO_NETWORK_KEY_RECEIVED: number;
    static NO_LINK_KEY_RECEIVED: number;
    static PRECONFIGURED_KEY_REQUIRED: number;
    static NOT_JOINED: number;
    static INVALID_SECURITY_LEVEL: number;
    static NETWORK_BUSY: number;
    static INVALID_ENDPOINT: number;
    static BINDING_HAS_CHANGED: number;
    static INSUFFICIENT_RANDOM_DATA: number;
    static APS_ENCRYPTION_ERROR: number;
    static SECURITY_STATE_NOT_SET: number;
    static KEY_TABLE_INVALID_ADDRESS: number;
    static SECURITY_CONFIGURATION_INVALID: number;
    static TOO_SOON_FOR_SWITCH_KEY: number;
    static KEY_NOT_AUTHORIZED: number;
    static SECURITY_DATA_INVALID: number;
    static SOURCE_ROUTE_FAILURE: number;
    static MANY_TO_ONE_ROUTE_FAILURE: number;
    static STACK_AND_HARDWARE_MISMATCH: number;
    static INDEX_OUT_OF_RANGE: number;
    static TABLE_FULL: number;
    static TABLE_ENTRY_ERASED: number;
    static LIBRARY_NOT_PRESENT: number;
    static OPERATION_IN_PROGRESS: number;
    static APPLICATION_ERROR_0: number;
    static APPLICATION_ERROR_1: number;
    static APPLICATION_ERROR_2: number;
    static APPLICATION_ERROR_3: number;
    static APPLICATION_ERROR_4: number;
    static APPLICATION_ERROR_5: number;
    static APPLICATION_ERROR_6: number;
    static APPLICATION_ERROR_7: number;
    static APPLICATION_ERROR_8: number;
    static APPLICATION_ERROR_9: number;
    static APPLICATION_ERROR_10: number;
    static APPLICATION_ERROR_11: number;
    static APPLICATION_ERROR_12: number;
    static APPLICATION_ERROR_13: number;
    static APPLICATION_ERROR_14: number;
    static APPLICATION_ERROR_15: number;
}
export declare class EmberEventUnits extends basic.uint8_t {
    static EVENT_INACTIVE: number;
    static EVENT_MS_TIME: number;
    static EVENT_QS_TIME: number;
    static EVENT_MINUTE_TIME: number;
}
export declare class EmberNodeType extends basic.uint8_t {
    static UNKNOWN_DEVICE: number;
    static COORDINATOR: number;
    static ROUTER: number;
    static END_DEVICE: number;
    static SLEEPY_END_DEVICE: number;
    static MOBILE_END_DEVICE: number;
}
export declare class EmberNetworkStatus extends basic.uint8_t {
    static NO_NETWORK: number;
    static JOINING_NETWORK: number;
    static JOINED_NETWORK: number;
    static JOINED_NETWORK_NO_PARENT: number;
    static LEAVING_NETWORK: number;
}
export declare class EmberIncomingMessageType extends basic.uint8_t {
    static INCOMING_UNICAST: number;
    static INCOMING_UNICAST_REPLY: number;
    static INCOMING_MULTICAST: number;
    static INCOMING_MULTICAST_LOOPBACK: number;
    static INCOMING_BROADCAST: number;
    static INCOMING_BROADCAST_LOOPBACK: number;
    static INCOMING_MANY_TO_ONE_ROUTE_REQUEST: number;
}
export declare class EmberOutgoingMessageType extends basic.uint8_t {
    static OUTGOING_DIRECT: number;
    static OUTGOING_VIA_ADDRESS_TABLE: number;
    static OUTGOING_VIA_BINDING: number;
    static OUTGOING_MULTICAST: number;
    static OUTGOING_BROADCAST: number;
}
export declare class EmberMacPassthroughType extends basic.uint8_t {
    static MAC_PASSTHROUGH_NONE: number;
    static MAC_PASSTHROUGH_SE_INTERPAN: number;
    static MAC_PASSTHROUGH_EMBERNET: number;
    static MAC_PASSTHROUGH_EMBERNET_SOURCE: number;
    static MAC_PASSTHROUGH_APPLICATION: number;
    static MAC_PASSTHROUGH_CUSTOM: number;
    static MAC_PASSTHROUGH_INTERNAL: number;
}
export declare class EmberBindingType extends basic.uint8_t {
    static UNUSED_BINDING: number;
    static UNICAST_BINDING: number;
    static MANY_TO_ONE_BINDING: number;
    static MULTICAST_BINDING: number;
}
export declare class EmberApsOption extends basic.uint16_t {
    static APS_OPTION_NONE: number;
    static APS_OPTION_UNKNOWN: number;
    static APS_OPTION_ENCRYPTION: number;
    static APS_OPTION_RETRY: number;
    static APS_OPTION_ENABLE_ROUTE_DISCOVERY: number;
    static APS_OPTION_FORCE_ROUTE_DISCOVERY: number;
    static APS_OPTION_SOURCE_EUI64: number;
    static APS_OPTION_DESTINATION_EUI64: number;
    static APS_OPTION_ENABLE_ADDRESS_DISCOVERY: number;
    static APS_OPTION_POLL_RESPONSE: number;
    static APS_OPTION_ZDO_RESPONSE_REQUIRED: number;
    static APS_OPTION_FRAGMENT: number;
}
export declare class EzspNetworkScanType extends basic.uint8_t {
    static ENERGY_SCAN: number;
    static ACTIVE_SCAN: number;
}
export declare class EmberJoinDecision extends basic.uint8_t {
    static USE_PRECONFIGURED_KEY: number;
    static SEND_KEY_IN_THE_CLEAR: number;
    static DENY_JOIN: number;
    static NO_ACTION: number;
}
export declare class EmberInitialSecurityBitmask extends basic.uint16_t {
    static STANDARD_SECURITY_MODE: number;
    static DISTRIBUTED_TRUST_CENTER_MODE: number;
    static TRUST_CENTER_GLOBAL_LINK_KEY: number;
    static PRECONFIGURED_NETWORK_KEY_MODE: number;
    static TRUST_CENTER_USES_HASHED_LINK_KEY: number;
    static HAVE_PRECONFIGURED_KEY: number;
    static HAVE_NETWORK_KEY: number;
    static GET_LINK_KEY_WHEN_JOINING: number;
    static REQUIRE_ENCRYPTED_KEY: number;
    static NO_FRAME_COUNTER_RESET: number;
    static GET_PRECONFIGURED_KEY_FROM_INSTALL_CODE: number;
    static HAVE_TRUST_CENTER_EUI64: number;
}
export declare class EmberCurrentSecurityBitmask extends basic.uint16_t {
    static STANDARD_SECURITY_MODE: number;
    static HIGH_SECURITY_MODE: number;
    static DISTRIBUTED_TRUST_CENTER_MODE: number;
    static GLOBAL_LINK_KEY: number;
    static HAVE_TRUST_CENTER_LINK_KEY: number;
    static TRUST_CENTER_USES_HASHED_LINK_KEY: number;
}
export declare class EmberKeyType extends basic.uint8_t {
    static TRUST_CENTER_LINK_KEY: number;
    static TRUST_CENTER_MASTER_KEY: number;
    static CURRENT_NETWORK_KEY: number;
    static NEXT_NETWORK_KEY: number;
    static APPLICATION_LINK_KEY: number;
    static APPLICATION_MASTER_KEY: number;
}
export declare class EmberKeyStructBitmask extends basic.uint16_t {
    static KEY_HAS_SEQUENCE_NUMBER: number;
    static KEY_HAS_OUTGOING_FRAME_COUNTER: number;
    static KEY_HAS_INCOMING_FRAME_COUNTER: number;
    static KEY_HAS_PARTNER_EUI64: number;
}
export declare class EmberDeviceUpdate extends basic.uint8_t {
    static STANDARD_SECURITY_SECURED_REJOIN: number;
    static STANDARD_SECURITY_UNSECURED_JOIN: number;
    static DEVICE_LEFT: number;
    static STANDARD_SECURITY_UNSECURED_REJOIN: number;
    static HIGH_SECURITY_SECURED_REJOIN: number;
    static HIGH_SECURITY_UNSECURED_JOIN: number;
    static HIGH_SECURITY_UNSECURED_REJOIN: number;
}
export declare class EmberKeyStatus extends basic.uint8_t {
    static APP_LINK_KEY_ESTABLISHED: number;
    static APP_MASTER_KEY_ESTABLISHED: number;
    static TRUST_CENTER_LINK_KEY_ESTABLISHED: number;
    static KEY_ESTABLISHMENT_TIMEOUT: number;
    static KEY_TABLE_FULL: number;
    static TC_RESPONDED_TO_KEY_REQUEST: number;
    static TC_APP_KEY_SENT_TO_REQUESTER: number;
    static TC_RESPONSE_TO_KEY_REQUEST_FAILED: number;
    static TC_REQUEST_KEY_TYPE_NOT_SUPPORTED: number;
    static TC_NO_LINK_KEY_FOR_REQUESTER: number;
    static TC_REQUESTER_EUI64_UNKNOWN: number;
    static TC_RECEIVED_FIRST_APP_KEY_REQUEST: number;
    static TC_TIMEOUT_WAITING_FOR_SECOND_APP_KEY_REQUEST: number;
    static TC_NON_MATCHING_APP_KEY_REQUEST_RECEIVED: number;
    static TC_FAILED_TO_SEND_APP_KEYS: number;
    static TC_FAILED_TO_STORE_APP_KEY_REQUEST: number;
    static TC_REJECTED_APP_KEY_REQUEST: number;
}
export declare class EmberCounterType extends basic.uint8_t {
    static COUNTER_MAC_RX_BROADCAST: number;
    static COUNTER_MAC_TX_BROADCAST: number;
    static COUNTER_MAC_RX_UNICAST: number;
    static COUNTER_MAC_TX_UNICAST_SUCCESS: number;
    static COUNTER_MAC_TX_UNICAST_RETRY: number;
    static COUNTER_MAC_TX_UNICAST_FAILED: number;
    static COUNTER_APS_DATA_RX_BROADCAST: number;
    static COUNTER_APS_DATA_TX_BROADCAST: number;
    static COUNTER_APS_DATA_RX_UNICAST: number;
    static COUNTER_APS_DATA_TX_UNICAST_SUCCESS: number;
    static COUNTER_APS_DATA_TX_UNICAST_RETRY: number;
    static COUNTER_APS_DATA_TX_UNICAST_FAILED: number;
    static COUNTER_ROUTE_DISCOVERY_INITIATED: number;
    static COUNTER_NEIGHBOR_ADDED: number;
    static COUNTER_NEIGHBOR_REMOVED: number;
    static COUNTER_NEIGHBOR_STALE: number;
    static COUNTER_JOIN_INDICATION: number;
    static COUNTER_CHILD_REMOVED: number;
    static COUNTER_ASH_OVERFLOW_ERROR: number;
    static COUNTER_ASH_FRAMING_ERROR: number;
    static COUNTER_ASH_OVERRUN_ERROR: number;
    static COUNTER_NWK_FRAME_COUNTER_FAILURE: number;
    static COUNTER_APS_FRAME_COUNTER_FAILURE: number;
    static COUNTER_UTILITY: number;
    static COUNTER_APS_LINK_KEY_NOT_AUTHORIZED: number;
    static COUNTER_NWK_DECRYPTION_FAILURE: number;
    static COUNTER_APS_DECRYPTION_FAILURE: number;
    static COUNTER_ALLOCATE_PACKET_BUFFER_FAILURE: number;
    static COUNTER_RELAYED_UNICAST: number;
    static COUNTER_PHY_TO_MAC_QUEUE_LIMIT_REACHED: number;
    static COUNTER_PACKET_VALIDATE_LIBRARY_DROPPED_COUNT: number;
    static COUNTER_TYPE_NWK_RETRY_OVERFLOW: number;
    static COUNTER_PHY_CCA_FAIL_COUNT: number;
    static COUNTER_BROADCAST_TABLE_FULL: number;
    static COUNTER_PTA_LO_PRI_REQUESTED: number;
    static COUNTER_PTA_HI_PRI_REQUESTED: number;
    static COUNTER_PTA_LO_PRI_DENIED: number;
    static COUNTER_PTA_HI_PRI_DENIED: number;
    static COUNTER_PTA_LO_PRI_TX_ABORTED: number;
    static COUNTER_PTA_HI_PRI_TX_ABORTED: number;
    static COUNTER_TYPE_COUNT: number;
}
export declare class EmberJoinMethod extends basic.uint8_t {
    static USE_MAC_ASSOCIATION: number;
    static USE_NWK_REJOIN: number;
    static USE_NWK_REJOIN_HAVE_NWK_KEY: number;
    static USE_NWK_COMMISSIONING: number;
}
export declare class EmberZdoConfigurationFlags extends basic.uint8_t {
    static APP_RECEIVES_SUPPORTED_ZDO_REQUESTS: number;
    static APP_HANDLES_UNSUPPORTED_ZDO_REQUESTS: number;
    static APP_HANDLES_ZDO_ENDPOINT_REQUESTS: number;
    static APP_HANDLES_ZDO_BINDING_REQUESTS: number;
}
export declare class EmberConcentratorType extends basic.uint16_t {
    static LOW_RAM_CONCENTRATOR: number;
    static HIGH_RAM_CONCENTRATOR: number;
}
export declare class EmberZllState extends basic.uint16_t {
    static ZLL_STATE_NONE: number;
    static ZLL_STATE_FACTORY_NEW: number;
    static ZLL_STATE_ADDRESS_ASSIGNMENT_CAPABLE: number;
    static ZLL_STATE_LINK_INITIATOR: number;
    static ZLL_STATE_LINK_PRIORITY_REQUEST: number;
    static ZLL_STATE_NON_ZLL_NETWORK: number;
}
export declare class EmberZllKeyIndex extends basic.uint8_t {
    static ZLL_KEY_INDEX_DEVELOPMENT: number;
    static ZLL_KEY_INDEX_MASTER: number;
    static ZLL_KEY_INDEX_CERTIFICATION: number;
}
export declare class EzspZllNetworkOperation extends basic.uint8_t {
    static ZLL_FORM_NETWORK: number;
    static ZLL_JOIN_TARGET: number;
}
export declare class EzspSourceRouteOverheadInformation extends basic.uint8_t {
    static SOURCE_ROUTE_OVERHEAD_UNKNOWN: number;
}
export declare class EmberNetworkInitBitmask extends basic.uint16_t {
    static NETWORK_INIT_NO_OPTIONS: number;
    static NETWORK_INIT_PARENT_INFO_IN_TOKEN: number;
}
export declare class EmberZDOCmd extends basic.uint16_t {
    static NWK_addr_req: number;
    static IEEE_addr_req: number;
    static Node_Desc_req: number;
    static Power_Desc_req: number;
    static Simple_Desc_req: number;
    static Active_EP_req: number;
    static Match_Desc_req: number;
    static Complex_Desc_req: number;
    static User_Desc_req: number;
    static Discovery_Cache_req: number;
    static Device_annce: number;
    static User_Desc_set: number;
    static System_Server_Discovery_req: number;
    static Discovery_store_req: number;
    static Node_Desc_store_req: number;
    static Active_EP_store_req: number;
    static Simple_Desc_store_req: number;
    static Remove_node_cache_req: number;
    static Find_node_cache_req: number;
    static Extended_Simple_Desc_req: number;
    static Extended_Active_EP_req: number;
    static Parent_annce: number;
    static End_Device_Bind_req: number;
    static Bind_req: number;
    static Unbind_req: number;
    static Mgmt_Lqi_req: number;
    static Mgmt_Rtg_req: number;
    static Mgmt_Leave_req: number;
    static Mgmt_Permit_Joining_req: number;
    static Mgmt_NWK_Update_req: number;
    static NWK_addr_rsp: number;
    static IEEE_addr_rsp: number;
    static Node_Desc_rsp: number;
    static Power_Desc_rsp: number;
    static Simple_Desc_rsp: number;
    static Active_EP_rsp: number;
    static Match_Desc_rsp: number;
    static Complex_Desc_rsp: number;
    static User_Desc_rsp: number;
    static Discovery_Cache_rsp: number;
    static User_Desc_conf: number;
    static System_Server_Discovery_rsp: number;
    static Discovery_Store_rsp: number;
    static Node_Desc_store_rsp: number;
    static Power_Desc_store_rsp: number;
    static Active_EP_store_rsp: number;
    static Simple_Desc_store_rsp: number;
    static Remove_node_cache_rsp: number;
    static Find_node_cache_rsp: number;
    static Extended_Simple_Desc_rsp: number;
    static Extended_Active_EP_rsp: number;
    static Parent_annce_rsp: number;
    static End_Device_Bind_rsp: number;
    static Bind_rsp: number;
    static Unbind_rsp: number;
    static Mgmt_Lqi_rsp: number;
    static Mgmt_Rtg_rsp: number;
    static Mgmt_Leave_rsp: number;
    static Mgmt_Permit_Joining_rsp: number;
    static Mgmt_NWK_Update_rsp: number;
}
export declare class EzspDecisionBitmask extends basic.uint16_t {
    static DEFAULT_CONFIGURATION: number;
    static ALLOW_JOINS: number;
    static ALLOW_UNSECURED_REJOINS: number;
    static SEND_KEY_IN_CLEAR: number;
    static IGNORE_UNSECURED_REJOINS: number;
    static JOINS_USE_INSTALL_CODE_KEY: number;
    static DEFER_JOINS: number;
}
export {};
//# sourceMappingURL=named.d.ts.map