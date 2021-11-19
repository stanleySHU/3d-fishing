import { Vector3 } from '@babylonjs/core'
import { Scene } from 'react-babylonjs';
import React, { useEffect } from 'react';
import '@babylonjs/loaders/glTF';
import { WebsocketService } from '../../services/websocket';
import { ISceneProps } from '../BaseScene';
import { useContextSelector } from 'use-context-selector';
import { AppContext } from '../../model/context/AppProvider';
import { GameDataSourceProvider } from '../../model/context/GameDataProvider';
import { FishingPool } from './FishPool';
import { PlayerLayers } from './PlayerLayers';
import { IMG_3D_BG_URL } from '../assets';

const MyScene = React.memo((props) => {
    const websocket = WebsocketService();

    const agent = {

    }

    useEffect(() => {
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, []);

    const [width, height, depth, cameraY, fieldOfView] = [96, 54, 72, 27, 1.57],
        multip = ((depth + cameraY) / cameraY),
        maxWidth = width * multip,
        maxHeight = height * multip;
    return <>
        <freeCamera name='camera' position={new Vector3(0, cameraY, 0)} rotation={new Vector3(1.57, 0, 0)} fov={fieldOfView} maxZ={100} />
        <directionalLight name='light' direction={new Vector3(0, -1, -1)} />
        <ground name='bg' width={maxWidth} height={maxHeight} position={new Vector3(0, -depth, 0)} rotation={new Vector3(0, 0, 0)}>
            <standardMaterial name='bg'>
                <texture url={IMG_3D_BG_URL} />
            </standardMaterial>
        </ground>
        <FishingPool/>
        <PlayerLayers/>
    </>
}, () => true);

type IGameSceneProps = ISceneProps & {
    actorId?: string
}

export const GameScene = (props: IGameSceneProps) => {
    const { actorId } = props;
    const [user, tableUpdateMap] = useContextSelector(AppContext, e => {
        return [e.user, e.tableUpdateMap];
    });
  
    // return useMemo(() => {
        return <Scene>
            <GameDataSourceProvider user={user} tableUpdate={tableUpdateMap[actorId]}>
                <MyScene/>;
            </GameDataSourceProvider>
        </Scene>
    // }, [true])
}