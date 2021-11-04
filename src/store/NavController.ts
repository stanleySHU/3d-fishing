export type InitialState = {
    scenes: string[],
    current: string
};

export type Action = {
    type: 'PUSH' | 'POP' | 'REPLACE',
    payload: {
        id?: string
    }
};

export const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case 'PUSH': {
            return {...state, scenes: [...state.scenes, action.payload.id]}
        }
        case 'POP': {
            let scenes = [...state.scenes];
            scenes.pop();
            return {...state, scenes: scenes}
        }
        case 'REPLACE': {
            let scenes = [...state.scenes];
            scenes.pop();
            scenes.push(action.payload.id);
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

export const Push = (id: string): Action => {
    return {
        type: 'PUSH',
        payload: {
            id: id
        }
    }
}

export const Pop = (): Action => {
    return {
        type: 'POP',
        payload: null
    }
}

export const Replace = (id: string): Action => {
    return {
        type: 'REPLACE',
        payload: {
            id: id
        }
    }
}