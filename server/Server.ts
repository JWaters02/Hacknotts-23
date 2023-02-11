import { WebSocket } from 'ws';
const express = require('express')

export class Server {
    private socket: WebSocket; // The main server websocket

    constructor(port: number) {
        this.socket = new WebSocket.Server({
            port: "" + port
        });
        this.socket.on('connection', this.onClientConnect.bind(this));

        const app = express(); // The http server
        app.get('/createSession', this.onSessionCreate.bind(this));

        app.listen(port + 1, () => { console.log('Listening on port ' + port) });
    }

    private onClientConnect(clientSocket: WebSocket) {
        console.log('New Client Connected!');
    }

    private onSessionCreate(req: Object, res: Object) {
        console.log(req);
        console.log(res);
    }



}