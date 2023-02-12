import { exec } from 'child_process';
import { Challenge, ClientMessage, MessageType, ServerMessage } from './types'
import { WebSocket } from 'ws';
import { readdirSync, readFileSync } from 'fs';

const SUCCESS = 'cTABW0oLkyrgLjUagMK7nGvRt3JH724q';

export class CodeRunner {
    private challenges: Array<Challenge> = [];

    constructor() {
        // Load in all the exampes
        const getDirectories = source =>
            readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        const dirs = getDirectories('challenges');
        for(const d of dirs){
            const files = readdirSync('./challenges/' + d, {withFileTypes: true});
            this.challenges.push({
                tests:[]
            });
            for(const f of files){
                const pathToFile = './challenges/' + d + '/' + f.name;
                const file = readFileSync(pathToFile,{encoding:'utf8', flag:'r'});
                const lastChalIdx = this.challenges.length-1;
                this.challenges[lastChalIdx].tests.push(file);
            }
        }
    }

    public submit(clientSocket: WebSocket, message: ClientMessage) {
        if(message.type != MessageType.Submit) return;
        let code = 'nyYKXurD=0\n' + message.code;
        const tests = this.challenges[message.challengeID].tests;
        for(const test of tests){
            code += '\n\n\n\n';
            code += test;
        }
        code += '\n\n\n\n';
        code += 'if nyYKXurD == 5:\n';
        code += `    print('${SUCCESS}')\n`;
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
                    type: MessageType.SubmitResponse,
                    success: false,
                    output: stdout
                }));
            }
        }, 5000);
        let stdout = '';
        prcs.stdout.on('data', msg => {
            stdout = msg;
        });
        prcs.on('exit', () => {
            isProcessAlive = false;
            if(stdout.includes(SUCCESS)){
                clientSocket.send(JSON.stringify({
                    type: MessageType.SubmitResponse,
                    output: stdout.replace(SUCCESS, ''),
                    success: true
                }));
            }else{
                clientSocket.send(JSON.stringify({
                    type: MessageType.SubmitResponse,
                    output: stdout,
                    success: false
                }));
            }
        });
    }

    public runTest(clientSocket: WebSocket, message: ClientMessage) {
        if(message.type != MessageType.Challenge) return;
        let code = 'nyYKXurD=0\n' + message.code;
        code += '\n\n\n\n';
        code += this.challenges[message.challengeID].tests[message.testID];
        code += '\n\n\n\n';
        code += 'if nyYKXurD == 1:\n';
        code += `    print('${SUCCESS}')\n`;
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
                    type: MessageType.ChallengeResponse,
                    testID: message.testID,
                    output: stdout,
                    success: false
                }));
            }
        }, 5000);
        let stdout = '';
        prcs.stdout.on('data', msg => {
            stdout = msg;
        });
        prcs.on('exit', () => {
            isProcessAlive = false;
            if(stdout.includes(SUCCESS)){
                clientSocket.send(JSON.stringify({
                    type: MessageType.ChallengeResponse,
                    testID: message.testID,
                    success: true,
                    output: stdout.replace(SUCCESS, '')
                }));
            }else{
                clientSocket.send(JSON.stringify({
                    type: MessageType.ChallengeResponse,
                    testID: message.testID,
                    output: stdout,
                    success: false
                }));
            }
        });
    }
}

/* what its supposed to be
{
  type: 1,
  code: 'def solution(a, b):\n    return a + b',
  challengeID: 1
}
*/