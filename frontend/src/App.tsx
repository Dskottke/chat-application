import React, {useEffect, useState} from 'react'
import './App.css'
import useChatWebSocket from "./useChatWebSocket";
import axios from "axios";
import NavBar from "./NavBar";
import {useGlobalContext} from "./Context";
import {AppContext, AppUserAuthentication, ChatMessage, MessageToUser} from "./models";
import Chat from "./chat/Chat";

function App() {

 const [appUserAuthentication, setAppUserAuthentication] = useState<AppUserAuthentication>();

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


    if(!appUserAuthentication?.pendingToken || !appUserAuthentication?.appUser){
        return <div>Not logged in</div>
    }

        return (
            <div className={"app"}>
                <div className={"main-frame"}>
                    <NavBar appUser={appUserAuthentication.appUser}/>
                    <Chat appUserAuthentication={appUserAuthentication}/>
                </div>
            </div>
        )
    }

export default App
