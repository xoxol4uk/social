import React from 'react';
import s from './Dialogs.module.css';
import {Redirect} from "react-router-dom";


import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = (props) => {

	let state = props.dialogsPage;
	
	let messagesElement = state.messages
		.map( m => <MessageItem message={m.message} key={m.id} id={m.id} activeClassName={s.active} />);

	let dialogsElement = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} /> );

	let newMessageBody = state.newMessageBody;

	let onSendMessageClick = () => {
		props.sendMessage();
	}	
	let onNewMessageChange = (e) => {
		let body = e.target.value;
		props.updateNewMessageBody(body);
	}

	if (!props.isAuth) return <Redirect to={"/login"} />

	return  (	
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElement}
			</div>
			<div className={s.messages}>
				<div>{messagesElement}</div>
					<div>
						<div><textarea value={newMessageBody} 
										onChange={onNewMessageChange}
										placeholder="Enter your message"></textarea></div>
						
						<div><button onClick={onSendMessageClick}>Send</button></div>
					</div>
			</div>
		</div>
    )
}

export default Dialogs;