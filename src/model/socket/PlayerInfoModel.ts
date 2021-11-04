import { IP2PCashCurrency } from "../../units/customType";

export interface LevelModel {
    readonly id: number;
    readonly levelName: string;
    readonly requiredPoint: number;
    readonly retentionPoint: number;
    readonly monthlyYearly: string;
}

export interface PlayerInfoModel {
    readonly id: number;
    readonly nickName: string;
    readonly currency: IP2PCashCurrency;
    readonly currencyRate: number;
    readonly currencyExchangeRateMap: {readonly[key: string]: number};
    readonly dailyLoginAvailable: boolean;
    readonly totalFrequentPlayerPoint: number;
    readonly playMoney: number;
    readonly operatorCode: number;
    readonly avatarIndex: number;
    readonly backgroundIndex: number;
    readonly totalMonthlyVipPoint: number;
    readonly totalYearlyVipPoint: number;
    readonly trialUser: boolean;
    readonly vipLevel: LevelModel;
    readonly currentObserveState: string;
    readonly remainEarnDaysForUpgrade: number;
    readonly remainEarnDaysForDowngrade: number;
    readonly vipAlertStatus: string;
    readonly cash: number;
    readonly bonusWallet:number;
    readonly gemWallet: number;
    readonly tickets: readonly any[];
    readonly registeredTourInfos: readonly any[];
    readonly totalFppEarned: number;
    readonly rolloverClaimCount: number;
    readonly fppStoreItemInfos: readonly any[];
    readonly userAvatarInfos: readonly number[];
}