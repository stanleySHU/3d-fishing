import { _ReactPixi, Container, Graphics } from "@inlet/react-pixi"
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react"
import { Graphics as pixiGraphics } from 'pixi.js';
import { ATLAS_AVATARS } from "../../scenes1/assets"
import { padStart } from "../../units/string"
import { AtlasImage, IAtlasImage } from "./AtlasImage"

export type IAvatarProps = {
    avatarId: number,
    radius?: number
} & _ReactPixi.ISprite

const AtlasAvatars = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_AVATARS}/>
}

export const Avatar = (props: IAvatarProps) => {
    const maskRef = useRef(null);
    const update = useState()[1];
    const { avatarId, radius } = props;

    useEffect(() => {
        update(null);
    }, []);
    
    const drawMask = useCallback((g) => {
        g.clear();
        g.lineStyle(0);
        g.beginFill(0x000000);
        g.drawRoundedRect(0, 0, 144, 144, radius);
        g.endFill()
    }, [radius])

    return <AtlasAvatars {...props} img={`${padStart(avatarId || 0, 4)}.jpg`} mask={maskRef.current}> 
        { radius && <Graphics draw={drawMask} ref={maskRef}/> }
    </AtlasAvatars>
}