import { PropsWithChildren, useEffect, useState } from "react";
import { BuyinRangeModel } from "../../model/socket/BuyinRangeModel";
import { MessageModel } from "../../model/socket/MessageModel";
import { WebsocketService } from "../../services/websocket";
import { IBuyInCashType } from "../../units/customType";
import { Decimal } from 'decimal.js';
import { UIButton } from "../../components/pixi/Button";
import { AtlasGames } from "../assets";

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
            websocket.sender.requestBuyinRange(actorId);
            const unRegister = websocket.register(agent);
            return () => {
                unRegister();
            }
        }, []);
    
        return <EL {...props} setPosition={setPosition}/>;
    }
}

const BuyInLayer = (props: PropsWithChildren<IBuyInProps>) => {
    const { setPosition, inSeatPlayerPosition } = props;
    return <container>
        {
            [
                { x: 228, y: -16 },
                { x: 648, y: -16 },
                { x: 228, y: 484 },
                { x: 648, y: 484 }
            ].map((item, index) => {
                const { x, y } = item;
                return !inSeatPlayerPosition[index] && <UIButton key={`BuyIn${index}`} x={x} y={y} click={setPosition.bind(null, index)}>
                    <AtlasGames img="img_cannon_container_small_up.png" />
                    <AtlasGames img="btn_join.png"  />
                </UIButton>
            })
        }
    </container>
}

export const BuyIn = BuyInHOC(BuyInLayer);