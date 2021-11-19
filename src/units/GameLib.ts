import { TableListConfigItem, TableListOutModel } from "../model/socket/TableListOutModel";
import { InSeatPlayerInfoModel, TableInfoModel } from "../model/socket/TableUpdateModel";

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

export function getSeatExistPlayerArrMap(playerInfoPositionmap: {[key: string]: InSeatPlayerInfoModel}): boolean[] {
    const res: boolean[] = [];
    for (let key in playerInfoPositionmap) {
        res[key] = !!playerInfoPositionmap[key];
    }
    return res;
}

export function getInGameOtherPlayerInfoPositionMap(playerInfoPositionmap: {[key: string]: InSeatPlayerInfoModel}, userId: number | string): {[key: string]: InSeatPlayerInfoModel} {
    const map = {};
    for (let key in playerInfoPositionmap) {
        let playerInfo = playerInfoPositionmap[key];
        if (playerInfo.userId != userId) {
            map[key] = playerInfo;
        }
    }
    return map;
}

export function getInGameCurrentPlayerInfo(playerInfoUserIdmap: {[key: string]: InSeatPlayerInfoModel}, userId: number | string): InSeatPlayerInfoModel {
    for (let key in playerInfoUserIdmap) {
        if (key == userId) {
            return playerInfoUserIdmap[key];
        }
    }
}