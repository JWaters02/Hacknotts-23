"use strict";
exports.__esModule = true;
exports.Server = void 0;
var ws_1 = require("ws");
var express = require('express');
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Obstacle"] = 0] = "Obstacle";
    MessageType[MessageType["Submit"] = 1] = "Submit";
    MessageType[MessageType["Example"] = 2] = "Example";
})(MessageType || (MessageType = {}));
;
;
var Server = /** @class */ (function () {
    function Server(port) {
        this.socket = new ws_1.WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));
        this.socket.on('message', this.onClientMessage.bind(this));
        var app = express(); // The http server
        app.get('/createSession', this.onSessionCreate.bind(this));
        app.listen(port + 1, function () { console.log('Listening on port ' + port); });
    }
    // HTTP API Methods
    Server.prototype.onSessionCreate = function (req, res) {
        var sessionID = this.createSession();
    };
    // This function is called once the client joins a session(game)
    Server.prototype.onClientConnect = function (clientSocket) {
        console.log('New Client Connected!');
    };
    /*
        This function is called when the user sends a message to the server that contains
        either like a powerup or send an obstacle to the server. They could also be sending
        some code to be run by the server, or even asking for a new challenge or whatever.
        Essentially, any in-game communication between the server and the client will be
        handled inside this function.
    */
    Server.prototype.onClientMessage = function (clientSocket) {
    };
    Server.prototype.runExample = function (clientSocket) {
    };
    Server.prototype.sendObstacle = function (clientSocket) {
    };
    Server.prototype.submit = function (clientSocket) {
    };
    // Helper methods 
    Server.prototype.createSession = function () {
        return Math.floor(Math.random() * 1000);
    };
    return Server;
}());
exports.Server = Server;
