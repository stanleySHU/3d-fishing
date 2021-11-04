import { TableListConfigItem, TableListOutModel } from "../model/socket/TableListOutModel";
import { TableInfoModel } from "../model/socket/TableUpdateModel";

function filterTableListItem<T>(model: TableListOutModel, type: 'normalTable' | 'tableConfig'): T[] {
    let res = model.items.filter(e => {
        return e.actorId.indexOf(type) !== -1;
    });
    return res as any;
}

function existRoom(model: TableListOutModel, key: string): TableListConfigItem {
    if (model) {
        for (let config of filterTableListItem<TableListConfigItem>(model, 'tableConfig')) {
            if (roomConfigKey(config.tableInfo) == key) {
                return config;
            }
        }
    }
}

export function getRoomModelFree(tableListMap: { [roomCategoryId: string]: TableListOutModel }): TableListConfigItem {
    return existRoom(tableListMap['FISH_room8'], 'PLAY_MONEY_1');
}

export function getRoomModelFresher(tableListMap: { [roomCategoryId: string]: TableListOutModel }): TableListConfigItem {
    return existRoom(tableListMap['FISH_room3'], 'CASH_RMB_1');
}

export function getRoomModelAdvanced(tableListMap: { [roomCategoryId: string]: TableListOutModel }): TableListConfigItem {
    return existRoom(tableListMap['FISH_room3'], 'CASH_RMB_2');
}

export function getRoomModelMaster(tableListMap: { [roomCategoryId: string]: TableListOutModel }): TableListConfigItem {
    return existRoom(tableListMap['FISH_room3'], 'CASH_RMB_3');
}

export function roomConfigKey(tableInfo: TableInfoModel) {
    let key = `${tableInfo.currency}_${tableInfo.cashCurrency ? tableInfo.cashCurrency + "_" : "" }${tableInfo.minBetAmount}`;
    return key;
}