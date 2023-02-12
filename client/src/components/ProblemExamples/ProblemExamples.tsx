import React, { FC } from 'react';
import styles from './ProblemExamples.module.css';
import {Button} from "@mantine/core";

export type TestState = "unknown" | "success" | "fail";

const examples = [
    ["'listen', 'silent'", "'banana', 'fanta'"],
    ["4, 5", "1, 1"],
    ["'hello'", "'hola'"],
    ["5.83, 10", "7.25, 10"]
]

interface ProblemExampleProps {
    input: string
    state: TestState
    submitTest(id: number): void
    id: number
}

const ProblemExample: FC<ProblemExampleProps> = (props) => {
    function getColour(state: TestState) {
        switch (state) {
            case "unknown": return "blue"
            case "success": return "green"
            case "fail": return "red"
        }
    }

    return <div className={styles.ProblemExample}>
        <p>{props.input}</p>
        <Button color={getColour(props.state)} onClick={() => props.submitTest(props.id)}>Check</Button>
    </div>
}

interface ProblemExamplesProps {
    states: TestState[]
    submitTest(id: number): void
    challengeID: number
}

const ProblemExamples: FC<ProblemExamplesProps> = (props) => (
  <div className={styles.ProblemExamples}>
      {examples[props.challengeID].map((example, i) => <ProblemExample input={example} key={example} id={i} state={props.states[i]} submitTest={props.submitTest}/>)}
  </div>
);

export default ProblemExamples;
