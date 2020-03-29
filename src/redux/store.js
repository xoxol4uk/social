import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you', likesCount:10},
                {id: 2, message: 'Its is my first post', likesCount:15},
                {id: 3, message: 'Good', likesCount:16},
                {id: 4, message: 'How are you', likesCount:20},
                {id: 5, message: 'Im Fine', likesCount:0},
                {id: 6, message: 'And, you', likesCount:0},
            ],
            newPostText: 'sandron'
    
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Sandron'},
                {id: 3, name: 'Kolyan'},
                {id: 4, name: 'Anton'},
                {id: 5, name: 'Ira'},
                {id: 6, name: 'Sveta'},
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hello'},
                {id: 3, message: 'Good'},
                {id: 4, message: 'Foo'},
                {id: 5, message: 'Moo'},
                {id: 6, message: 'Doo'}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State was changed');
    },

    getState() {
        return this._state;
    },   
    subscribe(observer) {
        this._callSubscriber = observer; 
    },


    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}


export default store;
window.store = store;