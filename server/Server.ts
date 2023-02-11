import { WebSocket } from 'ws';
import { ClientMessage, MessageType } from './types'


class SessionInstance {
    client1: WebSocket;
    client2: WebSocket;

    constructor(client1: WebSocket, client2: WebSocket) {
        this.client1 = client1;
        this.client2 = client2;
    }

}

export class Server {
    private socket: WebSocket; // The main server websocket
    private pendingSessions: Map<number, WebSocket> = new Map();
    private sessions: Map<WebSocket, SessionInstance> = new Map();
    private events: Array<Function> = [];

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
        clientSocket.on('close', () => {
            const session = this.sessions.get(clientSocket);
            if (session !== undefined) {
                const opponent: WebSocket = session.client1 === clientSocket ? session.client2 : session.client1;
                this.sessions.delete(clientSocket);
                this.sessions.delete(opponent);
                opponent.close();
            } else {
                let sessionID = null;
                this.pendingSessions.forEach((value, key) => {
                    if (value === clientSocket) {
                        sessionID = key;
                    }
                });
                if (sessionID !== null) {
                    this.pendingSessions.delete(sessionID);
                }
            }
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
        this.events[json.type](clientSocket, message);
    }

    private runExample(clientSocket: WebSocket) {

    }

    private sendObstacle(clientSocket: WebSocket) {

    }

    private submit(clientSocket: WebSocket, message) {

    }

    private createSession(clientSocket: WebSocket) {
        const sessionID = Math.floor(1000 * Math.random());
        this.pendingSessions.set(sessionID, clientSocket);
        clientSocket.send(JSON.stringify({type: MessageType.CreateSession, sessionID}));
    }

    private joinSession(clientSocket: WebSocket, json: ClientMessage) {
        if (json.type !== MessageType.JoinSession) {
            return;
        }
        if (this.sessions.has(clientSocket)) {
            return;
        }
        const opponent = this.pendingSessions.get(json.sessionID);
        if (opponent === undefined) {
            return;
        }
        this.pendingSessions.delete(json.sessionID);
        const instance = new SessionInstance(opponent, clientSocket);
        this.sessions.set(clientSocket, instance);
        this.sessions.set(opponent, instance);
    }

}
