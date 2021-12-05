import { PropsWithChildren, useEffect, useState } from "react";
import { BuyinRangeModel } from "../../model/socket/BuyinRangeModel";
import { MessageModel } from "../../model/socket/MessageModel";
import { WebsocketService } from "../../services/websocket";
import { IBuyInCashType } from "../../units/customType";
import { Decimal } from 'decimal.js';
import { UIButton } from "../../components/pixi/Button";
import { AtlasGames } from "../assets";
import { Container } from "@inlet/react-pixi";
import { Rectangle } from "@pixi/math";

type IBuyInProps = {
    actorId: string,
    buyInCurrency: IBuyInCashType
    setPosition?: React.Dispatch<React.SetStateAction<number>>,
    inSeatPlayerPosition: boolean[],
    userInSeat: boolean
}

const BuyInHOC = (EL: React.FC<PropsWithChildren<IBuyInProps>>) => {
    return (props: PropsWithChildren<IBuyInProps>) => {
        const { actorId, buyInCurrency, userInSeat } = props;
        const [position, setPosition] = useState<number>(-1);
        const websocket = WebsocketService();
        const agent = {
            handleBuyinRange: (model: MessageModel<BuyinRangeModel>) => {
                const content = model.messageContent;
                const buyInAmount = Decimal.add(content.maxBuyInAmount, content.extraBuyInAmount).toDP(2, Decimal.ROUND_DOWN).toNumber();
                websocket.sender.joinRegularTable(actorId, buyInAmount, position, buyInCurrency);
            }
        }

        useEffect(() => {
            if (userInSeat) {
                websocket.sender.changeSeatIn(actorId, position);
            }
        }, [position]);

        useEffect(() => {
            const unRegister = websocket.register(agent);
            return () => {
                unRegister();
            }
        });

        useEffect(() => {
            websocket.sender.requestBuyinRange(actorId);
        }, []);

        return <EL {...props} setPosition={setPosition} />;
    }
}

const BuyInLayer = (props: PropsWithChildren<IBuyInProps>) => {
    const { setPosition, inSeatPlayerPosition } = props;
    return <Container>
        {
            [
                { x: 282, y: -16, addY: 18 },
                { x: 606, y: -16, addY: 18 },
                { x: 282, y: 484, addY: 0 },
                { x: 606, y: 484, addY: 0 }
            ].map((item, index) => {
                const { x, y, addY } = item;

                return !inSeatPlayerPosition[index]
                    &&
                    (
                        <Container key={`BuyIn${index}`} x={x} y={y}>
                            <AtlasGames img="img_cannon_container_small_up.png" />
                            <UIButton x={32} y={addY} click={setPosition.bind(null, index)} hitArea={new Rectangle(0, 0, 55, 55)}>
                                <AtlasGames img="btn_join.png" />
                            </UIButton>
                        </Container>
                    )
            })
        }
    </Container>
}

export const BuyIn = BuyInHOC(BuyInLayer);