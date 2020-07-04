import React from 'react';
import s from './Dialogs.module.css';
import {Redirect} from "react-router-dom";
import { reduxForm, Field, reset } from 'redux-form';


import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const Dialogs = (props) => {

	let state = props.dialogsPage;
	
	let messagesElement = state.messages
		.map( m => <MessageItem message={m.message} key={m.id} id={m.id} activeClassName={s.active} />);

	let dialogsElement = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} /> );


	let addNewMessage = (e, dispatch) => {
		props.sendMessage(e.newMessageBody);
		dispatch(reset("dialogAddMessageForm"));
	}

	if (!props.isAuth) return <Redirect to={"/login"} />

	return  (	
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElement}
			</div>
			<div className={s.messages}>
				<div>{messagesElement}</div>
					<AddMessageFormRedux onSubmit={addNewMessage} />
			</div>
		</div>
    )
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {

	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea}
						validate={[required, maxLength50]}
				name="newMessageBody" placeholder="Enter your message" />
			</div>
			
			<div><button>Send</button></div>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"}) (AddMessageForm);

export default Dialogs;