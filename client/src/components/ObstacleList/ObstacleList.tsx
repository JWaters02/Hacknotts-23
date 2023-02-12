import React, { FC } from 'react';
import styles from './ObstacleList.module.css';
import ObstacleButton from "../ObstacleButton/ObstacleButton";
import {ObstacleType} from "../../types";

interface ObstacleListProps {
    sendObstacle(type: ObstacleType): void
}

const ObstacleList: FC<ObstacleListProps> = (props) => (
  <div className={styles.ObstacleList}>
    <ObstacleButton
        enabled={true}
        text={"Rename Variables"}
        pointCost={10}
        type={ObstacleType.VariableRename}
        sendObstacle={props.sendObstacle}
    />
  </div>
);

export default ObstacleList;
