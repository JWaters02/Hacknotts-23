export enum MessageType {
    Obstacle = 0,
    Submit = 1,
    Challenge = 2,
    CreateSession = 3,
    JoinSession = 4,
    HandleServerSideObstacle = 5,
    Response = 6,
}

export enum ObstacleType {
    FontChange,
    VariableRename,
    OneLiner
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
    code: ObstacleType
} | {
    type: MessageType.HandleServerSideObstacle,
    obstacle: ObstacleType,
    code: string
};

export type ServerMessage = {
    type: MessageType.CreateSession,
    sessionID: number
} | {
    type: MessageType.Response,
    success: boolean
};

export interface Challenge {
    tests: Array<string>
};
