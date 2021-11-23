import { Image } from '@babylonjs/gui';
import { BabylonNode, FiberImageProps, FiberImagePropsCtor } from 'react-babylonjs';
import { IP2PCashCurrency } from '../../units/customType';
import { ICurrencyType } from './Chip';

export type IFlagProps = {
    currency: IP2PCashCurrency
} & FiberImageProps & FiberImagePropsCtor & BabylonNode<Image>;

export const Flag = (props: IFlagProps) => {
    return <babylon-image {...props} url={`/assets/img/2d/flags/${props.currency}.png`}/>
}