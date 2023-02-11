import {ObstacleType} from "./types";
import {Python3Parser} from 'dt-python-parser'

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
    const parser = new Python3Parser();
    const tokens = parser.getAllTokens();
    console.log(tokens);
    return code;
}
