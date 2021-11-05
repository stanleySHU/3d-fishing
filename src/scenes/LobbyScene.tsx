import { Vector3 } from '@babylonjs/core'
import React, { useEffect, useState } from 'react'
import { Scene } from 'react-babylonjs'
import { Avatar } from '../components/Avatar';
import { Chip } from '../components/Chip';
import { moneyFormat } from '../units/number';
import { Flag } from '../components/Flag';
import { WebsocketService } from '../services/websocket';
import { getRoomModelFree, getRoomModelFresher, getRoomModelAdvanced, getRoomModelMaster } from '../units/GameLib';
import { isPresent } from '../units/lang';
import { TableListConfigItem, TableListOutModel } from '../model/socket/TableListOutModel';
import { PlayerInfoModel } from '../model/socket/PlayerInfoModel';
import { ISceneProps } from './BaseScene';
import { MessageModel } from '../model/MessageModel';
import { AvailableTableModel } from '../model/socket/AvailableTableModel';
import { useContextSelector } from 'use-context-selector';
import { AppContext } from '../model/data/AppProvider';
import { TableUpdateModel } from '../model/socket/TableUpdateModel';
import { NavContext } from './NavController';
import { Push } from '../store/NavController';

type MyLobbySceneProps = {
    user: PlayerInfoModel,
    tableListMap: { [roomCategoryId: string]: TableListOutModel }
}

