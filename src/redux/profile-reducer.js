import { usersAPI,  profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialeState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount:10},
        {id: 2, message: 'Its is my first post', likesCount:15},
        {id: 3, message: 'Good', likesCount:16},
        {id: 4, message: 'How are you', likesCount:20},
        {id: 5, message: 'Im Fine', likesCount:0},
        {id: 6, message: 'And, you', likesCount:0},
    ],
    profile: null,
    status: ""
};

export const profileReducer = (state = initialeState, action) => {
    switch(action.type) {
        case ADD_POST: {
            let newPost =  {
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
            return {...state, profile: action.profile};
        }
        
        default: 
            return state;
        
    }
}

export const addPostActionCreator  = (newPostText) => ({type: ADD_POST, newPostText});
const setUserProfile  = (profile) => ({type: SET_USER_PROFILE, profile})
const setStatus  = (status) => ({type: SET_STATUS, status})


export const getUserProfile  = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
            dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
            dispatch(setStatus(response.data));
}

export const updateStatus  = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
}



export default profileReducer;