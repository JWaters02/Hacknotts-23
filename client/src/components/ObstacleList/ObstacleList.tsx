import React, { FC } from 'react';
import styles from './ObstacleList.module.css';
import {Flex} from "@mantine/core";
import ObstacleButton from "../ObstacleButton/ObstacleButton";
import {ObstacleType} from "../../types";

interface ObstacleListProps {
    sendObstacle(type: ObstacleType): void
}

const ObstacleList: FC<ObstacleListProps> = (props) => (
  <div className={styles.ObstacleList}>
      <ObstacleButton
        text={"Rename Variables"}
        pointCost={10}
        type={ObstacleType.VariableRename}
        sendObstacle={props.sendObstacle}/>
      <ObstacleButton
          text={"Change Font"}
          pointCost={2}
          type={ObstacleType.FontChange}
          sendObstacle={props.sendObstacle}/>
      <ObstacleButton
          text={"Swap to Light Theme"}
          pointCost={5}
          type={ObstacleType.ThemeChange}
          sendObstacle={props.sendObstacle}/>
      <ObstacleButton
          text={"Change to Py2"}
          pointCost={15}
          type={ObstacleType.InterpreterChange}
          sendObstacle={props.sendObstacle}/>
      <ObstacleButton
          text={"Change Constants"}
          pointCost={7}
          type={ObstacleType.ConstantsChange}
          sendObstacle={props.sendObstacle}/>
  </div>
);



export default ObstacleList;
