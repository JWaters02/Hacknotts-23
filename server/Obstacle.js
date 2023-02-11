"use strict";
exports.__esModule = true;
exports.renameVariables = exports.handleServerSideObstacle = exports.isObstacleServerSided = void 0;
var types_1 = require("./types");
var python_1 = require("@lezer/python");
var SERVER_SIDED_OBSTACLES = new Set();
SERVER_SIDED_OBSTACLES.add(types_1.ObstacleType.VariableRename);
function isObstacleServerSided(obstacle) {
    return SERVER_SIDED_OBSTACLES.has(obstacle);
}
exports.isObstacleServerSided = isObstacleServerSided;
function handleServerSideObstacle(obstacle, code) {
    switch (obstacle) {
        case types_1.ObstacleType.VariableRename:
            return renameVariables(code);
    }
    return code;
}
exports.handleServerSideObstacle = handleServerSideObstacle;
function renameVariables(code) {
    var varTokens = [];
    python_1.parser.parse(code).iterate({ enter: function (node) {
            if (node.type.name === 'VariableName' || node.type.name === 'PropertyName') {
                varTokens.push({ from: node.from, to: node.to });
            }
        } });
    var varNamesSet = new Set();
    for (var _i = 0, varTokens_1 = varTokens; _i < varTokens_1.length; _i++) {
        var token = varTokens_1[_i];
        varNamesSet.add(code.slice(token.from, token.to));
    }
    var varNames = [];
    varNamesSet.forEach(function (value) { return varNames.push(value); });
    arrayShuffle(varNames);
    for (var i = varTokens.length - 1; i >= 0; i--) {
        code = code.slice(0, varTokens[i].from) + 'var' + (varNames.indexOf(code.slice(varTokens[i].from, varTokens[i].to)) + 1) + code.slice(varTokens[i].to);
    }
    console.log(code);
    return code;
}
exports.renameVariables = renameVariables;
function arrayShuffle(array) {
    var _a;
    for (var index = array.length - 1; index > 0; index--) {
        var newIndex = Math.floor(Math.random() * (index + 1));
        _a = [array[newIndex], array[index]], array[index] = _a[0], array[newIndex] = _a[1];
    }
    return array;
}
