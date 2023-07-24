import React from 'react';
import {ChatMessage} from "../models";
export type Props={
    messages : ChatMessage[]
}
function ChatTextArea(props: Props) {

    return (
            <div id={"text-area"} className={"text-area"}>
                {props.messages.map((message, index) => {
                    return (
                        <div key={index} className={"message"}>
                            <div className={"message-text"}>
                                {message.message}
                                {message.appUser.name}
                                {message.time}
                            </div>
                        </div>
                    )
                })}
            </div>
    );
}

export default ChatTextArea;