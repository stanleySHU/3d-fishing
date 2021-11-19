import { PropsWithChildren, useEffect, useState } from "react";
import { BuyinRangeModel } from "../../model/socket/BuyinRangeModel";
import { MessageModel } from "../../model/socket/MessageModel";
import { WebsocketService } from "../../services/websocket";
import { IBuyInCashType } from "../../units/customType";
import { AtlasGames } from "../assets";
import { Decimal } from 'decimal.js';

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
                return !inSeatPlayerPosition[index] && <babylon-button key={`BuyIn${index}`} left={item.x} top={item.y} width="122px" height="72px" horizontalAlignment={0} verticalAlignment={0} color='transparent' onPointerClickObservable={setPosition.bind(null, index)}>
                    <AtlasGames img="img_cannon_container_small_up.png" width="122px" height="72px" />
                    <AtlasGames img="btn_join.png" width="55px" height="55px" />
                </babylon-button>
            })
        }
    </container>
}

export const BuyIn = BuyInHOC(BuyInLayer);