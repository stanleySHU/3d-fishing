export type IRoomListItemType = "free" | "normal";

interface RoomListItem {
    readonly id: string;
    readonly name: IRoomListItemType;
    readonly displayName: string;
    readonly categories: readonly any[];
}

export type RoomListModel = readonly RoomListItem[];