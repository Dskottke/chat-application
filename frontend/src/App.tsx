import {useEffect, useState} from 'react'
import './App.css'
import useChatWebSocket from "./useChatWebSocket";
import axios from "axios";
import NavBar from "./NavBar";
import {useGlobalContext} from "./Context";
import {AppContext} from "./models";

function App() {
    const [message, setMessage] = useState<string>()
    const [messages, setMessages] = useState<string[]>([]);
    const {appUser,setAppUser} : AppContext = useGlobalContext();

    useEffect(() => {
        axios.get( '/api/appusers/me')
            .then(response => response.data)
            .then(setAppUser)
            .catch(() => {
                if (window.location.href.startsWith('http://localhost:5173/')) {
                    window.location.href = 'http://localhost:8080/redirectTo?redirectUrl=' + encodeURIComponent(window.location.href);
                }
            });
    }, []);


    const receiveMessage = (message:string)=>{
        setMessages([
            ...messages,
            JSON.parse(message)]);
    }

    const {send,connected} = useChatWebSocket(receiveMessage);


  if(!connected) {
      return <div>Connecting...</div>
  }
    return (
        <div className="App">
            <NavBar/>
          {messages.map((message,index)=>{
            return <div key={index}>{message}</div>
          })}
          <input onChange={(e)=>{setMessage(e.target.value)}}/>
          <button onClick={()=>{send(message)}}>Send</button>
        </div>
    )
}

export default App
