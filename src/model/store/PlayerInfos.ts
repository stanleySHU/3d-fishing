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

type IActionType = 'playerJoinTable';

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