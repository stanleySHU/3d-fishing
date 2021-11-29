import { Container, Sprite } from "@inlet/react-pixi";
import { ViewController } from "../../scenes/BaseScene";
import { InSeatPlayerLayer } from './InSeatPlayerLayer';
import { InSeatUserLayer } from './InSeatUserLayer';
import { BuyIn } from './BuyInLayer';
import { AppContext } from '../../model/context/AppProvider';
import { useContextSelector } from 'use-context-selector';
import { getSeatExistPlayerArrMap } from '../../units/GameLib';
import { getBuyInCurrency } from '../../units/chips';

export const GameScene = (props) => {
    return <ViewController>
        <GameScene2D />
        <GameScene3D />
    </ViewController>
}

export const GameScene2D = (props) => {
    const [user] = useContextSelector(AppContext, (e) => {
        return [e.user];
    });

    return <Container>
        <Container>
            <Sprite image="/assets/img/TableBg.jpg" />
        </Container>
        <Container>
            {/* <BuyIn actorId={actorId} buyInCurrency={getBuyInCurrency(tableInfo.currency)} inSeatPlayerPosition={getSeatExistPlayerArrMap(playerState.playerInfoPositionMap)} userInSeat={!!playerState.playerInfoUserIdMap[user.id]} /> */}
            {/* <InSeatPlayerLayer /> */}
            <InSeatUserLayer />
        </Container>
    </Container>;
}

export const GameScene3D = (props) => {
    return null;
}
