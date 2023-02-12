import {WebSocket} from 'ws';
import {ClientMessage, MessageType} from './types'
import {handleServerSideObstacle, isObstacleServerSided} from "./Obstacle";
import {CodeRunner} from './CodeRunner';

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
    private runner: CodeRunner = new CodeRunner();

    constructor(port: number) {
        this.socket = new WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));
        this.events[MessageType.Obstacle] = this.sendObstacle.bind(this);
        this.events[MessageType.Submit] = this.runner.submit.bind(this.runner);
        this.events[MessageType.Challenge] = this.runner.runTest.bind(this.runner);
        this.events[MessageType.CreateSession] = this.createSession.bind(this);
        this.events[MessageType.JoinSession] = this.joinSession.bind(this);
        this.events[MessageType.HandleServerSideObstacle] = this.handleServerSideObstacle.bind(this);
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
                const opponent = this.getOpponent(clientSocket);
                this.sessions.delete(clientSocket);
                this.sessions.delete(opponent);
                opponent.close();
            } else {
                let sessionID: number | null = null;
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
        this.events[json.type](clientSocket, json);
    }

    private sendObstacle(clientSocket: WebSocket, json: ClientMessage) {
        if (json.type !== MessageType.Obstacle) {
            return;
        }
        const opponent = this.getOpponent(clientSocket);
        if (opponent !== null) {
            opponent.send(JSON.stringify({type: MessageType.Obstacle, obstacle: json.obstacle}));
        }
    }

    private handleServerSideObstacle(clientSocket: WebSocket, json: ClientMessage) {
        if (json.type !== MessageType.HandleServerSideObstacle) {
            return;
        }
        if (!isObstacleServerSided(json.obstacle)) {
            return;
        }
        const newCode = handleServerSideObstacle(json.obstacle, json.code);
        clientSocket.send(JSON.stringify({type: MessageType.HandleServerSideObstacle, code: newCode}));
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
            clientSocket.send(JSON.stringify({
                type: MessageType.Response,
                success: false,
                sessionID: json.sessionID
            }));
            return;
        }
        const opponent = this.pendingSessions.get(json.sessionID);
        if (opponent === undefined) {
            clientSocket.send(JSON.stringify({
                type: MessageType.Response,
                success: false,
                sessionID: json.sessionID
            }));
            return;
        }
        this.pendingSessions.delete(json.sessionID);
        const instance = new SessionInstance(opponent, clientSocket);
        this.sessions.set(clientSocket, instance);
        this.sessions.set(opponent, instance);
        clientSocket.send(JSON.stringify({
            type: MessageType.Response,
            success: true,
            sessionID: json.sessionID
        }));
    }

    private getOpponent(clientSocket: WebSocket): WebSocket | null {
        const session = this.sessions.get(clientSocket);
        if (session === undefined) {
            return null;
        }
        return clientSocket === session.client1 ? session.client2 : session.client1;
    }

}
