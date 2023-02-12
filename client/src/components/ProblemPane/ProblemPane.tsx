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
    states: TestState[]
    submitTest(id: number): void
    challengeID: number
}

const ProblemPane: FC<ProblemPaneProps> = (props) => (
  <div className={styles.ProblemPane}>
      <Title order={1}>Problem</Title>
      <ProblemDescription challengeID={props.challengeID}/>
      <ProblemExamples submitTest={props.submitTest} challengeID={props.challengeID} states={props.states}/>
  </div>
);

export default ProblemPane;
