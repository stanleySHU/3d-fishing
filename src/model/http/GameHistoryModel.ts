import { IHistoryGameType, IHistoryP2PGameCode } from "../../services/base";
import { BaseHttpModel } from "./BaseHttpModel";

interface GameHistoryItem {
    readonly gameType: IHistoryGameType;
    readonly p2pGameCode: IHistoryP2PGameCode;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly name: string;
    readonly winLose: number;
    readonly detailId: number;
}

export interface GameHistoryModel extends BaseHttpModel {
    readonly totalWinLose: number;
    readonly recordList: readonly GameHistoryItem[];
}