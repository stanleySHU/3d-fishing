import { InSeatPlayerInfoModel, TableInfoModel } from "./TableUpdateModel";

interface TableListOutItem {
    readonly actorId: string;
    readonly roomCategoryId: string;
    readonly tableInfo: TableInfoModel;
}

export interface TableListConfigItem extends TableListOutItem {
    readonly totalPlayerCount: number;
}

export interface TableListNormalItem extends TableListOutItem {
    readonly seatedPlayersMap: {readonly[key: string]: InSeatPlayerInfoModel};
}

export interface TableListOutModel {
    readonly roomCategoryId: string;
    readonly items: readonly (TableListNormalItem | TableListConfigItem)[];
}