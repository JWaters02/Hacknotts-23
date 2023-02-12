import React, {FC, useState} from 'react';
import {Button, Menu, Flex} from "@mantine/core";
import styles from './ObstacleButton.module.css';
import {ObstacleType} from "../../types";

interface ObstacleButtonProps {
    text: string
    pointCost: number
    type: ObstacleType
    sendObstacle(type: ObstacleType): void
    timeout: number
}

const ObstacleButton: FC<ObstacleButtonProps> = (props) => {
    const [enabled, setBtnEnabled] = useState(true);

    return <div className={styles.ObstacleButton}>
        <Button disabled={!enabled} onClick={() => {
            props.sendObstacle(props.type);
            setBtnEnabled(false)
            setTimeout(() => {
                setBtnEnabled(true)
            }, props.timeout)
        }}>
            {props.text}
        </Button>
        <p>{props.pointCost}</p>
    </div>;
}

export default ObstacleButton;
