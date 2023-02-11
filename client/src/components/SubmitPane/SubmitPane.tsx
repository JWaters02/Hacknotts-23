import React, { FC } from 'react';
import styles from './SubmitPane.module.css';
import { Button, Flex } from "@mantine/core";

interface SubmitPaneProps {
    output: string
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
        <Button>Submit Code</Button>
        <p>{props.output}</p>
    </Flex>
  </div>
);

export default SubmitPane;
