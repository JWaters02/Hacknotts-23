import React, {FC, useState} from 'react';
import styles from './ShopPane.module.css';
import {Grid, MantineProvider, Title} from "@mantine/core";
import ObstacleList from "../ObstacleList/ObstacleList";
import {ObstacleType} from "../../types";

interface ShopPaneProps {
    sendObstacle(type: ObstacleType): void
    points: number
    setPoints(v: number): void
}

const ShopPane: FC<ShopPaneProps> = (props) => {

    return <div className={styles.ShopPane}>
        <Title order={1}>Shop</Title>
        <ObstacleList totalPoints={props.points} sendObstacle={props.sendObstacle} sendPointDeduction={deduction => {
            props.setPoints(props.points - deduction);
        }}></ObstacleList>
        <p><strong>Total Points:</strong> {props.points}</p>
    </div>
}

export default ShopPane;
