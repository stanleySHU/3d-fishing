import { FishModel } from "../core/FishModel";
import { BulletModel } from "../core/BulletModel";
import { NewFishNoticeModel } from "../socket/NewFishNoticeModel";
import * as DateUtil from '../../units/date';
import { FireBulletBroadCastModel } from "../socket/FireBulletBroadCastModel";
import { Vector2 } from "@babylonjs/core";

export type InitialState = {
    fishs: FishModel[],
    bullets: BulletModel[]
}

export const initialState: InitialState = {
    fishs: []/*.concat((() => {
        return [
            new FishModel({fishGenId: 20000, fishNumber: 2000, pathNumber: 1000, pathType: 0, startTime: 0, currentTime: 0, totalTime: 10000, newStage: 0}),
            new FishModel({fishGenId: 20001, fishNumber: 2000, pathNumber: 1000, pathType: 0, startTime: 0, currentTime: 0, totalTime: 10000, newStage: 0}),
            new FishModel({fishGenId: 20002, fishNumber: 2000, pathNumber: 1000, pathType: 0, startTime: 0, currentTime: 0, totalTime: 10000, newStage: 0})
        ]
    })())*/,
    bullets: []
}

type IActionType = 'newFrames' | 'newFish' | 'newStage' | 'fireBulletBroadCast';

export type Action = {
    type: IActionType,
    payload?: {
        model?: any,
        bulletStartPoint?: Vector2
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
        case 'fireBulletBroadCast': {
            return handleFireBulletBroadCast(state, action);
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

export const FireBulletBroadCastAction = (model: FireBulletBroadCastModel, bulletStartPoint: Vector2): Action => {
    return {
        type: 'fireBulletBroadCast',
        payload: {
            model: model,
            bulletStartPoint: bulletStartPoint
        }
    }
}

function handleNewFrames(state: InitialState, action: Action): InitialState {
    const dateTime = DateUtil.nowMillis();

    //fish move
    const newFishs = [];
    state.fishs.forEach(fish => {
        const isLiveing = fish.nextFrame(dateTime);
        if (isLiveing) {
            newFishs.push(fish);
        }
    });
    state.fishs = newFishs;
    
    //bullet move
    state.bullets.forEach(bullet => {
        bullet.nextFrame(dateTime);
    });

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

function handleFireBulletBroadCast(state: InitialState, action: Action): InitialState {
    const model: FireBulletBroadCastModel = action.payload.model, 
        bulletStartPoint = action.payload.bulletStartPoint,
        bullets = state.bullets;
    bullets.push(new BulletModel(model, bulletStartPoint));
    state.bullets = bullets;
    return state;
}