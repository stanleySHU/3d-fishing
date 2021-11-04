import { ILeaderBoardType } from "../../units/customType";
import { BaseHttpModel } from "./BaseHttpModel";

interface LeaderBoardItem {
    readonly rank: number;
    readonly nickName: string;
    readonly currency: string;
    readonly avatarIndex: number;
    readonly countryCode: string;
    readonly totalAmount: number;
}

export interface LeaderBoardModel extends BaseHttpModel {
    readonly type: ILeaderBoardType;
    readonly onlinePlayerCount: number;
    readonly serverTime: Date;
    readonly items: readonly LeaderBoardItem[];
}