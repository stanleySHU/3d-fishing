import { Container } from "@inlet/react-pixi"
import React from "react";
import { useContextSelector } from "use-context-selector";
import { GameDataSourceContext } from "../../model/context/GameDataProvider";
import { AtlasGames } from "../assets"

export const InSeatPlayerLayer = React.memo((props) => {
    const [user, playerState] = useContextSelector(GameDataSourceContext, (e) => {
        return [e.user, e.playerState];
    });
    const { playerInfoPositionMap } = playerState;
    return <Container>
        {   
            [
                { x: 282, y: -16, amountY: 23 },
                { x: 606, y: -16, amountY: 23 },
                { x: 282, y: 484, amountY: 18 },
                { x: 606, y: 484, amountY: 18 }
            ].map((item, index) => {
                const { x, y, amountY } = item;

                return !!playerInfoPositionMap[index] && user.id != playerInfoPositionMap[index].userId
                    &&
                    (
                        <Container key={`BuyIn${index}`} x={x} y={y}>
                            <AtlasGames img="img_cannon_container_small_up.png" />
                            {/* cannon */}
                            <AtlasGames img="img_cannon_value_container.png" x={25} y={amountY} />
                        </Container>
                    )
            })
        }
    </Container>
}, () => true);