import React, { FC } from 'react';
import styles from './ProblemPane.module.css';

interface ProblemPaneProps {}

const ProblemPane: FC<ProblemPaneProps> = () => (
  <div className={styles.ProblemPane}>
    ProblemPane Component
  </div>
);

export default ProblemPane;
