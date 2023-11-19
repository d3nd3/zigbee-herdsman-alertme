"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsLookup = exports.Events = void 0;
var Events;
(function (Events) {
    Events["message"] = "message";
    Events["adapterDisconnected"] = "adapterDisconnected";
    Events["deviceJoined"] = "deviceJoined";
    Events["deviceInterview"] = "deviceInterview";
    Events["deviceAnnounce"] = "deviceAnnounce";
    Events["deviceNetworkAddressChanged"] = "deviceNetworkAddressChanged";
    Events["deviceLeave"] = "deviceLeave";
    Events["permitJoinChanged"] = "permitJoinChanged";
    Events["lastSeenChanged"] = "lastSeenChanged";
})(Events || (Events = {}));
exports.Events = Events;
const CommandsLookup = {
    'notification': 'commandNotification',
    'commisioningNotification': 'commandCommisioningNotification',
    'on': 'commandOn',
    'offWithEffect': 'commandOffWithEffect',
    'step': 'commandStep',
    'stop': 'commandStop',
    'hueNotification': 'commandHueNotification',
    'off': 'commandOff',
    'stepColorTemp': 'commandStepColorTemp',
    'stepHue': 'commandStepHue',
    'stepSaturation': 'commandStepSaturation',
    'moveWithOnOff': 'commandMoveWithOnOff',
    'move': 'commandMove',
    'moveColorTemp': 'commandMoveColorTemp',
    'moveHue': 'commandMoveHue',
    'moveToSaturation': 'commandMoveToSaturation',
    'stopWithOnOff': 'commandStopWithOnOff',
    'moveToLevel': 'commandMoveToLevel',
    'moveToLevelWithOnOff': 'commandMoveToLevelWithOnOff',
    'toggle': 'commandToggle',
    'tradfriArrowSingle': 'commandTradfriArrowSingle',
    'tradfriArrowHold': 'commandTradfriArrowHold',
    'tradfriArrowRelease': 'commandTradfriArrowRelease',
    'stepWithOnOff': 'commandStepWithOnOff',
    'moveToColorTemp': 'commandMoveToColorTemp',
    'moveToColor': 'commandMoveToColor',
    'onWithTimedOff': 'commandOnWithTimedOff',
    'recall': 'commandRecall',
    'arm': 'commandArm',
    'panic': 'commandPanic',
    'emergency': 'commandEmergency',
    'operationEventNotification': 'commandOperationEventNotification',
    'statusChangeNotification': 'commandStatusChangeNotification',
    'colorLoopSet': 'commandColorLoopSet',
    'enhancedMoveToHueAndSaturation': 'commandEnhancedMoveToHueAndSaturation',
    'downClose': 'commandDownClose',
    'upOpen': 'commandUpOpen',
    'dataResponse': 'commandDataResponse',
    'dataReport': 'commandDataReport',
    'mcuVersionResponse': 'commandMcuVersionResponse',
    'getWeeklyScheduleRsp': 'commandGetWeeklyScheduleRsp',
    'queryNextImageRequest': 'commandQueryNextImageRequest',
    'alertsNotification': 'commandAlertsNotification',
    'programmingEventNotification': 'commandProgrammingEventNotification',
    'getPinCodeRsp': 'commandGetPinCodeRsp',
    'getUserStatusRsp': 'commandGetUserStatusRsp',
    'arrivalSensorNotify': 'commandArrivalSensorNotify',
    'getPanelStatus': 'commandGetPanelStatus',
    'checkin': 'commandCheckIn',
    'moveToHue': 'commandMoveToHue',
    'store': 'commandStore',
    'alarm': 'commandAlarm',
    'unlockDoorRsp': 'commandUnlockDoorRsp',
    // HEIMAN scenes cluster
    'atHome': 'commandAtHome',
    'goOut': 'commandGoOut',
    'cinema': 'commandCinema',
    'repast': 'commandRepast',
    'sleep': 'commandSleep',
    // HEIMAN IR remote cluster
    'studyKeyRsp': 'commandStudyKeyRsp',
    'createIdRsp': 'commandCreateIdRsp',
    'getIdAndKeyCodeListRsp': 'commandGetIdAndKeyCodeListRsp',
    'mcuGatewayConnectionStatus': 'commandMcuGatewayConnectionStatus',
    'mcuSyncTime': 'commandMcuSyncTime',
    'activeStatusReport': 'commandActiveStatusReport',
    'activeStatusReportAlt': 'commandActiveStatusReportAlt',
    // Wiser Smart HVAC Commmands
    'wiserSmartSetSetpoint': 'commandWiserSmartSetSetpoint',
    'wiserSmartCalibrateValve': 'commandWiserSmartCalibrateValve',
    // Dafoss Ally/Hive TRV Commands
    'danfossSetpointCommand': 'commandDanfossSetpointCommand',
    // Siglis zigfred Commands
    'siglisZigfredButtonEvent': 'commandSiglisZigfredButtonEvent',
    // Zosung IR remote cluster commands and responses
    'zosungSendIRCode01': 'commandZosungSendIRCode01',
    'zosungSendIRCode02': 'commandZosungSendIRCode02',
    'zosungSendIRCode04': 'commandZosungSendIRCode04',
    'zosungSendIRCode00': 'commandZosungSendIRCode00',
    'zosungSendIRCode03Resp': 'zosungSendIRCode03Resp',
    'zosungSendIRCode05Resp': 'zosungSendIRCode05Resp',
    // Schneider
    'schneiderWiserThermostatBoost': 'commandSchneiderWiserThermostatBoost',
    //alertmePowerUsage
    'powerDemandReport': 'commandNotification',
    'powerConsumptionReport': 'commandNotification',
    'powerMeterUpdate': 'commandNotification',
    //alertmeSwitchState
    'respSwitchStatus': 'commandNotification',
    //alertmeDeviceGeneral
    'FaultReport': 'commandNotification',
    'recvHeartbeat': 'commandNotification',
    'getRTC': 'commandNotification',
    'stdOut': 'commandNotification',
    //alertmeJoin
    'rangeTest': 'commandNotification',
    'respHello': 'commandNotification',
    //alertmeUpgrade
    'do1': 'commandNotification',
    'do2': 'commandNotification'
};
exports.CommandsLookup = CommandsLookup;
//# sourceMappingURL=events.js.map