"use strict";
exports.__esModule = true;
exports.Server = void 0;
var ws_1 = require("ws");
var express = require('express');
var Server = /** @class */ (function () {
    function Server(port) {
        this.socket = new ws_1.WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));
        var app = express(); // The http server
        app.get('/createSession', this.onSessionCreate.bind(this));
        app.listen(port + 1, function () { console.log('Listening on port ' + port); });
    }
    Server.prototype.onClientConnect = function (clientSocket) {
        console.log('New Client Connected!');
    };
    Server.prototype.onSessionCreate = function (req, res) {
        console.log(req);
        console.log(res);
    };
    return Server;
}());
exports.Server = Server;
