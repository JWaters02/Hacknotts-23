import React, { FC } from 'react';
import styles from './ShopPane.module.css';
import {Grid, MantineProvider} from "@mantine/core";
import ObstacleList from "../ObstacleList/ObstacleList";

interface ShopPaneProps {}

const ShopPane: FC<ShopPaneProps> = () => (
  <div className={styles.ShopPane}>
    ShopPane Component
  </div>
);

export default ShopPane;
