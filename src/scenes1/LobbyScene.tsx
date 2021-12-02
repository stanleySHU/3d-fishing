import { Rectangle, Graphics as pixiGraphics } from 'pixi.js';
import React, { useCallback, useEffect, useMemo } from "react";
import { Container, Sprite, Text, Graphics } from "@inlet/react-pixi"
import { ISceneProps, ViewController } from '../scenes/BaseScene';
import { AtlasComponents } from "./assets";
import { UIButton } from '../components/pixi/Button';
import { useContextSelector } from 'use-context-selector';
import { AppContext } from '../model/context/AppProvider';
import { getRoomModelFree, getRoomModelFresher, getRoomModelAdvanced, getRoomModelMaster } from '../units/GameLib';
import { TableListConfigItem, TableListOutModel } from '../model/socket/TableListOutModel';
import { isPresent } from '../units/lang';
import { WebsocketService } from '../services/websocket';
import { Avatar } from '../components/pixi/Avatar';
import { Chip } from '../components/pixi/Chip';
import { Flag } from '../components/pixi/Flag';
import { moneyFormat } from '../units/number';
import { MessageModel } from '../model/socket/MessageModel';
import { AvailableTableModel } from '../model/socket/AvailableTableModel';
import { TableUpdateModel } from '../model/socket/TableUpdateModel';
import { Replace } from '../model/store/NavController';
import { NavContext } from '../scenes/NavController';

export const LobbyScene = (props: ISceneProps) => {
    const SceneManager = useContextSelector(NavContext, e => e.SceneManager);
    const websocket = WebsocketService();

    const agent = {
        handleAvailableTable: (model: MessageModel<AvailableTableModel>) => {
            const content = model.messageContent;
            websocket.sender.requestObserve(content[1]);
        },
        handleTableUpdate: (model: MessageModel<TableUpdateModel>) => {
            SceneManager(Replace('gamePreload', {actorId: model.actorId}));
        }
    }

    useEffect(() => {
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    })

    useEffect(() => {
        websocket.sender.joinP2PGame('FISH');
    }, []);

    return <ViewController>
        <LobbyScene2D />
        <LobbyScene3D />
    </ViewController>;
}

export const LobbyScene2D = () => {
    function onOpenGPILobby() {

    }

    function onOpenNews() {

    }

    function onOpenRanking() {

    }

    function onOpenHelp() {

    }

    function onOpenSettings() {
        
    }

    return <Container>
        <Container>
            <Sprite image="/assets/img/2d/bg.jpg" />
            <AtlasComponents img="dealer.png" x={16} y={101}/>
        </Container>
        <Container>
            <TableRoomList />
            <Container x={872} y={215}>
                <AtlasComponents img="rewards_bg.png" />
                <UIButton hitArea={new Rectangle(0, 0, 88, 110)}>
                    <AtlasComponents x={28} y={23} img="rewards.png" />
                    <Text x={49} y={77} anchor={[0.5, 0.5]} text="Rewards" style={{ fontSize: "14px", fill: "0xf5f5f5" }} />
                </UIButton>
            </Container>
        </Container>
        <Container>
            <Container>
                <AtlasComponents img="nav_bar.png" />
                <AtlasComponents x={408} y={10} img="logo.png" />
            </Container>
            <NavUserInfo />
        </Container>
        <Container y={438}>
            <AtlasComponents img="tab_bar.png" />
            <Container y={14}>
                {
                    [
                        { x: 109, img: "tab_gpi_lobby.png", text: "GPI Lobby", click: onOpenGPILobby },
                        { x: 278, img: "tab_news.png", text: "News", click: onOpenNews },
                        { x: 448, img: "tab_ranking.png", text: "Ranking", click: onOpenRanking },
                        { x: 618, img: "tab_help.png", text: "Help", click: onOpenHelp },
                        { x: 787, img: "tab_settings.png", text: "Settings", click: onOpenSettings }
                    ].map((item) => {
                        const { x, img, text, click } = item;
                        return <UIButton key={text} x={x} hitArea={new Rectangle(0, 0, 88, 110)} click={click}>
                            <AtlasComponents img={img} />
                            <Text x={34} y={67} anchor={[0.5, 0.5]} text={text} style={{ fontSize: "14px", fill: "0xf5f5f5", stroke: "#03283e", strokeThickness: 4 }} />
                        </UIButton>
                    })
                }
            </Container>
        </Container>
    </Container>;
}

