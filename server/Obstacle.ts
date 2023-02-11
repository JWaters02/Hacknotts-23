import {ObstacleType} from "./types";
import {parser} from "@lezer/python"

const SERVER_SIDED_OBSTACLES: Set<ObstacleType> = new Set();
SERVER_SIDED_OBSTACLES.add(ObstacleType.VariableRename);

export function isObstacleServerSided(obstacle: ObstacleType): boolean {
    return SERVER_SIDED_OBSTACLES.has(obstacle);
}

export function handleServerSideObstacle(obstacle: ObstacleType, code: string): string {
    switch (obstacle) {
        case ObstacleType.VariableRename:
            return renameVariables(code);
    }
    return code;
}

export function renameVariables(code: string): string {
    const varTokens = [];
    let indent = '  ';
    parser.parse(code).iterate({enter: node => {
        // console.log(indent + node.type.name);
        indent += '  ';
        if (node.type.name === 'VariableName' || node.type.name === 'PropertyName') {
            varTokens.push({from: node.from, to: node.to});
        }
    }, leave: node => {indent = indent.slice(2);}});
    const varNamesSet = new Set<string>();
    for (const token of varTokens) {
        varNamesSet.add(code.slice(token.from, token.to));
    }
    const varNames = [];
    varNamesSet.forEach(value => varNames.push(value));
    arrayShuffle(varNames);
    for (let i = varTokens.length - 1; i >= 0; i--) {
        code = code.slice(0, varTokens[i].from) + 'var' + (varNames.indexOf(code.slice(varTokens[i].from, varTokens[i].to)) + 1) + code.slice(varTokens[i].to);
    }
    console.log(code);
    return code;
}

function arrayShuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
        const newIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[newIndex]] = [array[newIndex], array[index]];
    }

    return array;
}
