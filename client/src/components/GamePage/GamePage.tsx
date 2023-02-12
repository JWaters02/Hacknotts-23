import React, {FC, useState} from 'react';
import styles from './GamePage.module.css';
import {Grid} from "@mantine/core";
import ProblemPane from "../ProblemPane/ProblemPane";
import CodePane from "../CodePane/CodePane";
import ShopPane from "../ShopPane/ShopPane";
import {ObstacleType} from "../../types";
import {TestState} from "../ProblemExamples/ProblemExamples";

interface GamePageProps {
    sessionID: number
    output: TestState
    sendObstacle(type: ObstacleType): void
    isHidden: boolean
    cursive: boolean
    code: string
    setCode(s: string): void
    submit(): void
    states: TestState[]
    submitTest(id: number): void
    challengeID: number
    points: number
    setPoints(v: number): void
}

const GamePage: FC<GamePageProps> = (props) => {
    return <div className={styles.GamePage}>
        <Grid>
            <Grid.Col span={4}><p>{props.sessionID}</p><ProblemPane submitTest={props.submitTest} states={props.states} challengeID={props.challengeID}/></Grid.Col>
            <Grid.Col span={4}><CodePane submit={props.submit} isHidden={props.isHidden} output={props.output} cursive={props.cursive} code={props.code} setCode={(code) => {
                // send to backend here

                // update internal state
                props.setCode(code);
            }}/></Grid.Col>
            <Grid.Col span={3}><ShopPane points={props.points} setPoints={props.setPoints} sendObstacle={props.sendObstacle}/></Grid.Col>
        </Grid>
    </div>
}

export default GamePage;
