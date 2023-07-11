import React from 'react';
import ChatTextArea from "./ChatTextArea";
import ChatAction from "./ChatAction";
import {MessageFromUser} from "../models";

export type Props = {
    send: (messageFromUser: MessageFromUser) => void,
    messages: string[],
    setMessage : (message : string) => void
    message : string
}

function Chat(props: Props) {
    return (
        <div className={"chat"}>
            <ChatTextArea messages={props.messages}/>
            <ChatAction message={props.message} setMessage={props.setMessage} send={props.send}/>
        </div>
    );
}

export default Chat;