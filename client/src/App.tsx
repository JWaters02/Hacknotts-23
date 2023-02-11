import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {MyThemeContext} from "./index";
import GamePage from "./components/GamePage/GamePage";
import HomePage from "./components/HomePage/HomePage";
import {MantineProvider} from "@mantine/core";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {MessageType, ServerMessage} from "./types";

function App() {
    const [isInGame, setIsInGame] = useState(false);
    const themeContext = useContext(MyThemeContext);
    const [sessionID, setSessionID] = useState<number | null>(null)

    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8080");

    useEffect(() => {
        if (lastMessage !== null) {
            const message: ServerMessage = JSON.parse(lastMessage.data);
            console.log(message);
            if (message.type === MessageType.CreateSession) {
                setIsInGame(true);
                setSessionID(message.sessionID);
            }
        }
    }, [lastMessage]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div className="App">
            <MantineProvider theme={{ colorScheme: themeContext as any}} withGlobalStyles withNormalizeCSS>
                {isInGame ? <GamePage sessionID={sessionID ? sessionID : -1}/> : <HomePage createRoom={() => {
                    console.log("sending");
                    sendMessage(JSON.stringify({type: MessageType.CreateSession}));
                }}/>}
            </MantineProvider>
        </div>
    );
}



export default App;
