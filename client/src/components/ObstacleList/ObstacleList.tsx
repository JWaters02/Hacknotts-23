import React, { FC } from 'react';
import styles from './ObstacleList.module.css';
import ObstacleButton from "../ObstacleButton/ObstacleButton";

interface ObstacleListProps {}

const ObstacleList: FC<ObstacleListProps> = () => (
  <div className={styles.ObstacleList}>
    <ObstacleButton
        enabled={true}
        text={"Rename Variables"}
        pointCost={10}
    />
  </div>
);

export default ObstacleList;
