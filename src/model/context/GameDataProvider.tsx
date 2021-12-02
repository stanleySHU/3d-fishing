import React, { ReactNode, useEffect, useReducer } from "react"
import { WebsocketService } from "../../services/websocket";
import { MessageModel } from "../socket/MessageModel";
import { BulletHitFishBroadCastModel } from "../socket/BulletHitFishBroadCastModel";
import { ChangeSeatBroadCastModel } from "../socket/ChangeSeatBroadCastModel";
import { FireBulletBroadCastModel } from "../socket/FireBulletBroadCastModel";
import { NewFishNoticeModel } from "../socket/NewFishNoticeModel";
import { createContext, useContextSelector } from 'use-context-selector';
import { initialState as initialState_fishPool, reducer as reducer_fishPool, InitialState as FishPoolInitialState, NewFishNoticeAction, NewFramesAction, NewStageAction } from "../store/FishPool";
import { initialState as initialState_playerInfos, reducer as reducer_playerInfos, InitialState as PlayerInfosInitialState, PlayerJoinTableAction } from '../store/PlayerInfos';
import { TableInfoModel, TableUpdateModel } from "../socket/TableUpdateModel";
import { PlayerJoinTableModel } from "../socket/PlayerJoinTableModel";
import { AppContext, IAppContextOptions } from "./AppProvider";

type IGameDataSourceProps = {
    children: ReactNode,
    tableUpdate: TableUpdateModel
}

export type IGameDataContext = {
    poolState: FishPoolInitialState,
    actorId: string,
    tableInfo: TableInfoModel,
    playerState: PlayerInfosInitialState
} & IAppContextOptions;

export const GameDataSourceContext = createContext<IGameDataContext>({} as any);

export const GameDataSourceProvider = (props: IGameDataSourceProps) => {
    const { tableUpdate } = props;
    const [poolState, poolDispath] = useReducer(reducer_fishPool, initialState_fishPool);
    const [playerState, playerDispatch] = useReducer(reducer_playerInfos, Object.assign(initialState_playerInfos, (() => {
        const userIdMap = {};
        for (let position in tableUpdate.seatedPlayersMap) {
            let info = tableUpdate.seatedPlayersMap[position];
            userIdMap[info.userId] = info;
        }

        return {
            playerInfoUserIdMap: userIdMap,
            playerInfoPositionMap: tableUpdate.seatedPlayersMap
        } as PlayerInfosInitialState
    })()));
    const appContext = useContextSelector(AppContext, (e) => {
        return e;
    });

    const websocket = WebsocketService();
    const agent = {
        handlePlayerJoinTable: (model: MessageModel<PlayerJoinTableModel>) => {
            const content = model.messageContent;
            playerDispatch(PlayerJoinTableAction(content));  
        },
        handleNewFishNotice: (model: MessageModel<NewFishNoticeModel>) => {
            const content = model.messageContent;
            if (content.fs[0].fishGenId) {
                poolDispath(NewFishNoticeAction(content));
            } else {
                poolDispath(NewStageAction())
            }
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
    })

    useEffect(() => {
        const frameTimer = setInterval(() => {
            poolDispath(NewFramesAction());
        }, 1000 / 30);
        return () => {
            clearInterval(frameTimer);
        }
    }, []);

    return <GameDataSourceContext.Provider value={{
        poolState: poolState,
        actorId: tableUpdate.actorId,
        tableInfo: tableUpdate.tableInfo,
        playerState: playerState,
        ...appContext
    }}>
        {props.children}
    </GameDataSourceContext.Provider>;
}