import React, {FC, useState} from 'react';
import styles from './GamePage.module.css';
import CodePane from "../CodePane/CodePane";

interface GamePageProps {}

const GamePage: FC<GamePageProps> = () => {
    const [code, setCode] = useState("print('hello world!')");
    return <div className={styles.GamePage}>
        <CodePane code={code} setCode={(code) => {
            // send to backend here

            // update internal state
            setCode(code);
        }}/>
    </div>
}

export default GamePage;
