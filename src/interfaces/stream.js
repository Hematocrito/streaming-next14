/* eslint-disable no-shadow */
export var PUBLIC_CHAT = 'public';
export var PRIVATE_CHAT = 'private';
export var GROUP_CHAT = 'group';
export var OFFLINE = 'offline';
export var MODEL_STREAM_CHANNEL = 'MODEL_STREAM_CHANNEL';
export var MODEL_STREAM_EVENT_NAME;
(function (MODEL_STREAM_EVENT_NAME) {
    MODEL_STREAM_EVENT_NAME["GROUP_START"] = "GROUP_START";
    MODEL_STREAM_EVENT_NAME["PRIVATE_ACCPET"] = "PRIVATE_ACCPET";
})(MODEL_STREAM_EVENT_NAME || (MODEL_STREAM_EVENT_NAME = {}));
export var BroadcastStatus;
(function (BroadcastStatus) {
    BroadcastStatus["FINISHED"] = "finished";
    BroadcastStatus["BROADCASTING"] = "broadcasting";
    BroadcastStatus["CREATED"] = "created";
})(BroadcastStatus || (BroadcastStatus = {}));
export var BroadcastType;
(function (BroadcastType) {
    BroadcastType["LiveStream"] = "liveStream";
    BroadcastType["IpCamera"] = "ipCamera";
    BroadcastType["StreamSource"] = "streamSource";
    BroadcastType["Vod"] = "Vod";
})(BroadcastType || (BroadcastType = {}));
export var HLS = 'hls';
export var WEBRTC = 'webrtc';
export var defaultStreamValue = {
    publish: true,
    publicStream: true,
    plannedStartDate: 0,
    plannedEndDate: 0,
    duration: 0,
    mp4Enabled: 0,
    webMEnabled: 0,
    expireDurationMS: 0,
    speed: 0,
    pendingPacketSize: 0,
    hlsViewerCount: 0,
    webRTCViewerCount: 0,
    rtmpViewerCount: 0,
    startTime: 0,
    receivedBytes: 0,
    bitrate: 900,
    absoluteStartTimeMs: 0,
    webRTCViewerLimit: -1,
    hlsViewerLimit: -1
};
