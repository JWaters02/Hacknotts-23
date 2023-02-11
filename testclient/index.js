"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var types_1 = require("../server/types");
var PORT = 8080;
var ws = new ws_1.WebSocket("ws://localhost:".concat(PORT));
ws.onopen = function (event) {
    ws.send(JSON.stringify({ type: types_1.MessageType.CreateSession }));
};
ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    switch (data.type) {
        case types_1.MessageType.CreateSession:
            var id_1 = data.sessionID;
            console.log("Session id is ".concat(id_1));
            var ws2_1 = new ws_1.WebSocket("ws://localhost:".concat(PORT));
            ws2_1.onopen = function (event) {
                ws2_1.send(JSON.stringify({ type: types_1.MessageType.JoinSession, sessionID: id_1 }));
                console.log("Joined with a second client");
                var code = "\ndef sayHello():\n    print('Hello')\n    print('This is being printed from a python function')\n\nsayHello()\n";
                ws2_1.send(JSON.stringify({ type: types_1.MessageType.Example, code: code, exampleID: 0 }));
            };
            break;
    }
};
