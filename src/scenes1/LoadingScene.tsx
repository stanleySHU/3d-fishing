import { Container, Sprite } from "@inlet/react-pixi";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ISceneProps, ViewController } from "../scenes/BaseScene";
import { AssetManager, Task, SpineTask, RunTask, useAssetsManager } from '../loaders/pixi/AssetManager';
import { ATLAS_AVATARS, ATLAS_AVATARS_URL, ATLAS_COINS, ATLAS_COINS_URL, ATLAS_FLAGS, ATLAS_FLAGS_URL, ATLAS_COMPONENTS, ATLAS_COMPONENTS_URL, ATLAS_GAMES, ATLAS_GAMES_URL,
    ATLAS_BULLET, ATLAS_BULLET_URL,
    JSON_CANNON_LV0_URL, JSON_CANNON_LV1_URL, JSON_CANNON_LV2_URL, ATLAS_CANNON_LV0, ATLAS_CANNON_LV0_URL, ATLAS_CANNON_LV1, ATLAS_CANNON_LV1_URL, ATLAS_CANNON_LV2, ATLAS_CANNON_LV2_URL} from './assets';
import { PreloadView2D } from "../components/PreloadView";
import { useContextSelector } from "use-context-selector";
import { NavContext } from "../scenes/NavController";
import { Replace } from "../model/store/NavController";
import { WebsocketService } from '../services/websocket';

const MyScene = React.memo((props: ISceneProps) => {
    const { next, args } = props;
    const [loaded, setLoaded] = useState(false);
    const SceneManager = useContextSelector(NavContext, e => e.SceneManager);

    useEffect(() => {
        if (loaded && next) {
            SceneManager(Replace(next, args))
        }
    }, [next, loaded]);

    function onFinish() {
        setLoaded(true);
    }

    function onLoadFail() {
        //pop up erro
    }

    return <ViewController>
        <AssetManager PreloadView={PreloadView2D} onFinish={onFinish} onLoadFail={onLoadFail} retry={2}>
            {props.children}
        </AssetManager>
        {null}
    </ViewController>;
});


export const StartUpScene = (props: ISceneProps) => {
    const [next, setNext] = useState(null);

    const websocket = WebsocketService();
    const agent = {
        handlePlayerInfo: () => {
            setNext('lobby');
        }, 
        handleNewPlayer: () => {
            setNext('newPlayerInit')
        }
    }

    useEffect(() => {
        let unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    });

    return <MyScene {...props} next={next}>
        <Task name={ATLAS_AVATARS} src={ATLAS_AVATARS_URL} />
        <Task name={ATLAS_COINS} src={ATLAS_COINS_URL} />
        <Task name={ATLAS_FLAGS} src={ATLAS_FLAGS_URL} />
        <Task name={ATLAS_COMPONENTS} src={ATLAS_COMPONENTS_URL} />
        <RunTask />
    </MyScene>;
}

export const GamePreloadScene = (props: ISceneProps) => {
    const resourceMap = useAssetsManager();
    return <MyScene {...props} args={props.args}>
        <Task name={ATLAS_GAMES} src={ATLAS_GAMES_URL} />
        <Task name={ATLAS_BULLET} src={ATLAS_BULLET_URL} />

        <SpineTask name={ATLAS_CANNON_LV0} src={JSON_CANNON_LV0_URL} filePath={ATLAS_CANNON_LV0_URL} />
        <SpineTask name={ATLAS_CANNON_LV1} src={JSON_CANNON_LV1_URL} filePath={ATLAS_CANNON_LV1_URL} />
        <SpineTask name={ATLAS_CANNON_LV2} src={JSON_CANNON_LV2_URL} filePath={ATLAS_CANNON_LV2_URL} />
        <RunTask />
    </MyScene>;
}