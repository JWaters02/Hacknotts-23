import React, {FC} from 'react';
import styles from './CodePane.module.css';
import Editor from "react-simple-code-editor";
import { Flex } from "@mantine/core";
import SubmitPane from "../SubmitPane/SubmitPane";
import {highlight, languages} from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";

interface CodePaneProps {
    code: string
    setCode: (code: string) => void
    output: string
    isHidden: boolean
    submit(): void
}

const CodePane: FC<CodePaneProps> = (props) => {
    return <div className={`${styles.CodePane} ${props.isHidden ? styles.HiddenCodePane : ""}`}>
       <Editor
           onValueChange={props.setCode}
           highlight={code => highlight(code, languages.python, "python")}
           value={props.code}
       />
        <SubmitPane submit={props.submit} output={props.output}></SubmitPane>
    </div>
}

export default CodePane;
