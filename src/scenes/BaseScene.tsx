import { createContext, BridgeProvider, useBridgeValue } from 'use-context-selector';
import { AppContext } from '../model/context/AppProvider';
import { render, unmountComponentAtNode } from "@inlet/react-pixi"
import { PropsWithChildren, ReactElement, useEffect } from "react"
import { useContextSelector } from 'use-context-selector';
import { ReactPixiAppContext } from "../PIXIApp";


export type ISceneProps = PropsWithChildren<{
    id: string,
    next?: string
}>

type IViewControllerProps = {
    children: [ReactElement, ReactElement]
}
export const ViewController = (props: IViewControllerProps) => {
    const appContextBridge = useBridgeValue(AppContext);
    const stage2D = useContextSelector(ReactPixiAppContext, (e) => {
        return e.stage2D
    });
    
    useEffect(() => {
        render(<BridgeProvider context={AppContext} value={appContextBridge}>
            {props.children[0]}
        </BridgeProvider>, stage2D);
        return () => {
            unmountComponentAtNode(stage2D);
        }
    }, []);

    return props.children[1];
}