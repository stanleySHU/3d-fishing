import { TableListConfigItem, TableListOutModel } from "../model/socket/TableListOutModel";
import { InSeatPlayerInfoModel, InSeatPlayerInfoWithPositionModel, TableInfoModel } from "../model/socket/TableUpdateModel";

const FREE_ROOM_KEY = `PLAY_MONEY_1`;
const CASH_ROOM_KEY_FRESHER = `CASH_RMB_1`;
const CASH_ROOM_KEY_ADVANTED = `CASH_RMB_2`;
const CASH_ROOM_KEY_MASTER = `CASH_RMB_3`;

function filterTableListItem<T>(model: TableListOutModel, type: 'normalTable' | 'tableConfig'): T[] {
    let res = model.items.filter(e => {
        return e.actorId.indexOf(type) !== -1;
    });
    return res as any;
}

function existRoom(model: TableListOutModel, key: string): TableListConfigItem {
    if (model) {
        for (let config of filterTableListItem<TableListConfigItem>(model, 'tableConfig')) {
            if (isRoomType(config.tableInfo, key)) {
                return config;
            }
        }
    }
}   

export function getRoomModelFree(tableListMap: { [roomCategoryId: string]: TableListOutModel }): TableListConfigItem {
    return existRoom(tableListMap['FISH_room8'], FREE_ROOM_KEY);
}

export function getRoomModelFresher(tableListMap: { [roomCategoryId: string]: TableListOutModel }): TableListConfigItem {
    return existRoom(tableListMap['FISH_room3'], CASH_ROOM_KEY_FRESHER);
}

export function getRoomModelAdvanced(tableListMap: { [roomCategoryId: string]: TableListOutModel }): TableListConfigItem {
    return existRoom(tableListMap['FISH_room3'], CASH_ROOM_KEY_ADVANTED);
}

export function getRoomModelMaster(tableListMap: { [roomCategoryId: string]: TableListOutModel }): TableListConfigItem {
    return existRoom(tableListMap['FISH_room3'], CASH_ROOM_KEY_MASTER);
}

export function isRoomType(tableInfo: TableInfoModel, key: string) {
    return roomConfigKey(tableInfo) == key;
}

export function isRoomFree(tableInfo: TableInfoModel) {
    return isRoomType(tableInfo, FREE_ROOM_KEY);
}

export function isRoomFresher(tableInfo: TableInfoModel) {
    return isRoomType(tableInfo, CASH_ROOM_KEY_FRESHER);
}

export function isRoomAdvanted(tableInfo: TableInfoModel) {
    return isRoomType(tableInfo, CASH_ROOM_KEY_ADVANTED);
}

export function isRoomMaster(tableInfo: TableInfoModel) {
    return isRoomType(tableInfo, CASH_ROOM_KEY_MASTER);
}

export function roomConfigKey(tableInfo: TableInfoModel) {
    let key = `${tableInfo.currency}_${tableInfo.cashCurrency ? tableInfo.cashCurrency + "_" : "" }${tableInfo.minBetAmount}`;
    return key;
}

export function getSeatExistPlayerArrMap(playerInfoPositionmap: {[key: string]: InSeatPlayerInfoWithPositionModel}): boolean[] {
    const res: boolean[] = [false, false, false, false];
    for (let key in playerInfoPositionmap) {
        res[key] = !!playerInfoPositionmap[key];
    }
    return res;
}

export function getInGameOtherPlayerInfoPositionMap(playerInfoPositionmap: {[key: string]: InSeatPlayerInfoWithPositionModel}, userId: number | string): {[key: string]: InSeatPlayerInfoWithPositionModel} {
    const map = {};
    for (let key in playerInfoPositionmap) {
        let playerInfo = playerInfoPositionmap[key];
        if (playerInfo.userId != userId) {
            map[key] = playerInfo;
        }
    }
    return map;
}

export function getInGameCurrentPlayerInfo(playerInfoUserIdmap: {[key: string]: InSeatPlayerInfoWithPositionModel}, userId: number | string): InSeatPlayerInfoWithPositionModel {
    for (let key in playerInfoUserIdmap) {
        if (key == userId) {
            return playerInfoUserIdmap[key];
        }
    }
}