import { FishModel } from "../model/data/FishModel";
import { NewFishNoticeModel } from "../model/socket/NewFishNoticeModel";

export type InitialState = {
    fishs: readonly FishModel[]
}

export const initialState: InitialState = {
    fishs: []
}

type InGameActionType = 'newFrames' | 'newFish';

export type Action = {
    type: InGameActionType,
    payload?: {
        model?: any 
    }
};

export const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case 'newFrames': {
            //refresh  fish, bullet, position
            return {
                ...state
            }
        }
        case 'newFish': {
            let model: NewFishNoticeModel = action.payload.model, fishs = [...state.fishs];
            for (let item of model.fishs) {
                fishs.push(new FishModel(item));
            }
            return {
                ...state,
                fishs: fishs
            };
        }
        default: {

        }
    }
    return state;
}

export const NewFrames = () => {
    return {
        type: 'newFrames'
    }
}

export const NewFishNoticeAction = (model): Action => {
    return {
        type: 'newFish',
        payload: {
            model: model
        }
    }
}
