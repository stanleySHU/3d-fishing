import { Sprite, _ReactPixi } from "@inlet/react-pixi"
import { useAssetsManager } from '../../loaders/pixi/AssetManager';

export type IAtlasImage = {
    atlas?: string,
    img: string
} & _ReactPixi.ISprite;

export const AtlasImage = (props: IAtlasImage) => {
    const { atlas, img } = props;
    const resourceMap = useAssetsManager();
    const texture = resourceMap[atlas].textures[img];
    return <Sprite texture={texture} {...props}/>
}