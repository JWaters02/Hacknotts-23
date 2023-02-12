import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {MyThemeContext} from "./index";
import GamePage from "./components/GamePage/GamePage";
import HomePage from "./components/HomePage/HomePage";
import {MantineProvider} from "@mantine/core";
import useWebSocket from "react-use-websocket";
import {MessageType, ObstacleType, ServerMessage} from "./types";

function App() {
    const [isInGame, setIsInGame] = useState(false);
    const themeContext = useContext(MyThemeContext);
    const [sessionID, setSessionID] = useState<number | null>(null)
    const [output, setOutput] = useState("Output")
    const [isHidden, setIsHidden] = useState(false)
    const [newCode, setNewCode] = useState<string | null>(null)
    const [newFont, setNewFont] = useState()

    const { sendMessage, lastMessage } = useWebSocket("ws://localhost:8080");

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
                if (message.success) setOutput("Success!")
                else setOutput("Failed!")
            }
            else if (message.type === MessageType.Obstacle) {
                setIsHidden(true)
                switch (message.obstacle) {
                    case ObstacleType.VariableRename:

                        break;
                    case ObstacleType.FontChange:

                        break;
                }
                setIsHidden(false)
            }
        }
    }, [lastMessage]);

    return (
        <div className="App">
            <MantineProvider theme={{ colorScheme: themeContext as any}} withGlobalStyles withNormalizeCSS>
                {isInGame ? <GamePage sendObstacle={(type) => {
                    sendMessage(JSON.stringify({type: MessageType.Obstacle, obstacle: type }))
                }} isHidden={isHidden} output={output} sessionID={sessionID ? sessionID : -1}/> : <HomePage createRoom={() => {
                    sendMessage(JSON.stringify({type: MessageType.CreateSession}));
                }}/>}
            </MantineProvider>
        </div>
    );
}



export default App;
