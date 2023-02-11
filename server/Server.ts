import { WebSocket } from 'ws';

enum MessageType {
    Obstacle,
    Submit,
    Example,
    CreateSession,
    JoinSession
};

interface ClientMessage {
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
        this.socket.on('message', this.onClientMessage.bind(this));
    }

    // This function is called once the client joins a session(game)
    private onClientConnect(clientSocket: WebSocket) {
        console.log('New Client Connected!');
    }
    
    private onSessionCreate() {
        const sessionID = this.createSession();
    }

    /*
        This function is called when the user sends a message to the server that contains
        either like a powerup or send an obstacle to the server. They could also be sending
        some code to be run by the server, or even asking for a new challenge or whatever.
        Essentially, any in-game communication between the server and the client will be
        handled inside this function.
    */
    private onClientMessage(clientSocket: WebSocket) {

    }

    private runExample(clientSocket: WebSocket) {

    }

    private sendObstacle(clientSocket: WebSocket) {

    }

    private submit(clientSocket: WebSocket) {

    }

    // Helper methods 
    private createSession() {
        return Math.floor(Math.random() * 1000);
    }

}
