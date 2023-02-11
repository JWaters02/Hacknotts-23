"use strict";
exports.__esModule = true;
exports.Server = exports.ObstacleType = exports.MessageType = void 0;
var ws_1 = require("ws");
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Obstacle"] = 0] = "Obstacle";
    MessageType[MessageType["Submit"] = 1] = "Submit";
    MessageType[MessageType["Example"] = 2] = "Example";
    MessageType[MessageType["CreateSession"] = 3] = "CreateSession";
    MessageType[MessageType["JoinSession"] = 4] = "JoinSession";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
;
var ObstacleType;
(function (ObstacleType) {
    ObstacleType[ObstacleType["FontChange"] = 0] = "FontChange";
    ObstacleType[ObstacleType["VariableRename"] = 1] = "VariableRename";
    ObstacleType[ObstacleType["OneLiner"] = 2] = "OneLiner";
})(ObstacleType = exports.ObstacleType || (exports.ObstacleType = {}));
var Server = /** @class */ (function () {
    function Server(port) {
        this.socket = new ws_1.WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));
        this.events[MessageType.Obstacle] = this.sendObstacle.bind(this);
        this.events[MessageType.Submit] = this.submit.bind(this);
        this.events[MessageType.Example] = this.runExample.bind(this);
        this.events[MessageType.CreateSession] = this.createSession.bind(this);
        this.events[MessageType.JoinSession] = this.joinSession.bind(this);
    }
    // This function is called once the client joins a session(game)
    Server.prototype.onClientConnect = function (clientSocket) {
        var _this = this;
        console.log('New Client Connected!');
        clientSocket.on('message', function (message) {
            _this.onClientMessage(clientSocket, message);
        });
    };
    /*
        This function is called when the user sends a message to the server that contains
        either like a powerup or send an obstacle to the server. They could also be sending
        some code to be run by the server, or even asking for a new challenge or whatever.
        Essentially, any in-game communication between the server and the client will be
        handled inside this function.
    */
    Server.prototype.onClientMessage = function (clientSocket, message) {
        var json = JSON.parse(message);
        this.events[json.type](clientSocket, message);
    };
    Server.prototype.runExample = function (clientSocket) {
    };
    Server.prototype.sendObstacle = function (clientSocket) {
    };
    Server.prototype.submit = function (clientSocket, message) {
    };
    Server.prototype.createSession = function (clientSocket) {
    };
    Server.prototype.joinSession = function (clientSocket) {
    };
    return Server;
}());
exports.Server = Server;
