import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InititalStateType = {
    initialized: boolean
}


let initialState: InititalStateType = {
    initialized: false
}

const appReducer = (state: InititalStateType = initialState, action: any): InititalStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
    default:
        return state;
    }
}

type InititalizedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InititalizedSuccessActionType  => ({ type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then( () => {
        dispatch(initializedSuccess());
    }) 
}

export default appReducer;