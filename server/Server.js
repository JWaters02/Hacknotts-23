"use strict";
exports.__esModule = true;
exports.Server = void 0;
var ws_1 = require("ws");
var types_1 = require("./types");
var SessionInstance = /** @class */ (function () {
    function SessionInstance(client1, client2) {
        this.client1 = client1;
        this.client2 = client2;
    }
    return SessionInstance;
}());
var Server = /** @class */ (function () {
    function Server(port) {
        this.pendingSessions = new Map();
        this.sessions = new Map();
        this.events = [];
        this.socket = new ws_1.WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));
        this.events[types_1.MessageType.Obstacle] = this.sendObstacle.bind(this);
        this.events[types_1.MessageType.Submit] = this.submit.bind(this);
        this.events[types_1.MessageType.Example] = this.runExample.bind(this);
        this.events[types_1.MessageType.CreateSession] = this.createSession.bind(this);
        this.events[types_1.MessageType.JoinSession] = this.joinSession.bind(this);
    }
    // This function is called once the client joins a session(game)
    Server.prototype.onClientConnect = function (clientSocket) {
        var _this = this;
        console.log('New Client Connected!');
        clientSocket.on('message', function (message) {
            _this.onClientMessage(clientSocket, message);
        });
        clientSocket.on('close', function () {
            var session = _this.sessions.get(clientSocket);
            if (session !== undefined) {
                var opponent = session.client1 === clientSocket ? session.client2 : session.client1;
                _this.sessions["delete"](clientSocket);
                _this.sessions["delete"](opponent);
                opponent.close();
            }
            else {
                var sessionID_1 = null;
                _this.pendingSessions.forEach(function (value, key) {
                    if (value === clientSocket) {
                        sessionID_1 = key;
                    }
                });
                if (sessionID_1 !== null) {
                    _this.pendingSessions["delete"](sessionID_1);
                }
            }
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
        var sessionID = Math.floor(1000 * Math.random());
        this.pendingSessions.set(sessionID, clientSocket);
        clientSocket.send(JSON.stringify({ type: types_1.MessageType.CreateSession, sessionID: sessionID }));
    };
    Server.prototype.joinSession = function (clientSocket, json) {
        if (json.type !== types_1.MessageType.JoinSession) {
            return;
        }
        if (this.sessions.has(clientSocket)) {
            return;
        }
        var opponent = this.pendingSessions.get(json.sessionID);
        if (opponent === undefined) {
            return;
        }
        this.pendingSessions["delete"](json.sessionID);
        var instance = new SessionInstance(opponent, clientSocket);
        this.sessions.set(clientSocket, instance);
        this.sessions.set(opponent, instance);
    };
    return Server;
}());
exports.Server = Server;
