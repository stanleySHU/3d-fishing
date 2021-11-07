import { Vector3 } from "@babylonjs/core";
import { NewFishModel, NewFishNoticeModel } from "../socket/NewFishNoticeModel";

export class FishModel {
    readonly id: number;
    readonly type: number;
    readonly pathId: number;
    readonly totalTimeSecond: number;
    readonly scale: Vector3;

    private _currentTimeSecond: number;
    private _position: Vector3;
    private _rotate: Vector3;

    constructor(model: NewFishModel) {
        this.id = model.fishGenId;
        this.type = model.fishNumber;
        this.pathId = model.pathNumber;
        this.totalTimeSecond = model.totalTime;

        this.scale = new Vector3(1, 1, 1);

        this._currentTimeSecond = model.currentTime;
    }

    get position(): Vector3 {
        return this._position;
    }

    get rotate(): Vector3 {
        return this._rotate;
    }
}