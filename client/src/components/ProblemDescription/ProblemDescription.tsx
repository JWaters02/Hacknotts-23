import React, { FC } from 'react';
import styles from './ProblemDescription.module.css';

interface ProblemDescriptionProps {
    challengeID: number
}

const ProblemDescription: FC<ProblemDescriptionProps> = (props) => (
  <div className={styles.ProblemDescription}>
    <p>{descriptions[props.challengeID]}</p>
  </div>
);

export default ProblemDescription;
