import { BaseHttpModel } from "./BaseHttpModel";

interface TransactionsItem {
    readonly date: Date;
    readonly room: string;
    readonly winLose: number;
    readonly previousBalance: number;
    readonly newBalance: number;
    readonly remark: string;
    readonly exchangeRate: number;
}

export interface TransactionsModel extends BaseHttpModel {
    readonly resultList: readonly TransactionsItem[];
}