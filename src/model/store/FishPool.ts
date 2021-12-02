import { FishModel } from "../core/FishModel";
import { NewFishNoticeModel } from "../socket/NewFishNoticeModel";
import * as DateUtil from '../../units/date';

export type InitialState = {
    fishs: FishModel[]
}

export const initialState: InitialState = {
    fishs: []/*.concat((() => {
        return [
            new FishModel({fishGenId: 20000, fishNumber: 2000, pathNumber: 1000, pathType: 0, startTime: 0, currentTime: 0, totalTime: 10000, newStage: 0}),
            new FishModel({fishGenId: 20001, fishNumber: 2000, pathNumber: 1000, pathType: 0, startTime: 0, currentTime: 0, totalTime: 10000, newStage: 0}),
            new FishModel({fishGenId: 20002, fishNumber: 2000, pathNumber: 1000, pathType: 0, startTime: 0, currentTime: 0, totalTime: 10000, newStage: 0})
        ]
    })())*/
}

type IActionType = 'newFrames' | 'newFish' | 'newStage';

export type Action = {
    type: IActionType,
    payload?: {
        model?: any 
    }
};

export const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case 'newFrames': {
            return handleNewFrames(state, action);
        }
        case 'newStage': {
            return state;
        }
        case 'newFish': {   
            return handleNewFish(state, action);
        }
        default: {

        }
    }
    return state;
}

export const NewFramesAction = (): Action => {
    return {
        type: 'newFrames'
    }
}

export const NewStageAction = (): Action => {
    return {
        type: 'newStage'
    }
}
 
export const NewFishNoticeAction = (model: NewFishNoticeModel): Action => {
    return {
        type: 'newFish',
        payload: {
            model: model
        }
    }
}

function handleNewFrames(state: InitialState, action: Action): InitialState {
    const dateTime = DateUtil.nowMillis();

    const newFishs = [];
    state.fishs.forEach(fish => {
        const isLiveing = fish.swiming(dateTime);
        if (isLiveing) {
            newFishs.push(fish);
        }
    });
    state.fishs = newFishs;

    return state;
}

function handleNewFish(state: InitialState, action: Action): InitialState {
    const model: NewFishNoticeModel = action.payload.model, fishs = state.fishs;
    for (let item of model.fs) {
        fishs.push(new FishModel(item));
    }
    state.fishs = fishs;
    return state;
}