import { Container, Graphics, _ReactPixi, Text } from "@inlet/react-pixi"
import { Graphics as pixiGraphics, Rectangle } from 'pixi.js';
import { AtlasGames } from "../assets"
import { Avatar } from '../../components/pixi/Avatar';
import React, { PropsWithChildren, useCallback } from "react";
import { Chip } from '../../components/pixi/Chip';
import { useContextSelector } from "use-context-selector";
import { GameDataSourceContext } from "../../model/context/GameDataProvider";
import { UICannonFresher, UICannonAdvanted, UICannonMaster } from '../assets';
import { isRoomAdvanted, isRoomFree, isRoomFresher, isRoomMaster } from '../../units/GameLib';
import { UIButton } from "../../components/pixi/Button";

export const InSeatUserLayer = React.memo((props) => {
    const [user, playerState] = useContextSelector(GameDataSourceContext, (e) => {
        return [e.user, e.playerState];
    });
    const userInfo = playerState.playerInfoUserIdMap[user.id];

    function onShoot(e) {
        
    }

    return !!userInfo && <UIButton hitArea={new Rectangle(0, 0, 960, 540)} click={onShoot}>
        {
            userInfo.position == 0
            &&
            (
                <Container>
                    <Container x={122} y={47} >
                        <AtlasGames img="img_avatar_container.png" scale={[1, -1]} anchor={[0, 1]} />
                        <GameAvatar avatarId={0} x={7} y={6} />
                    </Container>
                    <PlayerInfoContainer x={74} y={5}>
                        <PlayerNameText x={86} y={34} text='stanley001' />
                        <PlayerBalanceContainer x={41} y={4} amount={0} />
                    </PlayerInfoContainer>
                    <FortContainer x={250} y={-16} position={0}></FortContainer>
                </Container>
            )
        }
        {
            userInfo.position == 1
            &&
            (
                <Container>
                    <Container x={816} y={47} >
                        <AtlasGames img="img_avatar_container.png" scale={[1, -1]} anchor={[0, 1]} />
                        <GameAvatar avatarId={0} x={7} y={6} />
                    </Container>
                    <PlayerInfoContainer x={767} y={5}>
                        <PlayerNameText x={86} y={34} text='stanley002' />
                        <PlayerBalanceContainer x={41} y={4} amount={0} />
                    </PlayerInfoContainer>
                    <FortContainer x={576} y={-16} position={1}/>
                </Container>
            )
        }
        {
            userInfo.position == 2
            &&
            (
                <Container>
                    <Container x={122} y={422} >
                        <AtlasGames img="img_avatar_container.png" />
                        <GameAvatar avatarId={0} x={7} y={4} />
                    </Container>
                    <PlayerInfoContainer x={74} y={492}>
                        <PlayerNameText x={86} y={10} text='stanley003' />
                        <PlayerBalanceContainer x={41} y={17} amount={0} />
                    </PlayerInfoContainer>
                    <FortContainer x={250} y={484} position={2}/>
                </Container>
            )
        }
        {
            userInfo.position == 3
            &&
            (
                <Container>
                    <Container x={816} y={422} >
                        <AtlasGames img="img_avatar_container.png" />
                        <GameAvatar avatarId={0} x={7} y={4} />
                    </Container>
                    <PlayerInfoContainer x={767} y={492}>
                        <PlayerNameText x={86} y={10} text='stanley004' />
                        <PlayerBalanceContainer x={41} y={17} amount={0} />
                    </PlayerInfoContainer>
                    <FortContainer x={576} y={484} position={3}/>
                </Container>
            )
        }
    </UIButton >
}, () => true);

export const PlayerInfoContainer = (props: PropsWithChildren<_ReactPixi.IContainer>) => {
    const { children } = props;
    return <Container {...props} >
        <AtlasGames img="img_info_container.png" />
        <Container>
            {children}
        </Container>
    </Container>
}

export const PlayerNameText = (props: _ReactPixi.IText) => {
    return <Text {...props} anchor={[0.5, 0.5]} style={{ fontSize: "10px", fill: "0xf1fdff" }} />;
}

export const PlayerBalanceContainer = (props: _ReactPixi.IContainer & { amount: number }) => {
    const drawBalanceFrame = useCallback((g: pixiGraphics) => {
        g.clear()
        g.beginFill(0x0f2c4b)
        g.lineStyle(1, 0x30859b, 1)
        g.drawRoundedRect(0, 0, 87, 20, 12);
        g.endFill()
    }, []);

    return <Container {...props}>
        <Graphics draw={drawBalanceFrame} />
        <Text x={44} y={10} text={`${props.amount}`} anchor={[0.5, 0.5]} style={{ fontSize: "13px", fill: "0xe1ab16", stroke: "#552c13", strokeThickness: 2 }} />
        <Chip type='fish' y={0.5} width={20} height={20} />
    </Container>
}

export const GameAvatar = (props: _ReactPixi.IContainer & { avatarId: number }) => {
    const drawFrame = useCallback((g: pixiGraphics) => {
        g.clear()
        g.lineStyle(2, 0x266aa9, 1);
        g.drawRoundedRect(0, 0, 60, 60, 12);
        g.endFill()
    }, []);

    return <Container {...props}>
        <Avatar avatarId={props.avatarId} width={60} height={60} radius={24} />
        <Graphics draw={drawFrame} />
    </Container>
}

type IFortContainerProps = _ReactPixi.IContainer & {
    position: 0 | 1 | 2 | 3
}
const SKIN_OF_POSITION = ['red', 'green', 'blue', 'yellow'];
export const FortContainer = (props: IFortContainerProps) => {
    const { position } = props;
    const tableInfo = useContextSelector(GameDataSourceContext, (e) => {
        return e.tableInfo;
    });

    return <Container {...props} >
        <AtlasGames img="img_cannon_container_large.png" />
        <Container>
            {
                (isRoomFree(tableInfo) || isRoomFresher(tableInfo)) &&
                <UICannonFresher x={91.5} y={65} skin={SKIN_OF_POSITION[position]} loop={true} action={'lv1cannon'} scale={0.25} rotation={3.14}/>
            }
            {
                isRoomAdvanted(tableInfo) &&
                <UICannonAdvanted x={91.5} y={65} skin={SKIN_OF_POSITION[position]} loop={true} action={'lv3cannon'} scale={0.25} rotation={3.14} />
            }
            {
                isRoomMaster(tableInfo) &&
                <UICannonMaster x={91.5} y={65} skin={SKIN_OF_POSITION[position]} loop={true} action={'lv5cannon'} scale={0.25} rotation={3.14} />
            }
            <CannonAmount x={58} y={16} amount={1000} />
        </Container>
    </Container>
}

export const CannonAmount = (props: _ReactPixi.IContainer & { amount: number }) => {
    const { amount } = props;

    return <Container {...props}>
        <AtlasGames img="img_cannon_value_container.png" />
        <Text x={32.5} y={14} anchor={[0.5, 0.5]} text={`${amount}`} style={{ fontSize: "15px", fill: "0xe2d8cf", stroke: "#33194d", strokeThickness: 4, fontWeight: 'bolder' }} />
    </Container>
}

