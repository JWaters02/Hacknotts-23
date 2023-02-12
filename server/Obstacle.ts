import {isServerSide, MAGIC_FUNCTION_NAME, ObstacleType} from "./types";
import {parser} from "@lezer/python"

export const isObstacleServerSided = isServerSide;

export function handleServerSideObstacle(obstacle: ObstacleType, code: string): string {
    switch (obstacle) {
        case ObstacleType.VariableRename:
            return renameVariables(code);
        case ObstacleType.ConstantsChange:
            return changeConstants(code);
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
    return code;
}

export function changeConstants(code: string): string {
    let anyConstantsFound = true;
    const constantsToChange = [];
    while (anyConstantsFound && constantsToChange.length === 0) {
        anyConstantsFound = false;
        parser.parse(code).iterate({
            enter: node => {
                if (node.type.name === 'Number') {
                    const image = code.slice(node.from, node.to);
                    anyConstantsFound = true;
                    if (Math.random() < 0.25) {
                        constantsToChange.push({from: node.from, to: node.to});
                    }
                }
            }
        });
    }

    for (let i = constantsToChange.length - 1; i >= 0; i--) {
        const image = code.slice(constantsToChange[i].from, constantsToChange[i].to);
        const possibleIndexes = [];
        // check for binary, octal and hex literals
        let base = 10;
        if (image.length > 2 && image.charAt(0) === '0') {
            const secondChar = image.charAt(1);
            if (secondChar === 'x' || secondChar === 'X') {
                base = 16;
            } else if (secondChar === 'o' || secondChar === 'O') {
                base = 8;
            } else if (secondChar === 'b' || secondChar === 'B') {
                base = 2;
            }
        }
        for (let j = base === 10 ? 0 : 2; j < image.length; j++) {
            if (image.charAt(j) >= '0' && image.charAt(j) <= '9') {
                possibleIndexes.push(j);
            } else if (base === 16 && ((image.charAt(j) >= 'a' && image.charAt(j) <= 'f') || (image.charAt(j) >= 'A' && image.charAt(j) <= 'F'))) {
                possibleIndexes.push(j);
            }
        }
        let randomCharacter = Math.floor(Math.random() * base);
        if (randomCharacter >= 10) {
            randomCharacter += 55;
        } else {
            randomCharacter += 48;
        }
        const indexToChange = possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];
        const newImage = image.slice(0, indexToChange) + String.fromCharCode(randomCharacter) + image.slice(indexToChange + 1);
        code = code.slice(0, constantsToChange[i].from) + newImage + code.slice(constantsToChange[i].to);
    }

    return code;
}

function arrayShuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
        const newIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[newIndex]] = [array[newIndex], array[index]];
    }

    return array;
}

function dumpAst(ast) {
    let indent = '';
    ast.iterate({
        enter: node => {
            console.log(indent + node.type.name);
            indent += '  ';
        },
        leave: () => {
            indent = indent.slice(2);
        }
    });
}
