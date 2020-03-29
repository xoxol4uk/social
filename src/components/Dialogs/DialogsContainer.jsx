import React from 'react';

import { updateNewMessageBodyCreator, sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage
	}
}
let mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: () => dispatch(sendMessageCreator()),
		updateNewMessageBody: (body) => dispatch(updateNewMessageBodyCreator(body))
	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

export default DialogsContainer;