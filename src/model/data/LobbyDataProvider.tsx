import React, { createContext, ReactNode, useEffect, useState } from "react"
import { WebsocketService } from "../../services/websocket";
import { MessageModel } from "../MessageModel";
import { FishGameFinishModel } from "../socket/FishGameFinishModel";
import { PlayerInfoModel } from "../socket/PlayerInfoModel";
import { TableJoinSuccessModel } from "../socket/TableJoinSuccessModel";
import { TableListOutModel } from "../socket/TableListOutModel";
import { TableUpdateModel } from "../socket/TableUpdateModel";

type ILobbyDataSourceProps = {
    children: ReactNode
}

type ILobbyDataSourceContext = {
    tableListMap: { [roomCategoryId: string]: TableListOutModel }
}

export const LobbyDataSourceContext = createContext<ILobbyDataSourceContext>({} as any);

export const LobbyDataSourceProvider = (props: ILobbyDataSourceProps) => {
    const [tableListMap, setTableListMap] = useState<{[key: string]: TableListOutModel}>({}); 

    const websocket = WebsocketService();
    const agent = {
        handlePlayerInfo: (model: MessageModel<PlayerInfoModel>) => {
            
        },
        handleTableListOut: (model: MessageModel<TableListOutModel>) => {
            let content = model.messageContent;            
            setTableListMap(() => {
                tableListMap[content.roomCategoryId] = content;
                return {...tableListMap};
            });
        },
        handleFishGameFinish: (model: MessageModel<FishGameFinishModel>) => {

        }
    }

    useEffect(() => {
        websocket.sender.joinP2PGame('FISH');
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, []);

    return <LobbyDataSourceContext.Provider value={{tableListMap: tableListMap}}>
        {props.children}
    </LobbyDataSourceContext.Provider>;
}