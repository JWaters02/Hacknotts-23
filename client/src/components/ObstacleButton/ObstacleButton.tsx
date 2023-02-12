import React, {FC, useState} from 'react';
import {Button, Menu, Flex} from "@mantine/core";
import styles from './ObstacleButton.module.css';
import {ObstacleType} from "../../types";

interface ObstacleButtonProps {
    text: string
    pointCost: number
    type: ObstacleType
    sendObstacle(type: ObstacleType): void
    sendPointDeduction(type: number): void
    timeout: number
    totalPoints: number
}

const ObstacleButton: FC<ObstacleButtonProps> = (props) => {
    const [enabled, setBtnEnabled] = useState(true);

    return <div className={styles.ObstacleButton}>
        <Button disabled={!enabled} onClick={() => {
            if ((props.totalPoints - props.pointCost) >= 0) {
                props.sendPointDeduction(props.pointCost)
                props.sendObstacle(props.type);
                setBtnEnabled(false)
                setTimeout(() => {
                    setBtnEnabled(true)
                }, props.timeout)
            } else {

            }
        }}>
            {props.text}
        </Button>
        <p>{props.pointCost}</p>
    </div>;
}

export default ObstacleButton;
