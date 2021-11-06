import { ISpriteJSONAtlas, ISpriteJSONSprite } from '@babylonjs/core';
import { Image } from '@babylonjs/gui';
import { BabylonNode, FiberImageProps, FiberImagePropsCtor } from 'react-babylonjs';
import { useAssetsManager } from '../resourceManager/AssetManager';
import { TextFileResource } from '../resourceManager/TextFileResource';

export type IAtlasImage = {
    atlas?: string,
    img: string
} &  FiberImageProps & FiberImagePropsCtor & BabylonNode<Image>;

export const AtlasImage = (props: IAtlasImage) => {
    const { atlas, img, width, height } = props;
    const { getResource} = useAssetsManager();
    const json = getResource<TextFileResource>(atlas).getjson<ISpriteJSONAtlas>();
    const frames: ISpriteJSONSprite = json.frames[img];
    const { frame, rotated } = frames;

    if (rotated) {
        return <babylon-image {...props} sourceTop={frame.y} sourceLeft={frame.x} sourceWidth={frame.h} sourceHeight={frame.w} width={props.height} height={props.width} rotation={Math.PI/-2}/>
    } else {
        return <babylon-image {...props} sourceTop={frame.y} sourceLeft={frame.x} sourceWidth={frame.w} sourceHeight={frame.h} />
    }
}