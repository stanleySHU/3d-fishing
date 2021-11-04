import { Image } from '@babylonjs/gui';
import { BabylonNode, FiberImageProps, FiberImagePropsCtor } from 'react-babylonjs';

export type IAvatarProps = {
    index: number
} & FiberImageProps & FiberImagePropsCtor & BabylonNode<Image>;

export const Avatar = (props: IAvatarProps) => {
    return <babylon-image {...props} url='/assets/img/Avatars@2x.jpg' sourceHeight={288} sourceWidth={288} sourceLeft={288*(props.index%14)} sourceTop={288*Math.floor(props.index/14)}/>
}