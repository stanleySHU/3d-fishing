import React, { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';
import { LobbyDataSourceContext } from '../../model/context/GameDataProvider';
import { WebsocketService } from '../../services/websocket';
import { getBuyInCurrency } from '../../units/chips';
import { PlayerInfoModel } from '../../model/socket/PlayerInfoModel';
import { BuyIn } from './BuyInLayer';
import { InSeatPlayerLayer } from './InSeatPlayerLayer';
import { InSeatUserLayer } from './InSeatUserLayer';
import { getSeatExistPlayerArrMap } from '../../units/GameLib';

type ISubComponentProps = {
    user?: PlayerInfoModel;
}

export const PlayerLayers = (props) => {
    const [actorId, user, tableInfo, playerState] = useContextSelector(LobbyDataSourceContext, (e) => {
        return [e.actorId, e.user, e.tableInfo, e.playerState];
    });

    const websocket = WebsocketService();
    const agent = {

    }

    useEffect(() => {
        const unRegister = websocket.register(agent);
        return () => {
            unRegister();
        }
    }, []);

    return <adtFullscreenUi name='players-mod' idealWidth={960} idealHeight={540}>
        <container>
            <BuyIn actorId={actorId} buyInCurrency={getBuyInCurrency(tableInfo.currency)} inSeatPlayerPosition={ getSeatExistPlayerArrMap(playerState.playerInfoPositionMap) } userInSeat={!!playerState.playerInfoUserIdMap[user.id]}/>
            <InSeatPlayerLayer/>
            <InSeatUserLayer/>
        </container>
    </adtFullscreenUi>;
}


