import { useEffect, useState } from "react";
import { WebsocketService } from "../../services/websocket";
import { CustomUserData, PlayerInfoModel } from "../socket/PlayerInfoModel";
import { createAppContext, IAppContextModel } from "../../units/appContext";
import { IConnectStatus } from "../../units/customType";
import { MessageModel } from "../socket/MessageModel";
import { TableUpdateModel } from "../socket/TableUpdateModel";
import { TableJoinSuccessModel } from "../socket/TableJoinSuccessModel";
import { createContext  } from 'use-context-selector';
import { TableListOutModel } from "../socket/TableListOutModel";
import { RoomListModel } from "../socket/RoomListModel";

export type IAppContextOptions = {
    user: PlayerInfoModel,
    context: IAppContextModel,
    connectStatus: IConnectStatus,
    tableListMap: { [roomCategoryId: string]: TableListOutModel },
    tableUpdateMap: { [actorId: string]: TableUpdateModel }
}

export const AppContext = createContext<IAppContextOptions>({} as any);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<PlayerInfoModel>(CustomUserData as any);
    const [connectStatus, setConnectStatus] = useState<IConnectStatus>('connecting');
    const [tableListMap, setTableListMap] = useState<{[key: string]: TableListOutModel}>({}); 
    const [tableUpdateMap, setTableUpdateMap] = useState<{ [actorId: string]: TableUpdateModel }>({});

    const websocket = WebsocketService();
    const agent = {
        onConnected: () => {

        },
        onDisconnected: () => {

        },
        onConnectError: () => {

        },
        handlePlayerInfo: (model: MessageModel<PlayerInfoModel>) => {
            setUser(model.messageContent);
        },
        handleRoomList: (model: MessageModel<RoomListModel>) => {
            let content = model.messageContent;
            for (let item of content) {
                websocket.sender.joinRoomCategory(item.id);
            }
        },
        handleTableListOut: (model: MessageModel<TableListOutModel>) => {
            let content = model.messageContent;            
            setTableListMap(() => {
                tableListMap[content.roomCategoryId] = content;
                return {...tableListMap}
            });
        },
        handleTableUpdate: (model: MessageModel<TableUpdateModel>) => {
            let content = model.messageContent;    
            setTableUpdateMap(() => {
                tableUpdateMap[model.actorId] = content;
                return {...tableUpdateMap}
            });
        },
        handleTableJoinSuccess: (model: MessageModel<TableJoinSuccessModel>) => {

        },
    }

    useEffect(() => {
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, []);

    return <AppContext.Provider value={{
        user: user,
        context: createAppContext(),
        connectStatus: connectStatus,
        tableListMap: tableListMap,
        tableUpdateMap: tableUpdateMap
    }}>
        {props.children}
    </AppContext.Provider>
}
