import { usersAPI, profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostType, Profiletype } from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const DELETE_POST = 'DELETE_POST';


let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', likesCount: 10 },
        { id: 2, message: 'Its is my first post', likesCount: 15 },
        { id: 3, message: 'Good', likesCount: 16 },
        { id: 4, message: 'How are you', likesCount: 20 },
        { id: 5, message: 'Im Fine', likesCount: 0 },
        { id: 6, message: 'And, you', likesCount: 0 },
    ] as Array<PostType>,
    profile: null as Profiletype | null,
    status: "",
    newPostText: ""
};

export type InitialStateType = typeof initialState;

export const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photos } as Profiletype };
        }

        default:
            return state;

    }
}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: Profiletype
}
const setUserProfile = (profile: Profiletype): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
const deletePost = (postId: number): DeletePostActionType  => ({type: DELETE_POST, postId})



export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        //отлавливаем здесь ошибку и диспатчим что-то. Можно так локально не делать, а глобальным перехватчиком в App.js перехватывать
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: Profiletype) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] })); //общая ошибка формы
        //dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": response.data.messages[0]} })); //ошибка для поля фейсбук, но нужно править, чтобы была универсальной для остальных полей
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;