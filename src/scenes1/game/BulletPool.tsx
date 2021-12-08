import { Container } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { GameDataSourceContext } from "../../model/context/GameDataProvider";
import { AtlasBullets } from '../assets';
import { nowMillis } from '../../units/date';

export const BulletPool = (props) => {
    const [date, setDate] = useState(0);
    const [poolState] = useContextSelector(GameDataSourceContext, (e) => {
        return [e.poolState];
    });

    useEffect(() => {
        const frameTimer = setInterval(() => {
            setDate(nowMillis())
        }, 1000 / 30);
        return () => {
            clearInterval(frameTimer);
        }
    }, []);

    return <Container>
        {
            poolState.bullets.map(bullet => {
                return <AtlasBullets key={bullet.bulletId} img="Lvl1n2_Blue.png" scale={0.5} anchor={[0.5, 0.5]} x={bullet.position.x} y={bullet.position.y} rotation={bullet.radians + Math.PI/2}/>
            })
        }
    </Container>
}