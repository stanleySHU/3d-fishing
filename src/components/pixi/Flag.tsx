import { _ReactPixi } from "@inlet/react-pixi"
import { ATLAS_FLAGS } from "../../scenes1/assets";
import { IP2PCashCurrency } from "../../units/customType";
import { AtlasImage, IAtlasImage } from "./AtlasImage";

export type IFlagProps = {
    currency: IP2PCashCurrency
} & _ReactPixi.ISprite;

const AtlasFlags = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_FLAGS}/>
}

export const Flag = (props: IFlagProps) => {
    return <AtlasFlags {...props} img={`${props.currency}.png`}/>
}