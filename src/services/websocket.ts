import { MessageModel } from '../model/socket/MessageModel';
import { IBuyInCashType, IP2PGameCode } from '../units/customType';
import { nowMillis } from '../units/date';
import { firstUpperCase } from '../units/string';

const createWebsocket = () => {
    let socket: WebSocket,
    _token: string,
    _domains: string[],
    _ports: number[],
    _domainsIndex: 0,
    _portsIndex: 0,
    agents: {[key: string]: Function}[] = [],
    countdownMap: { [key: string]: number } = {};

    const onopen = () => {
        websocket.sender.ping();
        
        let agentHandle = agents[0].onConnected;
        agentHandle && agentHandle();
    }

    const onclose = () => {
        let agentHandle = agents[0].onDisconnected;
        agentHandle && agentHandle();
    }

    const onerror = () => {
        let agentHandle = agents[0].onConnectError;
        agentHandle && agentHandle();
    };

    const onmessage = (event: MessageEvent) => {
        let data: MessageModel = JSON.parse(event.data)[0];
        for (let agent of agents) {
            let handleName = `handle${firstUpperCase(data.messageCode)}`;
            agent[handleName] && agent[handleName](data);
        }
    }

    const connect = () => {
        let port = _ports[_portsIndex++], domain;
        if (!port) {
            _portsIndex = 0;
            _domainsIndex++;
            port = _ports[_portsIndex];
        }
        domain = _domains[_domainsIndex]
        if (!domain) {
            //fail
        } else {
            socket = new WebSocket(`ws://${domain}:${port}/pkmj`);
            socket.onopen = onopen;
            socket.onclose = onclose;
            socket.onerror = onerror;
            socket.onmessage = onmessage;
        }
    };

    const send = (message: Array<any>, second: number = 0): boolean => {
        let messageName = message[0];
        let lastTime = countdownMap[messageName];
        let nowTime = nowMillis();
        let secondTime = nowTime - lastTime;

        if (!lastTime || secondTime >= second * 1000) {
            countdownMap[messageName] = nowTime;
            socket.send(JSON.stringify(message));
        } else {
            return false;
        }
        return true;
    }

    const websocket = {
        initConnect: (token: string,domains: string[], ports: number[]) => {
            _token = token;
            _domains = domains;
            _ports = ports;
            _domainsIndex = 0;
            _portsIndex = 0;
            connect();
        },
        register: (agent: {[key: string]: Function}): () => void => {
            agents.push(agent);
            return () => {
                let index = agents.indexOf(agent);
                agents.splice(index, 1);
            }
        },
        sender: {
            ping(second: number = 0): boolean {
                return send(['ping'], second);
            },
            authenticationIn(second: number = 0): boolean {
                //InternalToken is one time token
                let params: Array<number | string> = ['authenticationIn', _token, 'en', 'HTML5_DESKTOP'];
                let extra: Array<number | string> = [-1, ''];
                return send(params.concat(extra), second);
            },
            forceChangeAvatar(avatarIndex: number, second: number = 0): boolean {
                return send(['forceChangeAvatar', String(avatarIndex)], second);
            },
            changeAvatar(avatarIndex: number, second: number = 0): boolean {
                return send(['changeAvatar', String(avatarIndex)], second);
            },
            newUserRegister(name: string, avatarIndex: number, second: number = 0): boolean {
                return send(['newUserRegister', name, String(avatarIndex)], second);
            },
            joinP2PGame(code: IP2PGameCode, second: number = 0): boolean {
                return send(['joinP2PGame', code], second);
            },
            joinRoomCategory(roomId: string, second: number = 0): boolean {
                return send(['joinRoomCategory', roomId], second);
            },
            joinTableConfig(configId: string, second: number = 0): boolean {
                return send(['joinTableConfig', configId], second);
            },
            createPrivateTable(gameCode: string, password: string, cappedRakeConfigId: string, minBetAmount: string = '', second: number = 0): boolean {
                return send(['createPrivateTable', gameCode, password, cappedRakeConfigId, minBetAmount], second);
            },
            requestObserve(actorId: string, second: number = 0): boolean {
                return send(['observeTable', actorId], second);
            },
            regularTableRebuyin(actorId: string, amount: number, second: number = 0): boolean {
                return send(['regularTableRebuyin', actorId, String(amount)], second);
            },
            joinRegularTable(actorId: string, amount: number | string, position: number = -1, type: IBuyInCashType, second: number = 0): boolean {
                return send(['joinRegularTable', actorId, String(amount), String(position), type], second);
            },
            betIn(actorId: string, amount: number, second: number = 0): boolean {
                return send(['betIn', actorId, String(amount)], second);
            },
            foldIn(actorId: string, second: number = 0): boolean {
                return send(['foldIn', actorId], second);
            },
            quitObserveTable(actorId: string, second: number = 0): boolean {
                return send(['quitObserveTable', actorId], second);
            },
            requestAway(actorId: string, second: number = 0): boolean {
                return send(['awayMessage', actorId], second);
            },
            quitTableConfig(actorId: string, second: number = 0): boolean {
                return send(['quitTableConfig', actorId], second);
            },
            standupTableConfig(actorId: string, second: number = 0): boolean {
                return send(['standupTableConfig', actorId], second);
            },
            imBackRequest(actorId: string, second: number = 0): boolean {
                return send(['backMessage', actorId], second);
            },
            requestBuyinRange(actorId: string, second: number = 0): boolean {
                return send(['requestBuyinRange', actorId], second);
            },
            snatchDealerIn(actorId: string, type: string, count: number, second: number = 0): boolean {
                return send(['snatchDealerIn', actorId, type, String(count)], second);
            },
            chooseCardsIn(actorId: string, leftHandCardIds: ReadonlyArray<number>, rightHandCardIds: ReadonlyArray<number>, second: number = 0): boolean {
                return send(['chooseCardIn', actorId, leftHandCardIds.join(','), rightHandCardIds.join(',')], second);
            },
            multiBetIn(actorId: string, betTimes: number, second: number = 0): boolean {
                return send(['multiBetIn', actorId, String(betTimes)], second);
            },
            drawIn(actorId: string, drawAction: '0' | '1', second: number = 0): boolean {
                return send(['drawIn', actorId, drawAction], second);
            },
            openCardIn(actorId: string, second: number = 0): boolean {
                return send(['openCardIn', actorId], second);
            },
            discardIn(actorId: string, values: ReadonlyArray<number>, second: number = 0): boolean {
                return send(['discardIn', actorId, values.join(',')], second);
            },
            declareIn(actorId: string, value: number, second: number = 0): boolean {
                return send(['declareIn', actorId, String(value)], second);
            },
            dropIn(actorId: string, second: number = 0): boolean {
                return send(['dropIn', actorId], second);
            },
            fireBulletIn(actorId: string, angle: number, amount: number, bulletId: number, second: number = 0): boolean {
                return send(['fireBulletIn', actorId, String(angle), String(amount), String(bulletId)], second);
            },
            bulletHitFishIn(actorId: string, amount: number, fishs: string, second: number = 0): boolean {
                return send(['bulletHitFishIn', actorId, String(amount), fishs], second);
            },
            refreshWallet(second: number = 0): boolean {
                return send(['refreshWallet'], second);
            },  
            suggestCardIn(actorId: string, second: number = 0): boolean {
                return send(['suggestCardIn', actorId], second);
            },
            refreshDailyLogin(second: number = 0): boolean {
                return send(['refreshDailyLogin'], second);
            },
            claimDailyLogin(second: number = 0): boolean {
                return send(['claimDailyLogin'], second);
            },
            tableChatIn(actorId: string, content: string, second: number = 2): boolean {
                return send(['tableChatIn', actorId, content], second);
            },
            refreshSpinWheel(second: number = 0): boolean {
                return send(['refreshSpinWheel'], second);
            },
            playSpinWheel(second: number = 0): boolean {
                return send(['playSpinWheel'], second);
            },
            changeSeatIn(actorId: string, position: number, second: number = 0) {
                return send(['changeSeatIn', actorId, String(position)], second);
            },
            // sendRequestMuck(actorId: string, muck:boolean, second: number = 0)
            // {
            //     send([muck ? 'muckCard' : 'unmuckCard', actorId], second);
            // },
            forceServerToClose(): boolean {
                return send(['forceServerToClose']);
            }
        }
    };

    websocket.register({
        handlePong: () => {
            websocket.sender.authenticationIn();
        }
    });

    return () => {
        return websocket;
    }
};

export const WebsocketService = createWebsocket();