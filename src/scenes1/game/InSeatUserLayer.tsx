import { Container, Graphics, _ReactPixi, Text } from "@inlet/react-pixi"
import { Graphics as pixiGraphics, Rectangle } from 'pixi.js';
import { Angle, Vector2 } from '@babylonjs/core';
import { AtlasGames } from "../assets"
import { Avatar } from '../../components/pixi/Avatar';
import React, { PropsWithChildren, useCallback, useState } from "react";
import { Chip } from '../../components/pixi/Chip';
import { useContextSelector } from "use-context-selector";
import { GameDataSourceContext } from "../../model/context/GameDataProvider";
import { UIButton } from "../../components/pixi/Button";
import { WebsocketService } from "../../services/websocket";
import { Fort } from "./Fort";

const CANNON_POINT_POSITION_MAP: { [key: string | number]: Vector2  } = {
    0: new Vector2(250 + 91.5, -16 + 65),
    1: new Vector2(576 + 91.5, -16 + 65),
    2: new Vector2(250 + 91.5, 480 + 65),
    3: new Vector2(576 + 91.5, 484 + 65)
}

type IInSeatUserLayerProps = {

}

export const InSeatUserLayer = React.memo((props: IInSeatUserLayerProps) => {
    const websocket = WebsocketService();
    const [actorId, user, playerState] = useContextSelector(GameDataSourceContext, (e) => {
        return [e.actorId, e.user, e.playerState];
    });
    const [bulletId, setBulletId] = useState(1);
    const [shootAmount, setShootAmount] = useState(0);
    const [cannonRadians, setCannonRadians] = useState(0);
    const userInfo = playerState.playerInfoUserIdMap[user.id];

    function onShoot(e) {
        const { position } = userInfo;
        const cannonPoint = CANNON_POINT_POSITION_MAP[position];
        const {x, y} = e.data.global, tapPoint = new Vector2(x, y);
        const angle = Angle.BetweenTwoPoints(cannonPoint, tapPoint),
            degrees = Math.round(angle.degrees()),
            _radians = angle.radians();
        websocket.sender.fireBulletIn(actorId, degrees, shootAmount, bulletId);
        setBulletId(() => {
            return bulletId + 1;
        });
        setCannonRadians(_radians);
    }

    return !!userInfo && <Container>
        <UIButton hitArea={new Rectangle(0, 0, 960, 540)} click={onShoot}/>
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
                    <Fort x={250} y={-16} playerPosition={0} shootAmount={shootAmount} setShootAmount={setShootAmount} radians={cannonRadians + 3.14}/>
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
                    <Fort x={576} y={-16} playerPosition={1} shootAmount={shootAmount} setShootAmount={setShootAmount} radians={cannonRadians + 3.14}/>
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
                    <Fort x={250} y={484} playerPosition={2} shootAmount={shootAmount} setShootAmount={setShootAmount} radians={cannonRadians}/>
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
                    <Fort x={576} y={484} playerPosition={3} shootAmount={shootAmount} setShootAmount={setShootAmount} radians={cannonRadians}/>
                </Container>
            )
        }
    </Container>
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

