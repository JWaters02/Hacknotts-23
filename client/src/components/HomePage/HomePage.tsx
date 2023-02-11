import React, {FC, useEffect, useState} from 'react';
import styles from './HomePage.module.css';

const SERVER_URL = "";

type LoadingState = "not" | "loading" | "loaded";

interface CreateRoomResponse {
    "id": number
}

interface HomePageProps {
    setIsInGame: (v: boolean) => void;
}

async function createRoom(): Promise<CreateRoomResponse> {
    // const res = await fetch(SERVER_URL);
    //
    // const json = await res.json();

    return new Promise((resolve) => setTimeout(() => {
        resolve({
            id: 0
        })
    }, 1000));
}

async function onCreateButtonPress(setLoading: (loading: LoadingState) => void) {
    setLoading("loading");

    const res = await createRoom();

    // do webhook magic ???

    setLoading("loaded");
}

const HomePage: FC<HomePageProps> = (props) => {
    const [loading, setLoading] = useState<LoadingState>("not");

    return <div className={styles.HomePage}>
        <button onClick={() => onCreateButtonPress(setLoading)}>Connect</button>
        <p>{loading}</p>
    </div>;
}

export default HomePage;
