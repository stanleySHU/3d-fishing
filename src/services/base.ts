import { ILanguageType, ILeaderBoardType, IP2PGameCode } from '../units/customType';

export type IHistoryP2PGameCode = IP2PGameCode | 'ALL';
export type IWinLostCashType = 'Cash' | 'BonusWallet' | 'FppTransaction';
export type IHistoryGameType = 'Cash' | 'SitNGo' | 'Tournament';

export interface IAuthOptions {
    operatorCode: string,
    _platform: string,
    v: number,
    accessToken?: string,
    username?: string,
    password?: string
}

interface ISearchPaginationOptions {
    page: number,
    pageSize: number
}

interface ISearchDateOptions {
    fromDate: string,
    toDate: string
}

export interface IWinLoseOptions extends ISearchPaginationOptions, ISearchDateOptions {
    p2pGameCode: IHistoryP2PGameCode,
    cashType: IWinLostCashType
}

export interface IGameHistoryOptions extends ISearchPaginationOptions, ISearchDateOptions {
    p2pGameCode: IHistoryP2PGameCode,
    gameType: IHistoryGameType
}

export interface IHistoryDetailOptions {
    detailId: number,
    gameType: IHistoryGameType,
    p2pGameCode: IP2PGameCode
}

export interface ILeaderBoardOptions {
    p2pGameCode: IP2PGameCode,
    type: ILeaderBoardType
}

export interface IGameNameDictionaryOptions {
    language: ILanguageType
}
