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
      <Flex
          mih={20}
          gap="md"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap">
          <ObstacleButton
              text={"Rename Variables"}
              pointCost={10}
              type={ObstacleType.VariableRename}
              sendObstacle={props.sendObstacle}
              timeout={1000}/>
          <ObstacleButton
              text={"Change Font"}
              pointCost={2}
              type={ObstacleType.FontChange}
              sendObstacle={props.sendObstacle}
              timeout={1000}/>
          <ObstacleButton
              text={"Swap to Light Theme"}
              pointCost={5}
              type={ObstacleType.ThemeChange}
              sendObstacle={props.sendObstacle}
              timeout={1000}/>
          <ObstacleButton
              text={"Change to Py2"}
              pointCost={15}
              type={ObstacleType.InterpreterChange}
              sendObstacle={props.sendObstacle}
              timeout={1000}/>
          <ObstacleButton
              text={"Change Constants"}
              pointCost={7}
              type={ObstacleType.ConstantsChange}
              timeout={1000}
              sendObstacle={props.sendObstacle}/>
      </Flex>
  </div>
);



export default ObstacleList;
