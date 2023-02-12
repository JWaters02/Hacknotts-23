import {ObstacleType, isServerSide, MAGIC_FUNCTION_NAME} from "./types";
import {parser} from "@lezer/python"

export const isObstacleServerSided = isServerSide;

export function handleServerSideObstacle(obstacle: ObstacleType, code: string): string {
    switch (obstacle) {
        case ObstacleType.VariableRename:
            return renameVariables(code);
    }
    return code;
}

export function renameVariables(code: string): string {
    const varTokens = [];
    const varsToNotRename = new Set<string>();
    varsToNotRename.add(MAGIC_FUNCTION_NAME);
    varsToNotRename.add('print');
    parser.parse(code).iterate({enter: node => {
        if (node.type.name === 'VariableName' || node.type.name === 'PropertyName') {
            varTokens.push({from: node.from, to: node.to});
            if (node.node.parent.type.name === 'ImportStatement') {
                const isFromImport = node.node.parent.firstChild.type.name == 'from'
                if (!isFromImport) {
                    varsToNotRename.add(code.slice(node.from, node.to));
                } else {
                    for (let n = node.node.prevSibling; n !== null; n = n.prevSibling) {
                        if (n.type.name === 'import') {
                            break;
                        } else if (n.type.name === 'from') {
                            varsToNotRename.add(code.slice(node.from, node.to));
                            break;
                        }
                    }
                }
            }
        }
    }});
    const varNamesSet = new Set<string>();
    for (const token of varTokens) {
        varNamesSet.add(code.slice(token.from, token.to));
    }
    varsToNotRename.forEach(value => varNamesSet.delete(value));
    const varNames = [];
    varNamesSet.forEach(value => varNames.push(value));
    arrayShuffle(varNames);
    for (let i = varTokens.length - 1; i >= 0; i--) {
        const oldVarName = code.slice(varTokens[i].from, varTokens[i].to);
        if (!varsToNotRename.has(oldVarName)) {
            const newVarName = 'var' + (varNames.indexOf(oldVarName) + 1);
            code = code.slice(0, varTokens[i].from) + newVarName + code.slice(varTokens[i].to);
        }
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
