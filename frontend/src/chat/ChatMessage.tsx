import React from 'react';
import {ChatMessage} from "../models";
export type Props= {
    message: ChatMessage
}
function ChatMessage(props:Props) {
    return (
        <div className={"message"}>
            <div className={"message-text"}>
                {props.message.message}
                {props.message.appUser.name}
                {props.message.time}
            </div>
        </div>
    );
}

export default ChatMessage;