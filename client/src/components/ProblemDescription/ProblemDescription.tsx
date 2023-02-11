import React, { FC } from 'react';
import styles from './ProblemDescription.module.css';

interface ProblemDescriptionProps {
    description: string
}

const ProblemDescription: FC<ProblemDescriptionProps> = (props) => (
  <div className={styles.ProblemDescription}>
    <p>{props.description}</p>
  </div>
);

export default ProblemDescription;
