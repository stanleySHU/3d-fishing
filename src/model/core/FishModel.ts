import { Vector3 } from "@babylonjs/core";
import { NewFishModel, NewFishNoticeModel } from "../socket/NewFishNoticeModel";
import { getNextPointStatus } from "./PathManager";

export class FishModel {
    readonly id: number;
    readonly type: number;
    readonly pathId: number;
    readonly totalTimeSecond: number;
    readonly scale: Vector3;

    private _currentTimeSecond: number;
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
        this.totalTimeSecond = model.totalTime / 1000;

        this.scale = new Vector3(1, 1, 1);

        this._currentTimeSecond = model.currentTime / 1000;
        this.setNextSwimStatus(model.currentTime / model.totalTime);
        
    }

    private setNextSwimStatus(per: number) {
        let t = getNextPointStatus(this.pathId, 0);
        this._position = t.position; 
        this._direction = t.direction;
    }

    swim() {
        
    }
}