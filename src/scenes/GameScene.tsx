import { Mesh, Vector3 } from '@babylonjs/core'
import { Scene, useAssetManager, useScene } from 'react-babylonjs'
import { ISceneProps } from './BaseScene'
import { initialState, reducer } from '../store/GameScene';
import { Suspense, useEffect, useReducer, useRef, useState } from 'react';
import '@babylonjs/loaders/glTF';
import { Fish } from '../components/Fish';
import { WebsocketService } from '../services/websocket';
import { GameDataSourceProvider } from '../model/data/GameDataProvider';

const tasks = [

];

export const GameScene = (props: ISceneProps) => {
    const [state, dispath] = useReducer(reducer, initialState);

    const websocket = WebsocketService();

    const agent = {
        handleNewFishNotice: () => {

        },
        handleFireBulletBroadCast: () => {

        },
        handleBulletHitFishBroadCast: () => {

        },
        handleChangeSeatBroadCast: () => {

        }
    }

    useEffect(() => {
        const unRegister = websocket.register(agent);

        return () => {
            unRegister();
        }
    }, []);


    return <Scene>
        <GameDataSourceProvider>
            <freeCamera name='camera' position={new Vector3(0, 770, 0)} target={new Vector3(0, 0, 0)} rotation={new Vector3(Math.PI / 2, 0, 0)} />
            <directionalLight name='light' direction={new Vector3(0, -1, 0)} />
            <ground name='bg' width={1920} height={1080} position={new Vector3(0, -500, 0)}>
                <standardMaterial name='bg'>
                    <texture url='/assets/img/lobby.png' />
                </standardMaterial>
            </ground>
            <Suspense fallback={null}>
                <Fish name='' id='cheqiyu' position={new Vector3(-100, 0, 100)} addRotation={new Vector3(1, Math.PI / 2, 1)} />
                <Fish name='' id='xiaolvyu' position={new Vector3(100, 400, 100)} />
                <Fish name='' id='xiaohuangyu' position={new Vector3(-100, 300, -100)} />
            </Suspense>
        </GameDataSourceProvider>
    </Scene>
}