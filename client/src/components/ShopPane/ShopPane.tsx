import React, { FC } from 'react';
import styles from './ShopPane.module.css';
import {Grid, MantineProvider, Title} from "@mantine/core";
import ObstacleList from "../ObstacleList/ObstacleList";
import {ObstacleType} from "../../types";

interface ShopPaneProps {
    sendObstacle(type: ObstacleType): void
}

const ShopPane: FC<ShopPaneProps> = (props) => (
    <div className={styles.ShopPane}>
        <Title order={1}>Shop</Title>
        <ObstacleList sendObstacle={props.sendObstacle}></ObstacleList>
    </div>
);

export default ShopPane;
