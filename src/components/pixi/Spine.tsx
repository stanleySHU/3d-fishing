import { PixiComponent, applyDefaultProps, _ReactPixi, Container } from '@inlet/react-pixi'
import { Spine } from "@pixi-spine/loader-uni";
import { ISkeletonData, IAnimationStateListener } from '@pixi-spine/base';
import { useAssetsManager } from '../../loaders/pixi/AssetManager';
import React from 'react';

export { Spine }

interface SpineMix {
    from: string;
    to: string;
    duration: number;
}

type _ISpineProps = {
    spineData?: ISkeletonData,
    skin?: string,
    animation?: string,
    loop?: boolean,
    speed?: number,
    mixes?: SpineMix[],
    listener?: IAnimationStateListener
};

const _Spine = PixiComponent<_ISpineProps, Spine>("UISpine", {
    create: ({ spineData }) => {
        const spine = new Spine(spineData);
        return spine;
    },
    applyProps: (instance, oldProps, newProps) => {
        const {
            mixes = [],
            speed = 1,
            skin,
            animation,
            loop = false,
            listener,
            ...newP
        } = newProps;
        applyDefaultProps(instance, oldProps, newP);
        mixes.forEach(mix =>
            instance.stateData.setMix(mix.from, mix.to, mix.duration)
        )
        instance.state.setAnimation(0, animation, loop);
        instance.state.timeScale = speed;

        instance.skeleton.setSkinByName(skin);
        if (listener) {
            instance.state.clearListeners();
            instance.state.addListener(listener);
        }
    },
    config: {
        destroyChildren: false
    }
});

export type ISpineProps = _ISpineProps & _ReactPixi.IContainer & {
    atlas?: string
};

export const UISpine = React.forwardRef((props: ISpineProps, ref: any) => {
    const { atlas, skin, animation, loop, speed, listener, mixes } = props;
    const resourceMap = useAssetsManager();
    const resource = resourceMap[atlas];

    return <Container {...props}>
        <_Spine ref={ref} spineData={resource.spineData} mixes={mixes} skin={skin} animation={animation} loop={loop} speed={speed} listener={listener}></_Spine>
    </Container>
})