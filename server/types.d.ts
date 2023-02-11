export enum MessageType {
    Obstacle = 0,
    Submit = 1,
    Example = 2,
    CreateSession = 3,
    JoinSession = 4
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
    sessionID: number,
    type: MessageType.Submit,
    code: string
} | {
    type: MessageType.Example,
    code: string,
    exampleID: number,
} | {
    sessionID: number,
    type: MessageType.Obstacle,
    code: ObstacleType
};