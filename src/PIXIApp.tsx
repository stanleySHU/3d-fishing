import { Engine as ReactBabylonjsEngine } from './App';
import { Engine as babylonjsEngine } from '@babylonjs/core';

import { Renderer, Container as pixiContainer } from 'pixi.js';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

type IPIXIProps = {
    reactBablonjsEngineRef: React.MutableRefObject<ReactBabylonjsEngine>
}

export const PIXIApp = (props: PropsWithChildren<IPIXIProps>) => {
    const [stage2D, setStage2D] = useState<pixiContainer>(null);
    const [stage2DBg, setStage2DBg] = useState<pixiContainer>(null);

    useEffect(() => {
        const stage = new pixiContainer();
        const stageBg = new pixiContainer();
        setStage2D(stage);
        setStage2DBg(stageBg);

        const reactBablonjsEngine = props.reactBablonjsEngineRef.current,
            engine: babylonjsEngine = (reactBablonjsEngine as any).engine,
            canvas = engine.getRenderingCanvas();

        const pixiRenderer = new Renderer({
            context: engine._gl as any,
            view: canvas,
            width: 960,
            height: 540,
            resolution: 1,
            clearBeforeRender: false
        });

        const afterEngineResizeObservable = reactBablonjsEngine.onAfterEngineResizeObservable.add((e) => {
            pixiRenderer.resize(960, 540);
        });

        const beforeRenderObservable = reactBablonjsEngine.onBeforeRenderLoopObservable.add((e) => {
            pixiRenderer.reset();
            pixiRenderer.render(stageBg);
        });

        const endRenderObservable = reactBablonjsEngine.onEndRenderLoopObservable.add((e) => {
            e.wipeCaches(true);
            pixiRenderer.reset();
            pixiRenderer.render(stage);
        });
        return () => {
            reactBablonjsEngine.onBeforeRenderLoopObservable.remove(beforeRenderObservable);
            reactBablonjsEngine.onEndRenderLoopObservable.remove(endRenderObservable);
            reactBablonjsEngine.onAfterEngineResizeObservable.remove(afterEngineResizeObservable);
        }
    }, []);

    return stage2D && stage2DBg && <ReactPixiAppProvider stage2D={stage2D} stage2DBg={stage2DBg}>
        {props.children}
    </ReactPixiAppProvider>;
}

//provider
type IReactPixiAppProviderProps = {
    stage2D: pixiContainer,
    stage2DBg: pixiContainer
}
type IReactPixiAppContextOptions = {
    stage2D: pixiContainer,
    stage2DBg: pixiContainer
};
export const ReactPixiAppContext = createContext<IReactPixiAppContextOptions>({} as any);
const ReactPixiAppProvider = (props: PropsWithChildren<IReactPixiAppProviderProps>) => {
    const { stage2D, stage2DBg } = props;
    return <ReactPixiAppContext.Provider value={{ stage2D: stage2D, stage2DBg: stage2DBg }}>
        {props.children}
    </ReactPixiAppContext.Provider>
}
