import React, {useEffect, useState} from 'react'
import './App.css'
import useChatWebSocket from "./useChatWebSocket";
import axios from "axios";
import NavBar from "./NavBar";
import {useGlobalContext} from "./Context";
import {AppContext, MessageToUser} from "./models";
import Chat from "./chat/Chat";

function App() {
    const {
        setAppUserAuthentication,
        appUserAuthentication,
        setCurrentAppUsers,
    }: AppContext = useGlobalContext();
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        axios.get('/api/appusers/me')
            .then(response => response.data)
            .then(setAppUserAuthentication)
            .catch(() => {
                if (window.location.href.startsWith('http://localhost:5173/')) {
                    window.location.href = 'http://localhost:8080/redirectTo?redirectUrl=' + encodeURIComponent(window.location.href);
                }
            });
    }, []);


    const receiveMessage = (message: string) => {
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
    }

    const {send, connected} = useChatWebSocket(appUserAuthentication?.pendingToken, receiveMessage);


    if (!connected) {
        return <div>Connecting...</div>
    }

    return (
        <div className={"app"}>
            <div className={"main-frame"}>
                <NavBar/>
                <Chat
                    message={message}
                    setMessage={setMessage}
                    send={send}
                    messages={messages}/>
            </div>
        </div>
    )
}

export default App
