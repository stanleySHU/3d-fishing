import { Image } from '@babylonjs/gui';
import { BabylonNode, FiberImageProps, FiberImagePropsCtor } from 'react-babylonjs';

type IDefaultChipType = 'diamond_1' | 'diamond' | 'fish' | 'fishFree' | 'free' | 'realcash' | 'normal';
export type ICurrencyType = 'IDR' | 'INR' | 'KRW' | 'MYR' | 'RMB' | 'THB' | 'USD' | 'VND';
type IChipType = IDefaultChipType | ICurrencyType;

export type IChipProps = {
    type: IChipType
} & FiberImageProps & FiberImagePropsCtor & BabylonNode<Image>;

export const Chip = (props: IChipProps) => {
    return <babylon-image {...props} url={`/assets/img/2d/coins/${props.type}.png`}/>
}