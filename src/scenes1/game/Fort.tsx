import { Container, _ReactPixi, Text } from "@inlet/react-pixi"
import { AtlasGames, ATLAS_CANNON_LV0, ATLAS_CANNON_LV1, ATLAS_CANNON_LV2 } from "../assets"
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { GameDataSourceContext } from "../../model/context/GameDataProvider";
import { isRoomAdvanted, isRoomFree, isRoomFresher } from '../../units/GameLib';
import { UIButton } from "../../components/pixi/Button";
import { Scalar } from '@babylonjs/core';
import { FCChipText } from "../../components/pixi/ChipText";
import { UISpine, Spine } from "../../components/pixi/Spine";

const SKIN_OF_POSITION = ['red', 'green', 'blue', 'yellow'];
const CANNON_AMOUNTS_FRESHER = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
const CANNON_AMOUNTS_ADVANTED = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];
const CANNON_AMOUNTS_MASTER = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const CANNON_AMOUNTS_FRESHER_MAX = CANNON_AMOUNTS_FRESHER.length - 1;
const CANNON_AMOUNTS_ADVANTED_MAX = CANNON_AMOUNTS_ADVANTED.length - 1;
const CANNON_AMOUNTS_MASTER_MAX = CANNON_AMOUNTS_MASTER.length - 1;

const SPINE_MIXES_FRESHER = [
    {from:"lv1cannon_fire", to: "lv1cannon", duration: 0.3},
    {from:"lv2cannon_fire", to: "lv2cannon", duration: 0.3},
];
const SPINE_MIXES_ADVANTED = [
    {from:"lv3cannon_fire", to: "lv3cannon", duration: 0.3},
    {from:"lv4cannon_fire", to: "lv4cannon", duration: 0.3},
];

const SPINE_MIXES_MASTER = [
    {from:"lv5cannon_fire", to: "lv5cannon", duration: 0.3},
    {from:"lv6cannon_fire", to: "lv6cannon", duration: 0.3},
];

type ICannonFresherAnimation = 'lv1cannon' | 'lv1cannon_fire' | 'lv2cannon' | 'lv2cannon_fire';
type ICannonAdvantedAnimation = 'lv3cannon' | 'lv3cannon_fire' | 'lv4cannon' | 'lv4cannon_fire';
type ICannonMasterAnimation = 'lv5cannon' | 'lv5cannon_fire' | 'lv6cannon' | 'lv6cannon_fire' | 'lv6cannon_exit' | 'lv6cannon_open';
type ICannonAnimation = ICannonFresherAnimation | ICannonAdvantedAnimation | ICannonMasterAnimation;

type IFortContainerProps = _ReactPixi.IContainer & {
    playerPosition: 0 | 1 | 2 | 3,
    onAdd?: () => void,
    onSub?: () => void
    radians: number,
    shootAmount: number,
    setShootAmount: (number) => void,
    newBulletId: number
}

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
            <UIButton click={onSub}>
                <AtlasGames x={11} y={8} img="cannon_-.png"/>
            </UIButton>
            <UIButton click={onAdd}>
                <AtlasGames x={125} y={8} img="cannon_+.png" />
            </UIButton>
        </Container>
    </Container>
}

const FortContainerFresher = (props: IFortContainerProps) => {
    const { playerPosition, setShootAmount, radians, newBulletId } = props;
    const [amountLv, setAmountLv] = useState(0);
    const spineRef = useRef<Spine>();

    function onAdd() {
        setLv(amountLv + 1);
    }

    function onSub() {
        setLv(amountLv - 1);
    }

    function setLv(lv) {
        setAmountLv(Scalar.Clamp(lv, 0, CANNON_AMOUNTS_FRESHER_MAX));
    }

    useEffect(() => {
        if (newBulletId) {
            spineRef.current.state.addAnimation(0, 'lv1cannon_fire', false, 0);
        }
    }, [newBulletId]);

    useEffect(() => {
        setShootAmount(CANNON_AMOUNTS_FRESHER[amountLv]);
    }, [amountLv]);

    return <FortContainer {...props} onAdd={onAdd} onSub={onSub}>
        <UISpine ref={spineRef} x={91.5} y={50} skin={SKIN_OF_POSITION[playerPosition]} loop={true} scale={0.25} rotation={radians} pivot={[0,45]} atlas={ATLAS_CANNON_LV0} animation={'lv1cannon'} mixes={SPINE_MIXES_FRESHER}/>
    </FortContainer>
}

const FortContainerAdvanted = (props: IFortContainerProps) => {
    const { playerPosition, setShootAmount, radians, newBulletId } = props;
    const [amountLv, setAmountLv] = useState(0);
    const spineRef = useRef<Spine>();

    function onAdd() {
        setLv(amountLv + 1);
    }

    function onSub() {
        setLv(amountLv - 1);
    }

    function setLv(lv) {
        setAmountLv(Scalar.Clamp(lv, 0, CANNON_AMOUNTS_ADVANTED_MAX));
    }

    useEffect(() => {

    }, [newBulletId]);

    useEffect(() => {
        setShootAmount(CANNON_AMOUNTS_ADVANTED[amountLv]);
    }, [amountLv]);

    return <FortContainer {...props} onAdd={onAdd} onSub={onSub}>
        <UISpine x={91.5} y={50} skin={SKIN_OF_POSITION[playerPosition]} loop={false} scale={0.25} rotation={radians} pivot={[0,45]} atlas={ATLAS_CANNON_LV1} animation={'lv3cannon'} mixes={SPINE_MIXES_ADVANTED}/>
    </FortContainer>
}

const FortContainerMaster = (props: IFortContainerProps) => {
    const { playerPosition, setShootAmount, radians, newBulletId } = props;
    const [amountLv, setAmountLv] = useState(0);
    const spineRef = useRef<Spine>();

    function onAdd() {
        setLv(amountLv + 1);
    }

    function onSub() {
        setLv(amountLv - 1);
    }

    function setLv(lv) {
        setAmountLv(Scalar.Clamp(lv, 0, CANNON_AMOUNTS_MASTER_MAX));
    }

    useEffect(() => {
        setShootAmount(CANNON_AMOUNTS_MASTER[amountLv]);
    }, [amountLv]);

    useEffect(() => {

    }, [newBulletId]);

    return <FortContainer {...props} onAdd={onAdd} onSub={onSub}>
        <UISpine x={91.5} y={50} skin={SKIN_OF_POSITION[playerPosition]} loop={false} scale={0.25} rotation={radians} pivot={[0,45]} atlas={ATLAS_CANNON_LV2} animation={'lv5cannon'} mixes={SPINE_MIXES_MASTER}/>
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

