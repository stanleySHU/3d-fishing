import { _ReactPixi } from "@inlet/react-pixi"
import { ATLAS_AVATARS } from "../../scenes1/assets"
import { padStart } from "../../units/string"
import { AtlasImage, IAtlasImage } from "./AtlasImage"

type IAvatarProps = {
    id: number,
} & _ReactPixi.ISprite

const AtlasAvatars = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_AVATARS}/>
}

export const Avatar = (props: IAvatarProps) => {
    const { id } = props;
    return <AtlasAvatars {...props} img={`${padStart(id || 0, 4)}.jpg`}/>
}