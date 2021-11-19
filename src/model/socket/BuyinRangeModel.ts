export interface BuyinRangeModel {
    readonly minBuyInAmount: number;
    readonly maxBuyInAmount: number;
    readonly extraBuyInAmount: number;
    readonly vipLevelDownboundName: string;
    readonly vipLevelUpboundName: string;
}