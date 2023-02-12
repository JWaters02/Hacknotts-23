import React, {useEffect, useState} from 'react';
import './App.css';
import GamePage from "./components/GamePage/GamePage";
import HomePage from "./components/HomePage/HomePage";
import {MantineProvider} from "@mantine/core";
import useWebSocket from "react-use-websocket";
import {ClientMessage, isServerSide, MessageType, ObstacleType, ServerMessage} from "./types";
import {TestState} from "./components/ProblemExamples/ProblemExamples";

function App() {
    const [isInGame, setIsInGame] = useState(false);
    const [sessionID, setSessionID] = useState<number | null>(null)
    const [output, setOutput] = useState("Output")
    const [isHidden, setIsHidden] = useState(false)
    const [cursive, setCursive] = useState(false)
    const [code, setCode] = useState("print('hello world!')");
    const [testStates, setTestStates] = useState<TestState[]>(["unknown", "unknown"]);
    const [theme, setTheme] = useState("dark");
    const [challengeID, setChallengeID] = useState(0);
    const [points, setPoints] = useState(10);

    const { sendMessage, lastMessage } = useWebSocket("ws://localhost:8080");

    function sendToServer(message: ClientMessage) {
        console.log(message);
        sendMessage(JSON.stringify(message))
    }

    useEffect(() => {
        if (lastMessage !== null) {
            const message: ServerMessage = JSON.parse(lastMessage.data);
            console.log(message);
            if (message.type === MessageType.CreateSession) {
                setTimeout(() => {
                    setSessionID(message.sessionID);
                    setIsInGame(true);
                }, 200);
            }
            else if (message.type === MessageType.SubmitResponse) {
                if (message.success) setOutput("Success!");
                else setOutput("Failed!");
                setChallengeID(prev => prev + 1);
            }
            else if (message.type === MessageType.ChallengeResponse) {
                const result: TestState = message.success ? "success" : "fail";
                console.log("test back")
                setTestStates(prev => prev.map((state, i) => message.testID === i ? result : state));
            }
            else if (message.type === MessageType.Obstacle) {
                if (isServerSide(message.obstacle)) {
                    setIsHidden(true);
                    sendToServer({type: MessageType.HandleServerSideObstacle, obstacle: message.obstacle, code: code});
                } else {
                    // do some client effects
                    if (message.obstacle === ObstacleType.ThemeChange) {
                        setTheme("light")
                        setTimeout(() => {
                            setTheme("dark")
                        }, 15000);
                    } else if (message.obstacle == ObstacleType.FontChange) {
                        setCursive(true);
                        setTimeout(() => {
                            setCursive(false);
                        }, 60000);
                    }
                }
            }
            else if (message.type === MessageType.HandleServerSideObstacle) {
                setCode(message.code);
                setIsHidden(false);
            }
            else if (message.type === MessageType.Response) {
                setSessionID(message.sessionID)
                setIsInGame(true);
            }
        }
    }, [lastMessage, sendMessage]);

    return (
        <div className="App">
            <MantineProvider theme={{ colorScheme: theme as any}} withGlobalStyles withNormalizeCSS>
                {isInGame ? <GamePage
                    totalPoints={10}
                    sendObstacle={(type) => {
                        sendToServer({type: MessageType.Obstacle, obstacle: type });
                    }}
                    submit={() => {
                        sendToServer({type: MessageType.Submit, challengeID: challengeID, code: code})
                    }}
                    isHidden={isHidden}
                    cursive={cursive}
                    output={output}
                    sessionID={sessionID ? sessionID : -1}
                    code={code}
                    setCode={setCode}
                    states={testStates}
                    submitTest={(id) => {
                        sendToServer({type: MessageType.Challenge, challengeID: 1, testID: id, code: code})
                    }}
                    points={points}
                    setPoints={setPoints}
                /> :
                <HomePage
                    createRoom={
                        () => {
                            sendToServer({
                                type: MessageType.CreateSession,
                            });
                        }}
                    joinRoom={
                        (id) => {
                            sendToServer({
                                type: MessageType.JoinSession,
                                sessionID: id
                            });
                        }
                    }
                />}
            </MantineProvider>
        </div>
    );
}



export default App;
