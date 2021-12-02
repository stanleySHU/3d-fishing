import { Suspense, useEffect, useState } from "react";
import { Fish } from "./Fish";
import { Vector3 } from "@babylonjs/core";
import { useContextSelector } from "use-context-selector";
import { GameDataSourceContext } from "../../model/context/GameDataProvider";
import { Game3DDataSourceContext } from "./GameScene";
import { nowMillis } from '../../units/date';

export const FishingPool = () => {
    const [date, setDate] = useState(0);
    const poolState = useContextSelector(Game3DDataSourceContext, (e) => {
        return e.poolState;
    });
    
    useEffect(() => {
        const frameTimer = setInterval(() => {
            setDate(nowMillis())
        }, 1000 / 30);
        return () => {
            clearInterval(frameTimer);
        }
    }, []);

    return <transformNode name="pool-mod">
        <Suspense fallback={null}>
            {
                poolState.fishs.map((model) => {
                    let name = `FISH${model.id}`;
                    return <Fish disposeInstanceOnUnmount={true} key={name} status="Swim" name={name} fishType={model.type} scaling={new Vector3(0.5, 0.5, 0.5)} position={model.position} setDirection={[model.direction, null, null, model.direction.x > 0 ? 1.57 : -1.57]}/>;
                })
            }
        </Suspense>
    </transformNode>
}