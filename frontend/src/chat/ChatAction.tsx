import React from 'react';
import {MessageFromUser} from "../models";


export type Props = {
    send: (messageFromUser : MessageFromUser) => void,
    setMessage : (message : string) => void,
    message : string,
}

function ChatAction(props: Props) {

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            props.send({chatMessage:props.message});
            props.setMessage("");
        }


    return (
        <form onSubmit={onFormSubmit}>
            <input
                placeholder={"type a message ...."}
                className={"chat-input"}
                value={props.message}
                onChange={(e) => props.setMessage(e.target.value)}/>
        </form>
    );
}

export default ChatAction;