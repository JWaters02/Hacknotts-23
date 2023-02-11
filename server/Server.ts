import { WebSocket } from 'ws';

export enum MessageType {
    Obstacle,
    Submit,
    Example,
    CreateSession,
    JoinSession
};

export enum ObstacleType {
    FontChange,
    VariableRename,
    OneLiner
}

type ClientMessage = {
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

export class Server {
    private socket: WebSocket; // The main server websocket
    private events: Array<Number>;

    constructor(port: number) {
        this.socket = new WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));
        this.events[MessageType.Obstacle] = this.sendObstacle.bind(this);
        this.events[MessageType.Submit] = this.submit.bind(this);
        this.events[MessageType.Example] = this.runExample.bind(this);
        this.events[MessageType.CreateSession] = this.createSession.bind(this);
        this.events[MessageType.JoinSession] = this.joinSession.bind(this);
    }

    // This function is called once the client joins a session(game)
    private onClientConnect(clientSocket: WebSocket) {
        console.log('New Client Connected!');
        clientSocket.on('message', (message: string) => {
            this.onClientMessage(clientSocket, message);
        });
    }

    /*
        This function is called when the user sends a message to the server that contains
        either like a powerup or send an obstacle to the server. They could also be sending
        some code to be run by the server, or even asking for a new challenge or whatever.
        Essentially, any in-game communication between the server and the client will be
        handled inside this function.
    */
    private onClientMessage(clientSocket: WebSocket, message: string) {
        const json: ClientMessage = JSON.parse(message);
        // this.events[json.type](clientSocket, message);
    }

    private runExample(clientSocket: WebSocket) {

    }

    private sendObstacle(clientSocket: WebSocket) {

    }

    private submit(clientSocket: WebSocket, message) {

    }

    private createSession(clientSocket: WebSocket) {
        
    }

    private joinSession(clientSocket: WebSocket) {
        
    }

}
