import { authAPI, resultCodeEnum, resultCodeForCapcthaEnum, securityAPI } from "../api/api";
import {stopSubmit} from "redux-form";
 

const SET_USER_DATA = 'social/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social/auth/GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType2 = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null //if null, then captcha is not requred
}

export type InitialStateType = typeof initialState;



const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, 
    login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
        type: SET_USER_DATA as typeof SET_USER_DATA, 
        payload: { userId, email, login, isAuth }
});

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});




export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === resultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === resultCodeForCapcthaEnum.CaptchaIsRequared) {
            dispatch(getCaptchaUrl());
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("login", { _error: message }));
        }


    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response: any = await securityAPI.getCaptchaUrl();
    const captchaUrl: string = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()

    if (meData.resultCode === resultCodeEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default authReducer;