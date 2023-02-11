import WebSocket from 'ws';
import express from 'express';

export class Server {
    private socket: WebSocket; // The main server websocket

    constructor(port: number) {
        this.socket = new WebSocket.Server({port: '8080'});
        this.socket.on('connection', this.onClientConnect.bind(this));

        const app = express(); // The http server
        app.listen(port, () => { console.log('Listening on port ' + port) });

        app.get('/createSession', this.onSessionCreate.bind(this));
    }

    private onClientConnect(clientSocket: WebSocket) {
        console.log('New Client Connected!');
    }

    private onSessionCreate(req: Object, res: Object) {
        console.log(req);
        console.log(res);
    }



}