import React, {FC, useEffect, useState} from 'react';
import styles from './HomePage.module.css';
import {Loader, NumberInput, TextInput} from "@mantine/core";

const SERVER_URL = "";

type LoadingState = "not" | "loading";

interface HomePageProps {
    createRoom(): void;
    joinRoom(id: number): void;
}

function onCreateButtonPress(setLoading: (loading: LoadingState) => void, createRoom: () => void) {
    setLoading("loading");

    createRoom();
}

const HomePage: FC<HomePageProps> = (props) => {
    const [loading, setLoading] = useState<LoadingState>("not");
    const [id, setID] = useState<number | undefined>(undefined);

    function onJoinPress() {
        if (id) {
            setLoading("loading");

            props.joinRoom(id);
        }
    }

    return <div className={styles.HomePage}>
        <button onClick={() => onCreateButtonPress(setLoading, props.createRoom)}>Create Room</button>
        <div></div>
        <NumberInput onChange={(id) => setID(id)}/>
        <button onClick={onJoinPress}>Join Room</button>
        {loading === "not" ? <div style={{height: "37.33px"}}></div> : <Loader variant={"bars"}/> }
    </div>;
}

export default HomePage;
