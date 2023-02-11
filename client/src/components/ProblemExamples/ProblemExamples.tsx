import React, { FC } from 'react';
import styles from './ProblemExamples.module.css';
import {Button} from "@mantine/core";

interface ProblemExampleProps {
    input: string
}

const ProblemExample: FC<ProblemExampleProps> = (props) => {
    return <div className={styles.ProblemExample}>
        <p>{props.input}</p>
        <Button>Check</Button>
    </div>
}

interface ProblemExamplesProps {
    examples: string[]
}

const ProblemExamples: FC<ProblemExamplesProps> = (props) => (
  <div className={styles.ProblemExamples}>
      {props.examples.map(i => <ProblemExample input={i} key={i}/>)}
  </div>
);

export default ProblemExamples;
