import { exec } from 'child_process';
import { Challenge, ClientMessage, MessageType, ServerMessage } from './types'
import { WebSocket } from 'ws';


export class CodeRunner {
    private challenges: Array<Challenge> = [];

    constructor() {
        // Load in all the exampes
        this.challenges.push({
            tests: [`
r = add(2, 4)
if(r == 6):
    print('TRUE')
else:
    print('FALSE')
            `]
        });
    }

    public runTest(clientSocket: WebSocket, message: ClientMessage) {
        if(message.type != MessageType.Challenge) return;
        let code = message.code;
        code += '\n\n\n\n';
        code += this.challenges[message.challengeID].tests[message.testID];
        let isProcessAlive = false;
        const prcs = exec(`python3 -c "${code}"`)
        prcs.on('spawn', () => {
            isProcessAlive = true;
        });
        setTimeout(() => {
            if(isProcessAlive){
                isProcessAlive = false;
                prcs.kill('SIGINT');
                console.log('Killed process because it took too long');
                clientSocket.send(JSON.stringify({
                    type: MessageType.Response,
                    success: false
                }));
            }
        }, 5000);
        const outputs: Array<string> = [];
        prcs.stdout.on('data', msg => {
            outputs.push(msg);
        });
        prcs.on('exit', () => {
            isProcessAlive = false;
            if(outputs[outputs.length-1] == 'TRUE\n'){
                clientSocket.send(JSON.stringify({
                    type: MessageType.Response,
                    success: true
                }));
                console.log('program works!');
            }else{
                clientSocket.send(JSON.stringify({
                    type: MessageType.Response,
                    success: false
                }));
                console.log('program does not work :(');
            }
        });
    }
}