"use strict";
exports.__esModule = true;
exports.CodeRunner = void 0;
var child_process_1 = require("child_process");
var CodeRunner = /** @class */ (function () {
    function CodeRunner() {
        // Load in all the exampes
    }
    CodeRunner.prototype.runExample = function (exampleID, code) {
        var process = (0, child_process_1.exec)("python3 -c \"".concat(code, "\""));
        // console.log(code);
        process.stdout.on('data', function (msg) {
            console.log(msg);
        });
        return false;
    };
    return CodeRunner;
}());
exports.CodeRunner = CodeRunner;
