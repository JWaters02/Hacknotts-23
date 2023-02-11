import React, { FC } from 'react';
import styles from './CodePane.module.css';

interface CodePaneProps {}

const CodePane: FC<CodePaneProps> = () => (
  <div className={styles.CodePane}>
    CodePane Component
  </div>
);

export default CodePane;
