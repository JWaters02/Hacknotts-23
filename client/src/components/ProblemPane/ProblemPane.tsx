import React, { FC } from 'react';
import styles from './ProblemPane.module.css';
import ProblemDescription from "../ProblemDescription/ProblemDescription";
import ProblemExamples from "../ProblemExamples/ProblemExamples";

interface ProblemPaneProps {
    description: string,
    examples: string[]
}

const ProblemPane: FC<ProblemPaneProps> = (props) => (
  <div className={styles.ProblemPane}>
      <ProblemDescription description={props.description}/>
      <ProblemExamples examples={props.examples}/>
  </div>
);

export default ProblemPane;
