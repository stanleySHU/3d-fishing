import { Vector3 } from "@babylonjs/core";
import { NewFishModel } from "../socket/NewFishNoticeModel";
import { getNextPointStatus } from "./PathManager";
import * as DateUtil from '../../units/date';

export class FishModel {
    readonly id: number;
    readonly type: number;
    readonly pathId: number;
    readonly totalTime: number;
    readonly scale: Vector3;

    readonly startTime: number;
    private _position: Vector3;
    private _direction: Vector3;

    get position(): Vector3 {
        return this._position;
    }

    get direction(): Vector3 {
        return this._direction;
    }

    constructor(model: NewFishModel) {
        this.id = model.fishGenId;
        this.type = model.fishNumber;
        this.pathId = model.pathNumber;
        this.totalTime = model.totalTime;

        this.scale = new Vector3(1, 1, 1);

        const delayTime = (model.currentTime - model.startTime);
        this.startTime = DateUtil.nowMillis() - delayTime;
        this.setNextSwimStatus(delayTime / model.totalTime);
    }

    private setNextSwimStatus(per: number) {
        let t = getNextPointStatus(this.pathId, per);
        this._position = t.position; 
        this._direction = t.direction;
    }

    nextFrame(currentTime: number): boolean {
        let per = (currentTime - this.startTime) / this.totalTime;
        this.setNextSwimStatus(per);
        return per < 1;
    }
}