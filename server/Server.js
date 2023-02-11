"use strict";
exports.__esModule = true;
exports.Server = void 0;
var ws_1 = require("ws");
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Obstacle"] = 0] = "Obstacle";
    MessageType[MessageType["Submit"] = 1] = "Submit";
    MessageType[MessageType["Example"] = 2] = "Example";
    MessageType[MessageType["CreateSession"] = 3] = "CreateSession";
    MessageType[MessageType["JoinSession"] = 4] = "JoinSession";
})(MessageType || (MessageType = {}));
;
;
var Server = /** @class */ (function () {
    function Server(port) {
        this.idCounter = 0;
        this.socket = new ws_1.WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));
    }
    // This function is called once the client joins a session(game)
    Server.prototype.onClientConnect = function (clientSocket) {
        console.log('New Client Connected!');
        clientSocket.on('message', this.onClientMessage.bind(this));
        clientSocket.send("" + this.idCounter++);
    };
    /*
        This function is called when the user sends a message to the server that contains
        either like a powerup or send an obstacle to the server. They could also be sending
        some code to be run by the server, or even asking for a new challenge or whatever.
        Essentially, any in-game communication between the server and the client will be
        handled inside this function.
    */
    Server.prototype.onClientMessage = function (message) {
        var json = JSON.parse(message);
        switch (json.type) {
            case MessageType.Obstacle:
                break;
            case MessageType.Submit:
                break;
            case MessageType.Example:
                break;
            case MessageType.CreateSession:
                break;
            case MessageType.JoinSession:
                break;
        }
    };
    Server.prototype.runExample = function (clientSocket) {
    };
    Server.prototype.sendObstacle = function (clientSocket) {
    };
    Server.prototype.submit = function (clientSocket) {
    };
    return Server;
}());
exports.Server = Server;
