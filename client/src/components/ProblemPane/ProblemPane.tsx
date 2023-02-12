import React, { FC } from 'react';
import styles from './ProblemPane.module.css';
import ProblemDescription from "../ProblemDescription/ProblemDescription";
import ProblemExamples, {TestState} from "../ProblemExamples/ProblemExamples";
import {Grid, Title} from "@mantine/core";

interface ProblemPaneProps {
    description: string,
    examples: string[]
}

interface ProblemPaneProps {
    description: string,
    examples: string[]

    states: TestState[]
    submitTest(id: number): void
}

const ProblemPane: FC<ProblemPaneProps> = (props) => (
  <div className={styles.ProblemPane}>
      <Title order={1}>Problem</Title>
      <ProblemDescription description={props.description}/>
      <ProblemExamples submitTest={props.submitTest} examples={props.examples} states={props.states}/>
  </div>
);

export default ProblemPane;
