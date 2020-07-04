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
	]
};

const dialogsReducer = (state = initialState, action) => {

    switch(action.type) {
        case SEND_MESSAGE: {
			let body = action.newMessageBody;
			return {
				...state,
				messages: [...state.messages, {id: 7, message: body}]
			};
		}
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;