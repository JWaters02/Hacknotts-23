import {TestState} from "./components/ProblemExamples/ProblemExamples";

export enum MessageType {
    Obstacle = 0,
    Submit = 1,
    Challenge = 2,
    CreateSession = 3,
    JoinSession = 4,
    HandleServerSideObstacle = 5,
    Response = 6,
    ChallengeResponse = 7,
    SubmitResponse = 8,
    EndGame = 9,
}

export enum ObstacleType {
    FontChange,
    VariableRename,
    ThemeChange,
    ConstantsChange,
    InterpreterChange,
}

export function isServerSide(type: ObstacleType) {
    switch (type) {
        case ObstacleType.VariableRename:
            return true;

        case ObstacleType.FontChange:
            return false;

        case ObstacleType.ThemeChange:
            return false;

        case ObstacleType.ConstantsChange:
            return true;

        case ObstacleType.InterpreterChange:
            return true;
    }
}

export type ClientMessage = {
    type: MessageType.CreateSession,
} | {
    type: MessageType.JoinSession,
    sessionID: number
} | {
    type: MessageType.Submit,
    challengeID: number,
    code: string
} | {
    type: MessageType.Challenge,
    testID: number,
    code: string,
    challengeID: number,
} | {
    type: MessageType.Obstacle,
    obstacle: ObstacleType
} | {
    type: MessageType.HandleServerSideObstacle,
    obstacle: ObstacleType,
    code: string
} | {
    type: MessageType.EndGame,
    won: boolean,
};

export type ServerMessage = {
    type: MessageType.CreateSession,
    sessionID: number
} | {
    type: MessageType.Response,
    success: boolean,
    sessionID: number
} | {
    type: MessageType.ChallengeResponse,
    output: string,
    testID: number,
    success: boolean
} | {
    type: MessageType.SubmitResponse,
    output: string,
    success: boolean
} | {
    type: MessageType.Obstacle,
    obstacle: ObstacleType
} | {
    type: MessageType.HandleServerSideObstacle,
    code: string
} | {
    type: MessageType.EndGame,
    won: boolean,
};

export interface Challenge {
    tests: Array<string>
};

export const MAGIC_FUNCTION_NAME = "solution";
