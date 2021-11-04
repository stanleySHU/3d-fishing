import { Vector3 } from '@babylonjs/core';
import { useContext, useEffect } from 'react';
import { Scene } from 'react-babylonjs';
import { WebsocketService } from '../services/websocket';
import { Replace } from '../store/NavController';
import { ISceneProps } from './BaseScene';
import { NavContext } from './NavController';

export const StartUpScene = (props: ISceneProps) => {
    const { SceneManager } = useContext(NavContext);
    const websocket = WebsocketService();
    const agents = {
        handlePlayerInfo: () => {
            SceneManager(Replace('lobby'))
        },
        handleNewPlayer: () => {
            console.log('handleNewPlayer');
        }
    }

    useEffect(() => {
        let unRegister = websocket.register(agents);
        return () => {
            unRegister();
        }
    }, []);
    
    return <Scene>
        <freeCamera name='camera' position={new Vector3(0, 700, 0)} target={new Vector3(0, 0, 0)} />
        <adtFullscreenUi name='' idealWidth={960} idealHeight={540}>
            <babylon-image url='/assets/img/2d/bg.jpg' />
            <container>
                <babylon-image url='/assets/img/2d/loadingframe.png' width="433px" height="41px"/>
                <babylon-image url='/assets/img/2d/loadingfill.png' width="427px" height="26px"/>
            </container>
            <textBlock text="...."/>
        </adtFullscreenUi>
    </Scene>
}