import React, {FC} from 'react';
import styles from './CodePane.module.css';
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";

interface CodePaneProps {
    code: string
    setCode: (code: string) => void
}

const CodePane: FC<CodePaneProps> = (props) => {
    return <div className={styles.CodePane}>
        <Editor
            onValueChange={props.setCode}
            highlight={code => highlight(code, languages.python, "python")}
            value={props.code}
        />
    </div>
}

export default CodePane;
