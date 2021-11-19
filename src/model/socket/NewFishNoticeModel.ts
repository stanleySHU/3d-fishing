import { Point } from "../../units/customType";

export interface NewFishModel {
    readonly fishGenId: number;
    readonly fishNumber: number;
    readonly pathNumber: number;
    readonly pathType: number;
    readonly startTime: number;
    readonly currentTime: number;
    readonly totalTime: number;
    readonly newStage: number;
    readonly path?: readonly Point[]; 
    readonly size?: number;
}

export interface NewFishNoticeModel {
    readonly fs: readonly NewFishModel[];
}