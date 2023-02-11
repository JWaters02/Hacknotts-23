import { WebSocket } from 'ws';
const express = require('express')

enum MessageType {
    Obstacle,
    Submit,
    Example
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

        const app = express(); // The http server
        app.get('/createSession', this.onSessionCreate.bind(this));

        app.listen(port + 1, () => { console.log('Listening on port ' + port) });
    }

    // HTTP API Methods
    private onClientConnect(clientSocket: WebSocket) {
        console.log('New Client Connected!');
    }

    // This function is called initially, once the 
    private onSessionCreate(req: Object, res: Object) {
        console.log('Here, the session will be created');
        console.log(req);
        console.log(res);
    }

    /*
        This function is called when the user sends a message to the server that contains
        either like a powerup or send an obstacle to the server. They could also be sending
        some code to be run by the server, or even asking for a new challenge or whatever.
        Essentially, any in-game communication between the server and the client will be
        handled inside this function.
    */
    private onClientMessage(req: Object, res: Object) {

    }

    private runExample(req, res, clientSocket) {

    }

    private sendObstacle(req, res, clientSocket) {

    }

    private submit(req, res, clientSocket) {

    }

}
