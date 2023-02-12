import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {MyThemeContext} from "./index";
import GamePage from "./components/GamePage/GamePage";
import HomePage from "./components/HomePage/HomePage";
import {MantineProvider} from "@mantine/core";
import useWebSocket from "react-use-websocket";
import {ClientMessage, isServerSide, MessageType, ServerMessage} from "./types";

function App() {
    const [isInGame, setIsInGame] = useState(false);
    const themeContext = useContext(MyThemeContext);
    const [sessionID, setSessionID] = useState<number | null>(null)
    const [output, setOutput] = useState("Output")
    const [isHidden, setIsHidden] = useState(false)
    const [code, setCode] = useState("print('hello world!')");

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
            else if (message.type === MessageType.ChallengeResponse) {
                if (message.success) setOutput("Success!");
                else setOutput("Failed!");
            }
            else if (message.type === MessageType.Obstacle) {
                if (isServerSide(message.obstacle)) {
                    setIsHidden(true);
                    sendToServer({type: MessageType.HandleServerSideObstacle, obstacle: message.obstacle, code: code});
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
            <MantineProvider theme={{ colorScheme: themeContext as any}} withGlobalStyles withNormalizeCSS>
                {isInGame ? <GamePage
                    sendObstacle={(type) => {
                        sendToServer({type: MessageType.Obstacle, obstacle: type });
                    }}
                    submit={() => {
                        sendToServer({type: MessageType.Submit, challengeID: 0, code: code})
                    }}
                    isHidden={isHidden}
                    output={output}
                    sessionID={sessionID ? sessionID : -1}
                    code={code}
                    setCode={setCode}
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
