import { BaseHttpModel } from "./BaseHttpModel";

export interface AuthModel extends BaseHttpModel {
    readonly internalToken: string;
    readonly httpToken: string;
    readonly accessToken: string;
    readonly lobbyServerDomains: Array<string>;
    readonly lobbyServerSocketPorts: Array<number>;
    readonly lobbyServerWebSocketDomains: Array<string>;
    readonly lobbyServerWebSocketPorts: Array<number>;
    readonly riskId: string;
    readonly referId: string;
} 