import { WebSocket } from 'ws';

export enum MessageType {
    Obstacle,
    Submit,
    Example,
    CreateSession,
    JoinSession
};

interface ClientMessage {
    sessionID: number,
    type: MessageType,
    data: Object
};

export class Server {
    private socket: WebSocket; // The main server websocket

    constructor(port: number) {
        this.socket = new WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));
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

        switch(json.type) {
            case MessageType.Obstacle:

                break;
            case MessageType.Submit:

                break;
            case MessageType.Example:

                break;
            case MessageType.CreateSession:

                break;
            case MessageType.JoinSession:

                break;
        }
    }

    private runExample(clientSocket: WebSocket) {

    }

    private sendObstacle(clientSocket: WebSocket) {

    }

    private submit(clientSocket: WebSocket) {

    }

    private joinSession(clientSocket: WebSocket) {
        
    }

}
