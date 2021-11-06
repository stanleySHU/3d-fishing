import { Vector3 } from '@babylonjs/core';
import React, { ReactNode, useEffect, useState } from 'react';
import { Scene } from 'react-babylonjs';
import { useContextSelector } from 'use-context-selector';
import { PreloadView } from '../components/PreloadView';
import { AssetsLoader } from '../resourceManager/AssetManager';
import { WebsocketService } from '../services/websocket';
import { Replace } from '../store/NavController';
import { ISceneProps } from './BaseScene';
import { NavContext } from './NavController';
import { ATLAS_AVATARS_IMG, ATLAS_AVATARS_IMG_URL, ATLAS_BG_IMG, ATLAS_BG_IMG_URL, ATLAS_COINS_DATA, ATLAS_COINS_DATA_URL, ATLAS_COINS_IMG, ATLAS_COINS_IMG_URL, ATLAS_COMPONENTS_DATA, ATLAS_COMPONENTS_DATA_URL, ATLAS_COMPONENTS_IMG, ATLAS_COMPONENTS_IMG_URL, ATLAS_FLAGS_DATA, ATLAS_FLAGS_DATA_URL, ATLAS_FLAGS_IMG, ATLAS_FLAGS_IMG_URL } from './assets';

type MyLoadingSceneProps = {
    next: string,
    children: ReactNode
}

const MyScene = React.memo((props: MyLoadingSceneProps) => {
    const { next, children } = props;
    const [loaded, setLoaded] = useState(false);
    const SceneManager = useContextSelector(NavContext, e => e.SceneManager);
 
    useEffect(() => {
        if (loaded && next) {
            SceneManager(Replace(next))
        }
    }, [next, loaded]); 

    function onFinish() {
        setLoaded(true);
    }

    function onLoadFail() {
        //pop up erro
    }

    return <Scene>
        <freeCamera name='camera' position={new Vector3(0, 700, 0)} target={new Vector3(0, 0, 0)} />
        <AssetsLoader onFinish={onFinish} onLoadFail={onLoadFail} PreloadView={PreloadView}>
            {children}
        </AssetsLoader>

    </Scene>
});

export const StartUpScene = (props: ISceneProps) => {
    const [next, setNext] = useState(null);

    const websocket = WebsocketService();
    const agents = {
        handlePlayerInfo: () => {
            setNext('lobby');
        }, handleNewPlayer: () => {
            setNext('newPlayerInit')
        }
    }

    useEffect(() => {
        let unRegister = websocket.register(agents);
        return () => {
            unRegister();
        }
    }, []);

    return <MyScene next={next}>
        <taskImg taskName={ATLAS_BG_IMG} url={ATLAS_BG_IMG_URL}/>

        <taskImg taskName={ATLAS_AVATARS_IMG} url={ATLAS_AVATARS_IMG_URL}/>

        <taskImg taskName={ATLAS_COINS_IMG} url={ATLAS_COINS_IMG_URL}/>
        <taskTextFile taskName={ATLAS_COINS_DATA} url={ATLAS_COINS_DATA_URL} cache={true}/>

        <taskImg taskName={ATLAS_FLAGS_IMG} url={ATLAS_FLAGS_IMG_URL}/>
        <taskTextFile taskName={ATLAS_FLAGS_DATA} url={ATLAS_FLAGS_DATA_URL} cache={true}/>

        <taskImg taskName={ATLAS_COMPONENTS_IMG} url={ATLAS_COMPONENTS_IMG_URL}/>
        <taskTextFile taskName={ATLAS_COMPONENTS_DATA} url={ATLAS_COMPONENTS_DATA_URL} cache={true}/>
    </MyScene>
}