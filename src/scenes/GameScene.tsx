import { Vector3, Camera } from '@babylonjs/core'
import { Scene, useScene } from 'react-babylonjs';
import { initialState, reducer, NewFishNoticeAction, NewFrames } from '../store/GameScene';
import React, { Suspense, useEffect, useReducer, useRef} from 'react';
import '@babylonjs/loaders/glTF';
import { Fish } from '../components/Fish';
import { WebsocketService } from '../services/websocket';
// import { GameDataSourceProvider } from '../model/data/GameDataProvider';
import { ISceneProps } from './BaseScene';
import { PlayerInfoModel } from '../model/socket/PlayerInfoModel';
import { useContextSelector } from 'use-context-selector';
import { AppContext } from '../model/data/AppProvider';
import { TableUpdateModel } from '../model/socket/TableUpdateModel';
import { MessageModel } from '../model/MessageModel';
import { NewFishNoticeModel } from '../model/socket/NewFishNoticeModel';
import { FireBulletBroadCastModel } from '../model/socket/FireBulletBroadCastModel';
import { BulletHitFishBroadCastModel } from '../model/socket/BulletHitFishBroadCastModel';
import { ChangeSeatBroadCastModel } from '../model/socket/ChangeSeatBroadCastModel';

type MyGameSceneProps = {
    user: PlayerInfoModel,
    tableUpdate: TableUpdateModel
}

const MyScene = React.memo((props: MyGameSceneProps) => {
    const [state, dispath] = useReducer(reducer, initialState);

    const websocket = WebsocketService();

    const agent = {
        handleNewFishNotice: (model: MessageModel<NewFishNoticeModel>) => {
            const content = model.messageContent;
            if (content.fs[0].fishGenId) {
                dispath(NewFishNoticeAction(content));
            } else {
                dispath(NewFrames())
            }
        },
        handleFireBulletBroadCast: (model: MessageModel<FireBulletBroadCastModel>) => {

        },
        handleBulletHitFishBroadCast: (model: MessageModel<BulletHitFishBroadCastModel>) => {

        },
        handleChangeSeatBroadCast: (model: MessageModel<ChangeSeatBroadCastModel>) => {

        }
    }

    useEffect(() => {
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, []);

    return <Scene>
        {/* <GameDataSourceProvider> */}
            <freeCamera name='camera' position={new Vector3(0, 27, 0)} rotation={new Vector3(Math.PI/2, 0, 0)} fov={Math.PI*(90/180)} maxZ={100}/>
            <directionalLight name='light' direction={new Vector3(0, -1, -1)} />
            <ground name='bg' width={352} height={198} position={new Vector3(0, -72, 0)} rotation={new Vector3(0, 0, 0)}>
                <standardMaterial name='bg'>
                    <texture url='/assets/img/TableBg.png' />
                </standardMaterial>
            </ground>
            <transformNode name="pool">
                <Suspense fallback={null}>
                {
                    state.fishs.map((model) => {
                        let name = `FISH${model.id}`;
                        return <Fish key={name} name={name} fishType={model.type} position={new Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100)} />;
                    })
                }
                </Suspense>
            </transformNode>
        {/* </GameDataSourceProvider> */}
    </Scene>
}, () => true);

type IGameSceneProps = ISceneProps & {
    actorId?: string
}

export const GameScene = (props: IGameSceneProps) => {
    const { actorId } = props;
    const [user, tableUpdateMap] = useContextSelector(AppContext, e => {
        return [e.user, e.tableUpdateMap];
    });

    return <MyScene user={user} tableUpdate={tableUpdateMap[actorId]}></MyScene>;
}


