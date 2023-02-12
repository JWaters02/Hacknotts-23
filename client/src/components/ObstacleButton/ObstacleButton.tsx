import React, {FC, useState} from 'react';
import {Button, Menu} from "@mantine/core";
import styles from './ObstacleButton.module.css';
import {ObstacleType} from "../../types";

interface ObstacleButtonProps {
    enabled: boolean
    text: string
    pointCost: number
    type: ObstacleType
    sendObstacle(type: ObstacleType): void
}

const ObstacleButton: FC<ObstacleButtonProps> = (props) => {
    return <div className={styles.HomePage}>
        <Button disabled={!props.enabled} onClick={() => {
            props.sendObstacle(props.type);
        }}>
            {props.text}
        </Button>

    </div>;
}

export default ObstacleButton;
