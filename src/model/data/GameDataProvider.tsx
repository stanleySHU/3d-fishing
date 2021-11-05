import React, { ReactNode, useEffect } from "react"
import { WebsocketService } from "../../services/websocket";
import { MessageModel } from "../MessageModel";
import { BulletHitFishBroadCastModel } from "../socket/BulletHitFishBroadCastModel";
import { ChangeSeatBroadCastModel } from "../socket/ChangeSeatBroadCastModel";
import { FireBulletBroadCastModel } from "../socket/FireBulletBroadCastModel";
import { NewFishNoticeModel } from "../socket/NewFishNoticeModel";
import { createContext  } from 'use-context-selector';

type IGameDataSourceProps = {
    children: ReactNode
}

type IGameDataSourceContext = {

}

export const LobbyDataSourceContext = createContext<IGameDataSourceContext>({} as any);

export const GameDataSourceProvider = (props: IGameDataSourceProps) => {
    const websocket = WebsocketService();
    const agent = {
        handleNewFishNotice: (model: MessageModel<NewFishNoticeModel>) => {

        },
        handleFireBulletBroadCast: (model: MessageModel<FireBulletBroadCastModel>) => {

        },
        handleBulletHitFishBroadCast: (model: MessageModel<BulletHitFishBroadCastModel>) => {

        },
        handleChangeSeatBroadCast: (model: MessageModel<ChangeSeatBroadCastModel>) => {

        }
    };

    useEffect(() => {
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, []);
    return <LobbyDataSourceContext.Provider value={{}}>
        {props.children}
    </LobbyDataSourceContext.Provider>;
}