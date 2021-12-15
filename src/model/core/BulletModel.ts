import { Vector2, Angle } from "@babylonjs/core";
import { FireBulletBroadCastModel } from "../socket/FireBulletBroadCastModel";
import * as DateUtil from '../../units/date';

export class BulletModel {
    readonly playerId: number;
    readonly shootAngle: number;
    readonly shootAmount: number;
    readonly bulletId: number;
    readonly fishId: number;
    readonly startTime: number;
    private _position: Vector2 = new Vector2();
    private _startPosition: Vector2;
    private _radians: number;

    readonly speed: number = 720;
    readonly speedX: number;
    readonly speedY: number;

    get position(): Vector2 {
        return this._position;
    }

    get radians(): number {
        return this._radians;
    }

    get x(): number {
        return this._position.x;
    }

    get y(): number {
        return this._position.y;
    }

    constructor(model: FireBulletBroadCastModel, position: Vector2) {
        const b = model.b;
        this.playerId = b.playerId;
        this.shootAngle = b.shootAngle;
        this.shootAmount = b.shootAmount;
        this.bulletId = b.bulletId;
        this.fishId = b.fishId;
        this.startTime = DateUtil.nowMillis();

        const radians = Angle.FromDegrees(this.shootAngle).radians();
        this.speedX = Math.round(this.speed * Math.cos(radians));
        this.speedY = Math.round(this.speed * Math.sin(radians));
        this._startPosition = position;
        this.nextFrame(this.startTime);
    }

    nextFrame(currentTime: number) {
        const time = (currentTime - this.startTime)/1000,
        offsetX =  this.speedX * time,
        offsetY = this.speedY * time,
        currentX = offsetX + this._startPosition.x,
        currentY = offsetY + this._startPosition.y,
        multipX = Math.abs(currentX / 960),
        multipY = Math.abs(currentY / 540),
        perX = multipX % 2,
        perY = multipY % 2,
        x = Math.round(perX > 1 ? (2 - perX) * 960 : perX * 960),
        y = Math.round(perY > 1 ? (2 - perY) * 540 : perY * 540),
        speedX = this.speedX * (Math.ceil(multipX) % 2 == 0 ? 1 : -1),
        speedY = this.speedY * (Math.ceil(multipY) % 2 == 0 ? 1 : -1);
        
        this._position.set(x, y);
        this._radians = Math.atan2(speedY, speedX);
    }
}