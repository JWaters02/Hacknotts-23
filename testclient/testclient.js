
const http = require('http');
const PORT = 8080;

function getRequest(path, callback) {
    http.get(`http://localhost:${PORT}/${path}`, res => {
        if (res.statusCode !== 200) {
            console.error(`Server returned HTTP ${res.statusCode} for path ${path}`);
            res.resume();
            return;
        }

        let data = '';
        res.on('data', chunk => {
            data += chunk;
        });
        res.on('close', () => {
            callback(JSON.parse(data));
        });
    });
}

getRequest('createSession', data => {
    console.log(`Hosted a session with id: ${data.id}, websocket URL is ${data.url}`);
    const webSocket = new WebSocket(data.url);
    webSocket.onmessage = event => {
        console.log(`Received message from server: ${event.data}`);
        webSocket.close();
    };

    getRequest(`connect?id=${data.id}`, data => {
        console.log(`Joined the session, websocket URL is ${data.url}`);
        const webSocket = new WebSocket(data.url);
        webSocket.onmessage = event => {
            console.log(`Player 2 received message from server: ${event.data}`);
            webSocket.close();
        };
    })
});
