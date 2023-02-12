import React, { FC } from 'react';
import styles from './SubmitPane.module.css';
import { Button, Flex } from "@mantine/core";
import {TestState} from "../ProblemExamples/ProblemExamples";

interface SubmitPaneProps {
    output: TestState
    submit(): void
}

export function getColour(state: TestState) {
    switch (state) {
        case "unknown": return "blue"
        case "success": return "green"
        case "fail": return "red"
    }
}

const SubmitPane: FC<SubmitPaneProps> = (props) => (
  <div className={styles.SubmitPane}>
    <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="nowrap">
        <Button color={getColour(props.output)} onClick={props.submit}>Submit Code</Button>
    </Flex>
  </div>
);

export default SubmitPane;
