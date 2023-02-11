import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from "react-simple-code-editor";
import {core} from 'prismjs/components'

function App() {
    const [code, setCode] = useState('print("hello wrlod');

    return (
    <div className="App">
        <Editor
          onValueChange={() => {}}
          highlight={code => {}}
          value={code}/>
    </div>
    );
}

export default App;
