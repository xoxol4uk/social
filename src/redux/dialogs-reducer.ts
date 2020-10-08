const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
	id: number
	name: string
}

type MessageType = {
	id: number
	message: string
}

let initialState = {
	dialogs: [
		{id: 1, name: 'Dimych'},
		{id: 2, name: 'Sandron'},
		{id: 3, name: 'Kolyan'},
		{id: 4, name: 'Anton'},
		{id: 5, name: 'Ira'},
		{id: 6, name: 'Sveta'},
	] as Array<DialogType>,
	messages: [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'Hello'},
		{id: 3, message: 'Good'},
		{id: 4, message: 'Foo'},
		{id: 5, message: 'Moo'},
		{id: 6, message: 'Doo'}
	] as Array<MessageType>
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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

type sendMessageCreatorActionType = {
	type: typeof SEND_MESSAGE
	newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;