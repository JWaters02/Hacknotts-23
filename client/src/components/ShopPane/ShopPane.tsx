import React, { FC } from 'react';
import styles from './ShopPane.module.css';
import {Grid, MantineProvider, Title} from "@mantine/core";
import ObstacleList from "../ObstacleList/ObstacleList";

interface ShopPaneProps {}

const ShopPane: FC<ShopPaneProps> = () => (
    <div className={styles.ShopPane}>
        <Title order={1}>Shop</Title>
        <ObstacleList></ObstacleList>
    </div>
);

export default ShopPane;