const MyScene = React.memo((props: MyLobbySceneProps) => {
    const SceneManager = useContextSelector(NavContext, e => e.SceneManager);
    const websocket = WebsocketService();
    const agent = {
        handleAvailableTable: (model: MessageModel<AvailableTableModel>) => {
            const content = model.messageContent;
            websocket.sender.requestObserve(content[1]);
        },
        handleTableUpdate: (model: MessageModel<TableUpdateModel>) => {
            SceneManager(Push('game', model.actorId));
        }
    }

    useEffect(() => {
        websocket.sender.joinP2PGame('FISH');
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, [])

    return <Scene>
        <freeCamera name='camera' position={new Vector3(0, 700, 0)} target={new Vector3(0, 0, 0)} />
        {/* <directionalLight name='light' direction={new Vector3(0, -1, 0)} /> */}
        <adtFullscreenUi name='' idealWidth={960} idealHeight={540}>
            <container name='body' width='960px' height='540px'>
                <container>
                    <babylon-image url='/assets/img/2d/bg.jpg' />
                    <babylon-image url='/assets/img/2d/dealer.png' width='324px' height='402px' top={102} left={0} verticalAlignment={0} horizontalAlignment={0} />
                </container>
                <TableRoomList {...props} />
            </container>
            <container name='navbar' width='960px' height='82px' top={0} verticalAlignment={0}>
                <babylon-image url='/assets/img/2d/nav_bar.png' width='960px' height='82px' />
                <babylon-image url='/assets/img/2d/logo.png' width='146px' height='51px' verticalAlignment={0} top={8} />
                <container top={10}>
                    <babylon-button width='65px' height='80px' left={888} verticalAlignment={0} horizontalAlignment={0} color='transparent'>
                        <babylon-image url='/assets/img/2d/refresh.png' verticalAlignment={0} width='45.3px' height='45.3px' />
                        <textBlock width='65px' height='11px' verticalAlignment={0} top={39} text='Refresh' fontSize='11px' fontWeight='bold' color='#8be2fe' outlineColor='#1c2457' outlineWidth={2} />
                    </babylon-button>
                </container>
                <NavUserInfo {...props} />
            </container>
            <container name='tabbar' width='960px' height='98px' verticalAlignment={1}>
                <babylon-image url='/assets/img/2d/tab_bar.png' width='960px' height='98px' />
                <container top={9}>
                    <babylon-button width='72px' height='85px' left={66} verticalAlignment={0} horizontalAlignment={0} color='transparent'>
                        <babylon-image url='/assets/img/2d/tab_gpi_lobby.png' verticalAlignment={0} width='72px' height='72px' />
                        <textBlock width='72px' height='11px' verticalAlignment={0} top={69} text='GPI Lobby' fontSize='11px' fontWeight='bold' color='white' outlineColor='#114a46' outlineWidth={2} />
                    </babylon-button>
                    <babylon-button width='72px' height='85px' left={193} verticalAlignment={0} horizontalAlignment={0} color='transparent'>
                        <babylon-image url='/assets/img/2d/tab_news.png' verticalAlignment={0} width='72px' height='72px' />
                        <textBlock width='72px' height='11px' verticalAlignment={0} top={69} text='News' fontSize='11px' fontWeight='bold' color='white' outlineColor='#114a46' outlineWidth={2} />
                    </babylon-button>
                    <babylon-button width='72px' height='85px' left={321} verticalAlignment={0} horizontalAlignment={0} color='transparent'>
                        <babylon-image url='/assets/img/2d/tab_ranking.png' verticalAlignment={0} width='72px' height='72px' />
                        <textBlock width='72px' height='11px' verticalAlignment={0} top={69} text='Ranking' fontSize='11px' fontWeight='bold' color='white' outlineColor='#114a46' outlineWidth={2} />
                    </babylon-button>
                    <babylon-button width='72px' height='85px' left={447} verticalAlignment={0} horizontalAlignment={0} color='transparent'>
                        <babylon-image url='/assets/img/2d/tab_help.png' verticalAlignment={0} width='72px' height='72px' />
                        <textBlock width='72px' height='11px' verticalAlignment={0} top={69} text='Help' fontSize='11px' fontWeight='bold' color='white' outlineColor='#114a46' outlineWidth={2} />
                    </babylon-button>
                    <babylon-button width='72px' height='85px' left={575} verticalAlignment={0} horizontalAlignment={0} color='transparent'>
                        <babylon-image url='/assets/img/2d/tab_settings.png' verticalAlignment={0} width='72px' height='72px' />
                        <textBlock width='72px' height='11px' verticalAlignment={0} top={69} text='Settings' fontSize='11px' fontWeight='bold' color='white' outlineColor='#114a46' outlineWidth={2} />
                    </babylon-button>
                </container>
            </container>
        </adtFullscreenUi>
    </Scene>
},  () => true);

export const NavUserInfo = (props: MyLobbySceneProps) => {
    const { user } = props;
    const [_user, setUser] = useState<PlayerInfoModel>(user);

    const websocket = WebsocketService();
    const agent = {
        handlePlayerInfo: (model: MessageModel<PlayerInfoModel>) => {
            setUser(model.messageContent);
        }
    }

    useEffect(() => {
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, []);

    return <container>
        <babylon-button width='65px' height='65px' verticalAlignment={0} horizontalAlignment={0} top={7} left={10} color='transparent'>
            <Avatar index={_user.avatarIndex} width={0.85} height={0.85} />
            <babylon-image url='/assets/img/2d/avatar_frame.png' />
        </babylon-button>
        <textBlock width='105px' height='23px' text={_user.nickName} fontSize='23px' fontWeight='bold' textHorizontalAlignment={0} color='#ffffff' verticalAlignment={0} horizontalAlignment={0} left={85} top={8} />
        <container width='51px' height='20px' verticalAlignment={0} horizontalAlignment={0} left={203.5} top={13.5}>
            <rectangle background='#153760' cornerRadius={20} color='#5f8cb0' />
            <Flag currency={_user.currency} width='15px' height='15px' verticalAlignment={0} horizontalAlignment={0} left={3} top={3} />
            <textBlock width='25px' height='9px' text={_user.currency} fontSize='9px' fontWeight='bold' textHorizontalAlignment={1} color='#ffffff' verticalAlignment={0} horizontalAlignment={0} left={18} top={6} />
        </container>
        <container>
            <rectangle width='95px' height='20px' background='#153760' cornerRadius={20} color='#5f8cb0' verticalAlignment={0} horizontalAlignment={0} left={88} top={43} />
            <Chip type='normal' width='26px' height='26px' verticalAlignment={0} horizontalAlignment={0} left={82} top={40} />
            <textBlock width='70px' height='10px' text={moneyFormat(_user.cash)} fontSize='10px' fontWeight='bold' textHorizontalAlignment={1} color='#ffffff' verticalAlignment={0} horizontalAlignment={0} left={110} top={48} />
        </container>
        <container>
            <rectangle width='95px' height='20px' background='#153760' cornerRadius={20} color='#5f8cb0' verticalAlignment={0} horizontalAlignment={0} left={200} top={43} />
            <Chip type='diamond' width='25px' height='25px' verticalAlignment={0} horizontalAlignment={0} left={192} top={40} />
            <textBlock width='70px' height='10px' text={moneyFormat(_user.gemWallet)} fontSize='10px' fontWeight='bold' textHorizontalAlignment={1} color='#ffffff' verticalAlignment={0} horizontalAlignment={0} left={220} top={48} />
        </container>
    </container>
}

export const TableRoomList = (props: MyLobbySceneProps) => {
    const { tableListMap } = props;
    const [_tableListMap, setTableListMap] = useState<{[roomCategoryId: string]: TableListOutModel}>(tableListMap);

    const websocket = WebsocketService();
    const agent = {
        handleTableListOut: (model: MessageModel<TableListOutModel>) => {
            let content = model.messageContent;            
            setTableListMap(() => {
                tableListMap[content.roomCategoryId] = content;
                return {...tableListMap}
            });
        }
    }

    useEffect(() => {
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, []);

    function joinRoom(actorId: string) {
        websocket.sender.joinTableConfig(actorId);
    }

    function _(func: (e) => TableListConfigItem): [boolean, string] {
        let model = func(_tableListMap);
        return isPresent(model) ? [true, model.actorId] : [false, ''];
    }
    return <container left={391} top={89} >
        {
            [
                { x: 0, y: 0, getModel: getRoomModelFresher, image: 'room_fresher' },
                { x: 228, y: 0, getModel: getRoomModelAdvanced, image: 'room_advanced' },
                { x: 0, y: 178, getModel: getRoomModelMaster, image: 'room_master' },
                { x: 228, y: 178, getModel: getRoomModelFree, image: 'room_free' }
            ].map((item) => {
                const { x, y, getModel, image } = item;
                const [loaded, actorId] = _(getModel);
                return <babylon-button key={image} isEnabled={loaded} onPointerClickObservable={joinRoom.bind(null, actorId)} width='212px' height='166px' left={x} top={y} verticalAlignment={0} horizontalAlignment={0} color='transparent'>
                    <babylon-image url={`/assets/img/2d/${image}.png`} />
                </babylon-button>
            })
        }
    </container>
}

export const LobbyScene = (props: ISceneProps) => {
    const [user, tableListMap] = useContextSelector(AppContext, e => {
        return [e.user, e.tableListMap];
    });
    return <MyScene user={user} tableListMap={tableListMap}></MyScene>
};