export const LobbyScene3D = (props) => {
    return null;
}

const NavUserInfo = React.memo(() => {
    const user = useContextSelector(AppContext, (e) => {
        return e.user;
    });

    const draw = (g: pixiGraphics, width: number) => {
        g.clear()
        g.beginFill(0x0f2c4b)
        g.lineStyle(1, 0x30859b, 1)
        g.drawRoundedRect(0, 0, width, 24, 12);
        g.endFill()
    }
    const drawBg_1 = useCallback(g => draw(g, 64), []);
    const drawBg_2 = useCallback(g => draw(g, 110), []);

    return <Container>
        <Container>
            <UIButton x={16} y={8}>
                <Avatar avatarId={user.avatarIndex} x={28} y={28} anchor={[0.5, 0.5]} width={50} height={50} />
                <AtlasComponents img="avatar_frame.png" />
            </UIButton>
            <Text x={80} y={23} anchor={[0, 0.5]} text={user.nickName} style={{ fontSize: "24px", fill: "0xf5f5f5" }} />
            <Container x={80 + user.nickName.length * 14} y={11}>
                <Graphics draw={drawBg_1} />
                <Container>
                    <Flag currency={user.currency} x={3} y={3} width={18} height={18} />
                    <Text text={user.currency} x={23} y={4} style={{ fontSize: "14px", fill: "0xf5f5f5" }} />
                </Container>
            </Container>
            <Container x={80} y={40}>
                <Graphics draw={drawBg_2} />
                <Container>
                    <Chip type="normal" width={24} height={24}/>
                    <Text text={moneyFormat(user.cash)} x={105} y={4} anchor={[1, 0]} style={{ fontSize: "14px", fill: "0xf5f5f5" }}/>
                </Container>
            </Container>
            <Container x={207} y={40}>
                <Graphics draw={drawBg_2} />
                <Container>
                    <Chip type="diamond" width={24} height={24}/>
                    <Text text={moneyFormat(user.gemWallet)} x={105} y={4} anchor={[1, 0]}  style={{ fontSize: "14px", fill: "0xf5f5f5" }}/>
                </Container>
            </Container>
        </Container>
        <Container>
            <UIButton x={840} y={14} hitArea={new Rectangle(-8, -8, 60, 60)}>
                <AtlasComponents img="daily_login.png" />
            </UIButton>
            <UIButton x={900} y={14} hitArea={new Rectangle(-8, -8, 60, 60)}>
                <AtlasComponents img="refresh.png" />
            </UIButton>
        </Container>
    </Container>
}, () => true)

const TableRoomList = React.memo(() => {
    const tableListMap = useContextSelector(AppContext, (e) => {
        return e.tableListMap;
    });
    const websocket = WebsocketService();

    function onJoinRoom(args) {
        websocket.sender.joinTableConfig(args);
    }

    function getRoomAvailableInfo(func: (e) => TableListConfigItem): [boolean, string] {
        let model = func(tableListMap || {});
        return isPresent(model) ? [true, model.actorId] : [false, ''];
    }
    return <Container x={408} y={114}>
        {
            [
                { name: "fresher", x: 0, y: 0, img: "room_fresher.png", getModel: getRoomModelFresher },
                { name: "advanced", x: 206, y: 0, img: "room_advanced.png", getModel: getRoomModelAdvanced },
                { name: "master", x: 0, y: 156, img: "room_master.png", getModel: getRoomModelMaster },
                { name: "free", x: 206, y: 156, img: "room_free.png", getModel: getRoomModelFree }
            ].map((item) => {
                const { name, x, y, img, getModel } = item;
                const [loaded, actorId] = getRoomAvailableInfo(getModel);
                return <UIButton key={name} enable={loaded} x={x} y={y} click={onJoinRoom.bind(null, actorId)}>
                    <AtlasComponents img={img} />
                </UIButton>
            })
        }
    </Container>
}, () => true);