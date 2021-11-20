import { Engine } from 'react-babylonjs';
import { Engine as babylonjsEngine } from '@babylonjs/core';

import { Renderer, Container as pixiContainer } from 'pixi.js';
import { useEffect } from 'react';
import { render, Sprite, Text } from '@inlet/react-pixi';
import { createContext  } from 'use-context-selector';

type IPIXIProps = {
    reactBablonjsEngineRef: React.MutableRefObject<Engine>
}

export const PIXIApp = (props: IPIXIProps) => {
    useEffect(() => {
        const reactBablonjsEngine = props.reactBablonjsEngineRef.current,
            engine: babylonjsEngine = (reactBablonjsEngine as any).engine;

        const pixiRenderer = new Renderer({
            context: engine._gl as any,
            view: engine.getRenderingCanvas(),
            width: engine.getRenderWidth(),
            height: engine.getRenderHeight(),
            clearBeforeRender: false
        });
        const container = new pixiContainer();
        render(<ReactPixiApp />, container)

        const resize = reactBablonjsEngine.onResizeWindow;
        reactBablonjsEngine.onResizeWindow = () => {
            resize();
        }
        const beforeRenderObservable = reactBablonjsEngine.onBeforeRenderLoopObservable.add((e) => {
            pixiRenderer.reset();
        });

        const endRenderObservable = reactBablonjsEngine.onEndRenderLoopObservable.add((e) => {
            e.wipeCaches(true);
            pixiRenderer.reset();
            pixiRenderer.render(container);
        });
        return () => {
            reactBablonjsEngine.onResizeWindow = resize;
            reactBablonjsEngine.onBeforeRenderLoopObservable.remove(beforeRenderObservable);
            reactBablonjsEngine.onEndRenderLoopObservable.remove(endRenderObservable);
        }
    }, []);

    return null;;
}

const ReactPixiApp = () => {
    return <ReactPixiAppProvider>
        <Sprite image="https://i.imgur.com/1yLS2b8.jpg"/>
    </ReactPixiAppProvider>
}


type IReactPixiAppOptions = {

}
const ReactPixiAppContext = createContext<IReactPixiAppOptions>({});
const ReactPixiAppProvider = (props) => {
    return <ReactPixiAppContext.Provider value={{}}>
        {props.children}
    </ReactPixiAppContext.Provider>
}
