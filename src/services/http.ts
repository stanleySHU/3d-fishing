import axios, { Method } from 'axios';
import { AuthModel } from '../model/http/AuthModel';
import { GameHistoryModel } from '../model/http/GameHistoryModel';
import { GameNameDictionaryModel } from '../model/http/GameNameDictionaryModel';
import { LeaderBoardModel } from '../model/http/LeaderBoardModel';
import { TransactionsModel } from '../model/http/TransactionsModel';
import { IAuthOptions, IGameHistoryOptions, IGameNameDictionaryOptions, IHistoryDetailOptions, ILeaderBoardOptions, IWinLoseOptions } from './base';

const createAxios = () => {
    const instance = axios.create({
        timeout: 10000,
        paramsSerializer: (params: any) => {
            params['jsessionid'] = '';
            return `data=${encodeURIComponent(JSON.stringify(params))}`;
        }
    });
    instance.interceptors.response.use((res) => {
        return JSON.parse(res.data.data);
    }, error => {
        return Promise.reject(error);
    });


    function get<T>(url, args): Promise<T> {
        return instance.get(url, {params: args});
    }

    const sender = {
        auth: (options: IAuthOptions) => {
            return get<AuthModel>('/HttpServer/auth.mas', options);
        },
        winlose: (options: IWinLoseOptions) => {
            return get<TransactionsModel>('/HttpServer/winLose.mas', options);
        },
        gameHistory: (options: IGameHistoryOptions) => {
            return get<GameHistoryModel>('/HttpServer/gameHistory.mas', options);
        },
        historyDetail<T>(options: IHistoryDetailOptions) {
            return get<T>('/HttpServer/historyDetail.mas', options)
        },
        leaderBoard: (options: ILeaderBoardOptions) => {
            return get<LeaderBoardModel>('/HttpServer/leaderBoard.mas', options)
        },
        gameNameDictionary: (options: IGameNameDictionaryOptions) => {
            return get<GameNameDictionaryModel>('/HttpServer/gameNameDictionary.mas', options)
        }
    }

    return () => {
        return sender;
    }
}

export const HttpService = createAxios();