interface INavSceneOptions {
    readonly id: string;
    readonly args: any;
}

export type InitialState = {
    scenes: INavSceneOptions[],
    current: string
};

export type Action = {
    type: 'PUSH' | 'POP' | 'REPLACE',
    payload: {
        id?: string,
        args?: any
    }
};

export const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case 'PUSH': {
            return {...state, scenes: [...state.scenes, {id: action.payload.id, args: action.payload.args}]}
        }
        case 'POP': {
            let scenes = [...state.scenes];
            scenes.pop();
            return {...state, scenes: scenes}
        }
        case 'REPLACE': {
            let scenes = [...state.scenes];
            scenes.pop();
            scenes.push({id: action.payload.id, args: action.payload.args});
            return {...state, scenes: scenes};
        }
        default: 
    }
    return state;
}

export const initialState: InitialState = {
    scenes: [],
    current: null
}

export const Push = (id: string, initialState?: {[key: string]: any}): Action => {
    return {
        type: 'PUSH',
        payload: {
            id: id,
            args: initialState
        }
    }
}

export const Pop = (): Action => {
    return {
        type: 'POP',
        payload: null
    }
}

export const Replace = (id: string, initialState?: {[key: string]: any}): Action => {
    return {
        type: 'REPLACE',
        payload: {
            id: id,
            args: initialState
        }
    }
}