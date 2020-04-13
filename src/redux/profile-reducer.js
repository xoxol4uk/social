import { usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialeState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount:10},
        {id: 2, message: 'Its is my first post', likesCount:15},
        {id: 3, message: 'Good', likesCount:16},
        {id: 4, message: 'How are you', likesCount:20},
        {id: 5, message: 'Im Fine', likesCount:0},
        {id: 6, message: 'And, you', likesCount:0},
    ],
    newPostText: 'sandron',
    profile: null
};

const profileReducer = (state = initialeState, action) => {
    switch(action.type) {
        case ADD_POST: {
            let newPost =  {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''        
            };
        }
        case UPDATE_NEW_POST_TEXT: { 
            return {
                ...state,
                newPostText: action.newText
             };
        }
        case SET_USER_PROFILE: { 
            return {...state, profile: action.profile};
        }
        
        default: 
            return state;
        
    }
}

export const addPostActionCreator  = () => ({type: ADD_POST});
const setUserProfile  = (profile) => ({type: SET_USER_PROFILE, profile})
export const getUserProfile  = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
    .then(response => {
        dispatch(setUserProfile(response.data));
    })
}
export const updateNewPostTextActionCreator = (text) => 
    ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;