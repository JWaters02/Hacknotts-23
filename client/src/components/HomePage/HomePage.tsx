import React, {FC, useEffect, useState} from 'react';
import styles from './HomePage.module.css';
import {Loader} from "@mantine/core";

const SERVER_URL = "";

type LoadingState = "not" | "loading";

interface CreateRoomResponse {
    "id": number
}

interface HomePageProps {
    createRoom(): void;
}

async function createRoom(): Promise<CreateRoomResponse> {
    // const res = await fetch(SERVER_URL);
    //
    // const json = await res.json();

    return new Promise((resolve) => setTimeout(() => {
        resolve({
            id: 0
        })
    }, 10));
}

function onCreateButtonPress(setLoading: (loading: LoadingState) => void, createRoom: () => void) {
    setLoading("loading");

    createRoom();
}

const HomePage: FC<HomePageProps> = (props) => {
    const [loading, setLoading] = useState<LoadingState>("not");

    return <div className={styles.HomePage}>
        <button onClick={() => onCreateButtonPress(setLoading, props.createRoom)}>Connect</button>
        {loading === "not" ? <div style={{height: "37.33px"}}></div> : <Loader variant={"bars"}/> }
    </div>;
}

export default HomePage;
