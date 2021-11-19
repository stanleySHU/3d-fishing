import { IBuyInCashType, IInGameState, IP2PCashCurrency, IP2PCurrency } from "../../units/customType";
import { NewFishModel } from "./NewFishNoticeModel";
import { LevelModel } from "./PlayerInfoModel";

export interface TableInfoModel {
    readonly creatorActorId: string;
    readonly displayName: string;
    readonly seatsPerTable: number;
    readonly currency: IP2PCurrency;
    readonly cashCurrency: IP2PCashCurrency;
    readonly colorCode: string;
    readonly playerHandSize: number;
    readonly minJoinAmount: number;
    readonly rakeRate: number;
    readonly minBetAmount: number;
}
export interface InSeatPlayerInfoModel {
    readonly chips: number;
    readonly nickName: string;
    readonly avatarIndex: number;
    readonly currency: IP2PCashCurrency;
    readonly countryCode: number;
    readonly membershipId: number;
    readonly operatorCode: string;
    readonly userId: number;
    readonly backgroundIndex: number;
    readonly disconnect: boolean;
    readonly vipLevel: LevelModel;
    readonly state: IInGameState;
    readonly away: boolean;
    readonly buyInCashType: IBuyInCashType;
    readonly position: number;
}

export interface TableUpdateModel {
    readonly tableInfo: TableInfoModel;
    readonly seatedPlayersMap: {readonly[key: number]: InSeatPlayerInfoModel};
    readonly gameRecordId: number;
    readonly roomCategoryId: string;
    readonly actorId: string,
    readonly fishStage?: {
        readonly stageNumber: number;
        readonly fishs: readonly NewFishModel[]
    }
}