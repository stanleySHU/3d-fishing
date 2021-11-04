import { createContext, useEffect, useState } from "react";
import { WebsocketService } from "../../services/websocket";
import { PlayerInfoModel } from "../socket/PlayerInfoModel";
import { createAppContext, IAppContextModel } from "../../units/appContext";
import { IConnectStatus } from "../../units/customType";
import { MessageModel } from "../MessageModel";
import { TableUpdateModel } from "../socket/TableUpdateModel";
import { TableJoinSuccessModel } from "../socket/TableJoinSuccessModel";

type IAppContextOptions = {
    user: PlayerInfoModel,
    context: IAppContextModel,
    connectStatus: IConnectStatus,
    tableUpdateMap: { [actorId: string]: TableUpdateModel }
}

export const AppContext = createContext<IAppContextOptions>({} as any);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [connectStatus, setConnectStatus] = useState<IConnectStatus>('connecting');
    const [tableUpdateMap, setTableUpdateMap] = useState({});

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
        handleTableUpdate: (model: MessageModel<TableUpdateModel>) => {

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
        tableUpdateMap: tableUpdateMap
    }}>
        {props.children}
    </AppContext.Provider>
}
