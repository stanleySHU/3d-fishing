import { Container, _ReactPixi, Text } from "@inlet/react-pixi"
import { AtlasGames } from "../assets"
import { PropsWithChildren, useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { GameDataSourceContext } from "../../model/context/GameDataProvider";
import { UICannonFresher, UICannonAdvanted, UICannonMaster } from '../assets';
import { isRoomAdvanted, isRoomFree, isRoomFresher } from '../../units/GameLib';
import { UIButton } from "../../components/pixi/Button";
import { Scalar } from '@babylonjs/core';
import { FCChipText } from "../../components/pixi/ChipText";

type IFortContainerProps = _ReactPixi.IContainer & {
    playerPosition: 0 | 1 | 2 | 3,
    onAdd?: () => void,
    onSub?: () => void
    radians: number,
    shootAmount: number,
    setShootAmount: (number) => void
}
const SKIN_OF_POSITION = ['red', 'green', 'blue', 'yellow'];
const CANNON_AMOUNTS_FRESHER = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
const CANNON_AMOUNTS_ADVANTED = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];
const CANNON_AMOUNTS_MASTER = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const CANNON_AMOUNTS_FRESHER_COUNT = CANNON_AMOUNTS_FRESHER.length;
const CANNON_AMOUNTS_ADVANTED_COUNT = CANNON_AMOUNTS_ADVANTED.length;
const CANNON_AMOUNTS_MASTER_COUNT = CANNON_AMOUNTS_MASTER.length;

const FortContainer = (props: PropsWithChildren<IFortContainerProps>) => {
    const { children, onAdd, onSub, shootAmount } = props;

    return <Container {...props} >
        <AtlasGames img="img_cannon_container_large.png" />
        <Container>
            {children}
            <Container x={58} y={16} >
                <AtlasGames img="img_cannon_value_container.png" />
                <FCChipText x={32.5} y={14} anchor={[0.5, 0.5]} amount={shootAmount} style={{ fontSize: "15px", fill: "0xe2d8cf", stroke: "#33194d", strokeThickness: 4, fontWeight: 'bolder' }} />
            </Container>
            <UIButton>
                <AtlasGames x={11} y={8} img="cannon_-.png" click={onSub} />
            </UIButton>
            <UIButton>
                <AtlasGames x={125} y={8} img="cannon_+.png" click={onAdd} />
            </UIButton>
        </Container>
    </Container>
}

const FortContainerFresher = (props: IFortContainerProps) => {
    const { playerPosition, setShootAmount, radians } = props;
    const [amountLv, setAmountLv] = useState(0);

    function onAdd() {
        setLv(amountLv + 1);
    }

    function onSub() {
        setLv(amountLv - 1);
    }

    function setLv(lv) {
        setAmountLv(Scalar.Clamp(lv, 0, CANNON_AMOUNTS_FRESHER_COUNT));
    }

    useEffect(() => {
        setShootAmount(CANNON_AMOUNTS_FRESHER[amountLv]);
    }, [amountLv]);

    return <FortContainer {...props} onAdd={onAdd} onSub={onSub}>
        <UICannonFresher x={91.5} y={65} skin={SKIN_OF_POSITION[playerPosition]} loop={true} action={'lv1cannon'} scale={0.25} rotation={radians} />
    </FortContainer>
}

const FortContainerAdvanted = (props: IFortContainerProps) => {
    const { playerPosition, setShootAmount, radians } = props;
    const [amountLv, setAmountLv] = useState(0);

    function onAdd() {
        setLv(amountLv + 1);
    }

    function onSub() {
        setLv(amountLv - 1);
    }

    function setLv(lv) {
        setAmountLv(Scalar.Clamp(lv, 0, CANNON_AMOUNTS_ADVANTED_COUNT));
    }

    useEffect(() => {
        setShootAmount(CANNON_AMOUNTS_ADVANTED[amountLv]);
    }, [amountLv]);

    return <FortContainer {...props} onAdd={onAdd} onSub={onSub}>
        <UICannonAdvanted x={91.5} y={65} skin={SKIN_OF_POSITION[playerPosition]} loop={true} action={'lv3cannon'} scale={0.25} rotation={radians} />
    </FortContainer>
}

const FortContainerMaster = (props: IFortContainerProps) => {
    const { playerPosition, setShootAmount, radians } = props;
    const [amountLv, setAmountLv] = useState(0);

    function onAdd() {
        setLv(amountLv + 1);
    }

    function onSub() {
        setLv(amountLv - 1);
    }

    function setLv(lv) {
        setAmountLv(Scalar.Clamp(lv, 0, CANNON_AMOUNTS_MASTER_COUNT));
    }

    useEffect(() => {
        setShootAmount(CANNON_AMOUNTS_MASTER[amountLv]);
    }, [amountLv]);

    return <FortContainer {...props} onAdd={onAdd} onSub={onSub}>
        <UICannonMaster x={91.5} y={65} skin={SKIN_OF_POSITION[playerPosition]} loop={true} action={'lv5cannon'} scale={0.25} rotation={radians} />
    </FortContainer>
}

export const Fort = (props: IFortContainerProps) => {
    const tableInfo = useContextSelector(GameDataSourceContext, (e) => {
        return e.tableInfo;
    });

    return (
        (isRoomFree(tableInfo) || isRoomFresher(tableInfo)) ?
            <FortContainerFresher {...props} /> : (isRoomAdvanted(tableInfo) ?
                <FortContainerAdvanted {...props} /> : <FortContainerMaster {...props} />)
    )
}

