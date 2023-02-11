import React, {useState} from 'react';
import './App.css';
import CodePane from "./components/CodePane/CodePane";
import GamePage from "./components/GamePage/GamePage";
import HomePage from "./components/HomePage/HomePage";

function App() {
    const [isInGame, setIsInGame] = useState(false);

    return (
        <div className="App">
            {isInGame ? <GamePage/> : <HomePage setIsInGame={setIsInGame}/>}
        </div>
    );
}



export default App;
