import React, {FC, useState} from 'react';
import {Button, Menu} from "@mantine/core";
import styles from './ObstacleButton.module.css';

interface ObstacleButtonProps {
    enabled: boolean
    text: string
    pointCost: number
}

const ObstacleButton: FC<ObstacleButtonProps> = (props) => {
    return <div className={styles.HomePage}>
        <Button disabled={!props.enabled}>
            {props.text}
        </Button>

    </div>;
}

export default ObstacleButton;
