export interface MessageModel<T = any> {
    readonly messageCode: string,
    readonly messageContent: T,
    readonly actorId?: string;
}