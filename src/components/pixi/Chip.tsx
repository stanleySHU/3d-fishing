import { _ReactPixi } from "@inlet/react-pixi"
import { ATLAS_COINS } from "../../scenes1/assets";
import { AtlasImage, IAtlasImage } from "./AtlasImage";

type IDefaultChipType = 'diamond_1' | 'diamond' | 'fish' | 'fishFree' | 'free' | 'realcash' | 'normal';
export type ICurrencyType = 'IDR' | 'INR' | 'KRW' | 'MYR' | 'RMB' | 'THB' | 'USD' | 'VND';
type IChipType = IDefaultChipType | ICurrencyType;

export type IChipProps = {
    type: IChipType
} & _ReactPixi.ISprite;

const AtlasCoins = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_COINS}/>
}

export const Chip = (props: IChipProps) => {
    return <AtlasCoins {...props} img={`${props.type}.png`}/>
}