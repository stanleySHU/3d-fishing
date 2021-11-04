export type IConnectStatus = 'close' | 'connecting' | 'connected' | 'reconnect1' | 'reconnect2' | 'reconnect3';
export type IInGameState = 'idle' | 'inGame' | 'win' | 'lose' | 'inBet' | 'inDiscard' | 'inDraw' | 'fold' | 'drop' | "quit" | "awarded";
export type IP2PCashCurrency = "RMB" | "THB" | "IDR" | "MYR" | "VND" | "USD" | "JPY" | "KRW" | "UUS" | "AUD" | "EUR" | "GBP" | "ID2" | "INR" | "VN2";
export type IP2PGameCode = 'PKMJ' | 'NIUNIU' | 'DMQQ' | 'TXHD' | 'TLMN' | 'PKDN' | 'BCMN' | 'OMPK' | 'PKPRO' | 'GGTH' | 'RMIN' | 'DDZB' | 'BIG2' | 'GPI' | 'FISH';;
export type IBuyInCashType = 'PLAY_MONEY' | 'REAL_CASH' | 'BONUS_WALLET';
export type ILanguageType = Languages.English | Languages.Chinese | Languages.Thai | Languages.Vietnamese | Languages.Khmer | Languages.Indonesian | Languages.Korean | Languages.Japanese;
export type ILeaderBoardType = 'all' | 'daily';


export enum Languages {
  English = "en",
  Chinese = "zh",
  Vietnamese = "vi",
  Thai = "th",
  Khmer = "km",
  Indonesian = "id",
  Korean = "ko",
  Japanese = "ja"
}

export type Size = {
  width: number,
  height: number
}

export type Point = {
  x: number,
  y: number
}
