import React, {createContext, useContext, useState} from 'react';
import './App.css';
import {MyThemeContext} from "./index";
import CodePane from "./components/CodePane/CodePane";
import GamePage from "./components/GamePage/GamePage";
import HomePage from "./components/HomePage/HomePage";
import {MantineProvider} from "@mantine/core";

function App() {
    const [isInGame, setIsInGame] = useState(false);
    const themeContext = useContext(MyThemeContext);

    return (
        <div className="App">
            <MantineProvider theme={{ colorScheme: themeContext as any}} withGlobalStyles withNormalizeCSS>
                {isInGame ? <GamePage/> : <HomePage setIsInGame={setIsInGame}/>}
            </MantineProvider>
        </div>
    );
}



export default App;
