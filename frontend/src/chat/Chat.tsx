import React, {useState} from 'react';
import ChatTextArea from "./ChatTextArea";
import ChatAction from "./ChatAction";
import {AppContext, AppUserAuthentication, ChatMessage, MessageToUser} from "../models";
import useChatWebSocket from "../useChatWebSocket";
import {useGlobalContext} from "../Context";

export type Props = {
    appUserAuthentication: AppUserAuthentication
}

function Chat(props: Props) {


    const {setCurrentAppUsers}: AppContext = useGlobalContext();

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const {send, connected} = useChatWebSocket(props.appUserAuthentication.pendingToken, (message: string) => {
        const messageToUser = JSON.parse(message) as MessageToUser;
        const chatMessage = messageToUser.chatMessage;
        if (chatMessage) {
            setMessages([
                ...messages,
                chatMessage]);
        }
        const currentAppUsers = messageToUser.currentAppUsers;
        console.log(currentAppUsers)
        if (currentAppUsers && setCurrentAppUsers) {
            setCurrentAppUsers(currentAppUsers)
        }
    })


    if (!connected) {
        return <div>Connecting...</div>
    }


    return (
        <div className={"chat"}>
            <ChatTextArea messages={messages}/>
            <ChatAction message={message} setMessage={setMessage} send={send}/>
        </div>
    );
}

export default Chat;