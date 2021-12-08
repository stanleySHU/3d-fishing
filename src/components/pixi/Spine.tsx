import { Container, _ReactPixi } from '@inlet/react-pixi'
import { useAssetsManager } from '../../loaders/pixi/AssetManager';
import { Spine } from "@pixi-spine/loader-uni";
import { useEffect, useRef, useState } from 'react';
import { Container as pixiContainer } from 'pixi.js' 

export type ISpineProps = {
    atlas?: string,
    skin: string,
    animation?: string,
    loop: boolean,
    speed?: number,
    onComplete?: () => void
} & _ReactPixi.IContainer;

export const UISpine = (props: ISpineProps) => {
    const { atlas, skin, animation, loop, speed, onComplete } = props;
    const containerRef = useRef<pixiContainer   >();
    const [spine, setSpine] = useState<Spine>(null);
    const resourceMap = useAssetsManager();
    const resource = resourceMap[atlas];

    useEffect(() => {
        if (containerRef.current) {
            const obj = new Spine(resource.spineData);
            containerRef.current.addChild(obj);
            setSpine(obj);
            return () => {

            }
        }
    }, []);

    useEffect(() => {
        if (spine) {
            spine.skeleton.setSkinByName(skin);
        }
    }, [skin, spine]);

    useEffect(() => {
        if (spine) {
            spine.state.setAnimation(0, animation, loop);

            const listener = {
                complete: onComplete
            };
            spine.state.addListener(listener);
            return () => {
                spine.state.removeListener(listener);
            }
        }
    }, [animation, loop, spine]);

    useEffect(() => {
        if (spine) {
            spine.state.timeScale = speed || 1;
        }
    }, [speed, spine])

    return <Container ref={containerRef} {...props}/>
}