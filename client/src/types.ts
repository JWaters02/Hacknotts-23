export enum MessageType {
    Obstacle = 0,
    Submit = 1,
    Challenge = 2,
    CreateSession = 3,
    JoinSession = 4,
    HandleServerSideObstacle = 5,
    ChallengeResponse = 6,
}

export enum ObstacleType {
    FontChange,
    VariableRename
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
    type: MessageType.ChallengeResponse,
    success: boolean
} | {
    type: MessageType.Obstacle,
    code: ObstacleType
} | {
    type: MessageType.HandleServerSideObstacle,
    code: string
};

export interface Challenge {
    tests: Array<string>
}