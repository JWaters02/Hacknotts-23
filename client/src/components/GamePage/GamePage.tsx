import React, {FC, useState} from 'react';
import styles from './GamePage.module.css';
import {Grid} from "@mantine/core";
import ProblemPane from "../ProblemPane/ProblemPane";
import CodePane from "../CodePane/CodePane";
import ShopPane from "../ShopPane/ShopPane";

interface GamePageProps {}

const GamePage: FC<GamePageProps> = () => {
    const [code, setCode] = useState("print('hello world!')");
    return <div className={styles.GamePage}>
        <Grid>
            <Grid.Col span={4}><ProblemPane description={"write some code"} examples={["does it compile","does it work"]}/></Grid.Col>
            <Grid.Col span={4}><CodePane code={code} setCode={(code) => {
                // send to backend here

                // update internal state
                setCode(code);
            }}/></Grid.Col>
            <Grid.Col span={3}><ShopPane/></Grid.Col>
        </Grid>
    </div>
}

export default GamePage;
