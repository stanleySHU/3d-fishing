import { Suspense } from "react";
import { Fish } from "./Fish";
import { LobbyDataSourceContext } from '../../model/context/GameDataProvider';
import { useContextSelector } from 'use-context-selector';
import { Vector3 } from "@babylonjs/core";

export const FishingPool = () => {
    const poolState = useContextSelector(LobbyDataSourceContext, (e) => {
        return e.poolState;
    });

    return <transformNode name="pool-mod">
        <Suspense fallback={null}>
            {
                poolState.fishs.map((model) => {
                    let name = `FISH${model.id}`;
                    return <Fish key={name} status="Swim" name={name} fishType={model.type} scaling={new Vector3(0.5, 0.5, 0.5)} position={model.position} setDirection={[model.direction, null, null, model.direction.x > 0 ? 1.57 : -1.57]}/>;
                })
            }
        </Suspense>
    </transformNode>
}