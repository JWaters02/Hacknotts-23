"use strict";
exports.__esModule = true;
exports.ObstacleType = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Obstacle"] = 0] = "Obstacle";
    MessageType[MessageType["Submit"] = 1] = "Submit";
    MessageType[MessageType["Challenge"] = 2] = "Challenge";
    MessageType[MessageType["CreateSession"] = 3] = "CreateSession";
    MessageType[MessageType["JoinSession"] = 4] = "JoinSession";
    MessageType[MessageType["HandleServerSideObstacle"] = 5] = "HandleServerSideObstacle";
    MessageType[MessageType["ChallengeResponse"] = 6] = "ChallengeResponse";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var ObstacleType;
(function (ObstacleType) {
    ObstacleType[ObstacleType["FontChange"] = 0] = "FontChange";
    ObstacleType[ObstacleType["VariableRename"] = 1] = "VariableRename";
    ObstacleType[ObstacleType["OneLiner"] = 2] = "OneLiner";
})(ObstacleType = exports.ObstacleType || (exports.ObstacleType = {}));
;
