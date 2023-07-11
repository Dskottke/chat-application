import React, {useEffect, useState} from 'react'
import './App.css'
import useChatWebSocket from "./useChatWebSocket";
import axios from "axios";
import NavBar from "./NavBar";
import {useGlobalContext} from "./Context";
import {AppContext} from "./models";
import Chat from "./chat/Chat";

function App() {
    const {setAppUser} : AppContext= useGlobalContext();
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        axios.get('/api/appusers/me')
            .then(response => response.data)
            .then(setAppUser)
            .catch(() => {
                if (window.location.href.startsWith('http://localhost:5173/')) {
                    window.location.href = 'http://localhost:8080/redirectTo?redirectUrl=' + encodeURIComponent(window.location.href);
                }
            });
    }, []);


    const receiveMessage = (message: string) => {
        if (setMessages && messages) {
            setMessages([
                ...messages,
                JSON.parse(message)]);
        }
    }

    const {send, connected} = useChatWebSocket(receiveMessage);


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
