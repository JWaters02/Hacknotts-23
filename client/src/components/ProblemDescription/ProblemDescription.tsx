import React, { FC } from 'react';
import styles from './ProblemDescription.module.css';

const descriptions =
    [
        "Write a program to check if two strings are anagrams of each other.",
        "Write a program to sum of two numbers",
    "Write a program to check if a string is a palindrome.",
    "You've been charged £x.xx for a taxi ride, but you only have a £x note. What is the minimum number of coins the taxi driver can give you?",
        "5th problem description"
]

interface ProblemDescriptionProps {
    challengeID: number
}

const ProblemDescription: FC<ProblemDescriptionProps> = (props) => (
  <div className={styles.ProblemDescription}>
    <p>{descriptions[props.challengeID]}</p>
  </div>
);

export default ProblemDescription;
