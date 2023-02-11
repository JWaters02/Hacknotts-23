"use strict";
exports.__esModule = true;
exports.CodeRunner = void 0;
var child_process_1 = require("child_process");
var types_1 = require("./types");
var CodeRunner = /** @class */ (function () {
    function CodeRunner() {
        this.challenges = [];
        // Load in all the exampes
        this.challenges.push({
            tests: ["\nr = add(2, 4)\nif(r == 6):\n    print('TRUE')\nelse:\n    print('FALSE')\n            "]
        });
    }
    CodeRunner.prototype.runTest = function (clientSocket, message) {
        if (message.type != types_1.MessageType.Challenge)
            return;
        var code = message.code;
        code += '\n\n\n\n';
        code += this.challenges[message.challengeID].tests[message.testID];
        var isProcessAlive = false;
        var prcs = (0, child_process_1.exec)("python3 -c \"".concat(code, "\""));
        prcs.on('spawn', function () {
            isProcessAlive = true;
        });
        setTimeout(function () {
            if (isProcessAlive) {
                isProcessAlive = false;
                prcs.kill('SIGINT');
                console.log('Killed process because it took too long');
                clientSocket.send(JSON.stringify({
                    type: types_1.MessageType.ChallengeResponse,
                    success: false
                }));
            }
        }, 5000);
        var outputs = [];
        prcs.stdout.on('data', function (msg) {
            outputs.push(msg);
        });
        prcs.on('exit', function () {
            isProcessAlive = false;
            if (outputs[outputs.length - 1] == 'TRUE\n') {
                clientSocket.send(JSON.stringify({
                    type: types_1.MessageType.ChallengeResponse,
                    success: true
                }));
                console.log('program works!');
            }
            else {
                clientSocket.send(JSON.stringify({
                    type: types_1.MessageType.ChallengeResponse,
                    success: false
                }));
                console.log('program does not work :(');
            }
        });
    };
    return CodeRunner;
}());
exports.CodeRunner = CodeRunner;
