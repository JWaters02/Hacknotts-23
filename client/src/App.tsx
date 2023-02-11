import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from "react-simple-code-editor";
import {highlight, languages} from 'prismjs'

function App() {
    const [code, setCode] = useState('print("hello world")');

    return (
    <div className="App">
        <Editor
          onValueChange={setCode}
          highlight={code => highlight(code, languages.js, "js")}
          value={code}/>
    </div>
    );
}



export default App;
