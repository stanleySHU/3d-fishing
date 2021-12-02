import { BridgeProvider, useBridgeValue, useContextSelector } from 'use-context-selector';
import { AppContext } from '../model/context/AppProvider';
import { render, unmountComponentAtNode, } from "@inlet/react-pixi"
import { PropsWithChildren, ReactElement, useEffect } from "react"
import { ReactPixiAppContext } from "../PIXIApp";
import { GameDataSourceContext } from '../model/context/GameDataProvider';


export type ISceneProps = PropsWithChildren<{
    id: string,
    next?: string
}>

type IViewControllerProps = {
    children: [ReactElement, ReactElement, ReactElement?]
}
export const ViewController = (props: IViewControllerProps) => {
    const appContextBridge = useBridgeValue(AppContext);
    const [stage2D, stage2DBg] = useContextSelector(ReactPixiAppContext, (e) => {
        return [e.stage2D, e.stage2DBg];
    });
    const [stage1, stage2, stage3] = props.children;

    useEffect(() => {
        if (stage3) {
            render(stage3, stage2DBg);
        }
        render(<BridgeProvider context={AppContext} value={appContextBridge}>
            {stage1}
        </BridgeProvider>, stage2D);
        return () => {
            unmountComponentAtNode(stage2D);
            unmountComponentAtNode(stage2DBg);
        }
    }, []);

    return stage2;
}

export const GameViewController = (props: IViewControllerProps) => {
    const gameContextBridge = useBridgeValue(GameDataSourceContext);
    const [stage2D, stage2DBg] = useContextSelector(ReactPixiAppContext, (e) => {
        return [e.stage2D, e.stage2DBg];
    });
    const [stage1, stage2, stage3] = props.children;

    useEffect(() => {
        render(<BridgeProvider context={GameDataSourceContext} value={gameContextBridge}>
                {stage1}
            </BridgeProvider>, stage2D);
        if (stage3) {
            render(stage3, stage2DBg);
        }
        return () => {
            unmountComponentAtNode(stage2D);
            unmountComponentAtNode(stage2DBg);
        }
    }, []);

    return stage2;
}
