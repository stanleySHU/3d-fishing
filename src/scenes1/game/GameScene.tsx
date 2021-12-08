import { Container, Sprite, Text } from "@inlet/react-pixi";
import { GameViewController } from "../../scenes/BaseScene";
import { InSeatPlayerLayer } from './InSeatPlayerLayer';
import { InSeatUserLayer } from './InSeatUserLayer';
import { BuyIn } from './BuyInLayer';
import { AppContext } from '../../model/context/AppProvider';
import { useContextSelector, createContext } from 'use-context-selector';
import { getSeatExistPlayerArrMap } from '../../units/GameLib';
import { getBuyInCurrency } from '../../units/chips';
import { GameDataSourceProvider, GameDataSourceContext, IGameDataContext } from '../../model/context/GameDataProvider';
import { Scene } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';
import { FishingPool } from "./FishPool";
import { BulletPool } from "./BulletPool";
import { AtlasBullets } from "../assets";

export const GameScene = (props) => {
    const { actorId } = props.args;
    const tableUpdateMap = useContextSelector(AppContext, e => {
        return e.tableUpdateMap;
    });
    const tableUpdateData = tableUpdateMap[actorId];
    return <GameDataSourceProvider tableUpdate={tableUpdateData}>
        <GameSceneContainer/>
    </GameDataSourceProvider>
}

const GameSceneContainer = (props) => {
    return <GameViewController>
        <GameScene2D />
        <GameScene3D />
        <Container>
            <Sprite image="/assets/img/TableBg.png" />
        </Container>
    </GameViewController>
}

const GameScene2D = (props) => {
    const [user, actorId, tableInfo, playerState] = useContextSelector(GameDataSourceContext, (e) => {
        return [e.user, e.actorId, e.tableInfo, e.playerState];
    });
    return <Container>
        <BulletPool/>
        <Container>
            <InSeatPlayerLayer />
            <InSeatUserLayer />
            <BuyIn actorId={actorId} buyInCurrency={getBuyInCurrency(tableInfo.currency)} inSeatPlayerPosition={getSeatExistPlayerArrMap(playerState.playerInfoPositionMap)} userInSeat={!!playerState.playerInfoUserIdMap[user.id]} />
        </Container>
    </Container>;
}

export const Game3DDataSourceContext = createContext<IGameDataContext>({} as any);
const GameScene3D = (props) => {
    const context = useContextSelector(GameDataSourceContext, (e) => {
        return e;
    });

    return <Scene autoClear={false}>
        <freeCamera name='camera' position={new Vector3(0, 27, 0)} rotation={new Vector3(1.57, 0, 0)} fov={1.57} maxZ={100} />
        <directionalLight name='light' direction={new Vector3(0, -1, -1)}/>
        <Game3DDataSourceContext.Provider value={context}>
            <FishingPool/>
        </Game3DDataSourceContext.Provider>
    </Scene>;
}
