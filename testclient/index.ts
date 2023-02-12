import { readFileSync } from 'fs';
import { WebSocket } from 'ws';
import {MessageType, ObstacleType} from '../server/types';

const PORT = 8080

const pythonCode = readFileSync('test_code.py').toString();

const ws = new WebSocket(`ws://localhost:${PORT}`);
ws.onopen = event => {
    ws.send(JSON.stringify({type: MessageType.CreateSession}));
};
ws.onmessage = event => {
    const data = JSON.parse(event.data);
    switch (data.type) {
        case MessageType.CreateSession:
            const id = data.sessionID;
            console.log(`Session id is ${id}`)
            const ws2 = new WebSocket(`ws://localhost:${PORT}`);
            ws2.onopen = event => {
                ws2.send(JSON.stringify({type: MessageType.JoinSession, sessionID: id}));
                console.log(`Joined with a second client`);
                ws2.send(JSON.stringify({type: MessageType.HandleServerSideObstacle, obstacle: ObstacleType.ConstantsChange, code: pythonCode}))
const code = 'def solution(a, b):\n    return a + b';
                ws2.send(JSON.stringify({type: MessageType.Submit, code, challengeID: 1 }));
            };
            break;
    }
};
