import { ChangeSeatBroadCastModel } from "../socket/ChangeSeatBroadCastModel";
import { PlayerJoinTableModel } from "../socket/PlayerJoinTableModel";
import { InSeatPlayerInfoModel } from "../socket/TableUpdateModel";

export type InitialState = {
    playerInfoPositionMap: { [position: number]: InSeatPlayerInfoModel },
    playerInfoUserIdMap: { [userId: string]: InSeatPlayerInfoModel },
}

export const initialState: InitialState = {
    playerInfoPositionMap: {},
    playerInfoUserIdMap: {}
}

type IActionType = 'playerJoinTable' | 'changeSeatBroadCast';

export type Action = {
    type: IActionType,
    payload?: {
        model?: any 
    }
};

export const reducer = (state: InitialState, action: Action): InitialState => {
    switch(action.type) {
        case 'playerJoinTable': {
            return {...handlePlayerJoinTable(state, action)}
        }
        case 'changeSeatBroadCast': {
            return {...handleChangeSeatBroadCast(state, action)}
        }
        default: {

        }
    }
    return state;
}

export const PlayerJoinTableAction = (model: PlayerJoinTableModel): Action => {
    return {
        type: 'playerJoinTable',
        payload: {
            model: model
        }
    }
}

function handlePlayerJoinTable(state: InitialState, action: Action) {
    const { playerInfoPositionMap, playerInfoUserIdMap } = state;
    const [ playerInfoModel, position ] = action.payload.model as PlayerJoinTableModel;
    playerInfoPositionMap[position] = playerInfoModel;
    playerInfoUserIdMap[playerInfoModel.userId] = playerInfoModel;
    return state;
}

function handleChangeSeatBroadCast(state: InitialState, action: Action) {
    const { playerInfoPositionMap, playerInfoUserIdMap } = state;
    const model = action.payload.model as ChangeSeatBroadCastModel;

    let playerInfo = playerInfoUserIdMap[model.playerId];
    if (playerInfo) {
        delete playerInfoPositionMap[playerInfo.position];
        playerInfo = {
            ...playerInfo,
            position: model.position
        }
        playerInfoPositionMap[model.position] = playerInfo;
        playerInfoPositionMap[model.playerId] = playerInfo;
    }
    return state;
}