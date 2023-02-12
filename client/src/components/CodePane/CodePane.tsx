import React, {FC} from 'react';
import styles from './CodePane.module.css';
import Editor from "react-simple-code-editor";
import {Flex, Title} from "@mantine/core";
import SubmitPane from "../SubmitPane/SubmitPane";
import {highlight, languages} from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";

interface CodePaneProps {
    code: string
    setCode: (code: string) => void
    output: string
    isHidden: boolean
    cursive: boolean
    submit(): void
}

const CodePane: FC<CodePaneProps> = (props) => {
    return <div className={`${styles.CodePane} ${props.isHidden ? styles.HiddenCodePane : ""}`}>
        <Title order={1}>Code Editor</Title>
        <Editor
           onValueChange={props.setCode}
           highlight={code => highlight(code, languages.python, "python")}
           value={props.code}
           style={{
               fontFamily: props.cursive ? '"Comic Sans MS", "Comic Sans", cursive' : '"Fira Code", "Fira Mono", monospace',
               fontSize: 12
            }}
       />
        <SubmitPane submit={props.submit} output={props.output}></SubmitPane>
    </div>
}

export default CodePane;
