interface CaptureFish {
    readonly id: number;
    readonly amount: number;
}

export interface BulletHitFishBroadCastModel {
    readonly userId: number;
    readonly captureFishs: readonly CaptureFish[];
}