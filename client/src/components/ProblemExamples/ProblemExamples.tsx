import React, { FC } from 'react';
import styles from './ProblemExamples.module.css';
import {Button} from "@mantine/core";

export type TestState = "unknown" | "success" | "fail";

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
    examples: string[]

    states: TestState[]
    submitTest(id: number): void
}

const ProblemExamples: FC<ProblemExamplesProps> = (props) => (
  <div className={styles.ProblemExamples}>
      {props.examples.map((example, i) => <ProblemExample input={example} key={example} id={i} state={props.states[i]} submitTest={props.submitTest}/>)}
  </div>
);

export default ProblemExamples;
