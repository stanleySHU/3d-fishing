export interface FishGameFinishModel {
    readonly fishRecordId: number;
    readonly playerId: number;
    readonly nickName: string;
    readonly operatorId: number;
    readonly operatorName: string;
    readonly endChips: number;
    readonly startTime: Date;
    readonly finishTime: Date;
    readonly totalShoot:number;
    readonly totalAward: number;
    readonly winLose: number;
    readonly catchResult: { readonly [key: string]: number };
}