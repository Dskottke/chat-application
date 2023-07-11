import React from 'react';
export type Props={
    messages : string[]
}
function ChatTextArea(props: Props) {

    return (
            <div id={"text-area"} className={"text-area"}>
                {props.messages.map((message, index) => {
                    return (
                        <div key={index} className={"message"}>
                            <div className={"message-text"}>
                                {message}
                            </div>
                        </div>
                    )
                })}
            </div>
    );
}

export default ChatTextArea;