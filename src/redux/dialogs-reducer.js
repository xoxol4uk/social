const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {

    switch(action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
			return {
				...state,
				newMessageBody: action.body
			};
		}
        case SEND_MESSAGE: {
			let body = state.newMessageBody;
			return {
				...state,
				newMessageBody: '',
				messages: [...state.messages, {id: 7, message: body}]
			};
		}
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE});
export const updateNewMessageBodyCreator = (body) => 
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;