import React, { ReactElement, ReactNode, useEffect, useReducer, useRef } from "react";
import { Action, reducer, initialState, Push } from '../store/NavController';
import { ISceneProps } from "./BaseScene";

export type INavControllerProps = {
    enter: string
    children: ReactNode
}

type NavContextType = {
    SceneManager: React.Dispatch<Action>
};
export const NavContext = React.createContext<NavContextType>({
    SceneManager: null
});

export const NavController = (props: INavControllerProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { enter, children } = props;
    const sceneNodeMap = useRef({});

    useEffect(() => { 
        React.Children.forEach(children, (child: ReactElement<ISceneProps>) => {
            sceneNodeMap.current[child.props.id] = child
        });
        dispatch(Push(enter));
    }, []);
    
    return <NavContext.Provider value={{SceneManager: dispatch}}>
        {
            state.scenes.map(id => {
              return sceneNodeMap.current[id];
            })
        }
    </NavContext.Provider>;
}