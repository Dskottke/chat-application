import {useState} from 'react'
import './App.css'
import useChatWebSocket from "./useChatWebSocket";

function App() {
    const [message, setMessage] = useState<string>()
    const [messages, setMessages] = useState<string[]>([]);

    const receiveMessage = (message:string)=>{
        console.log("Received message from backend", message)
        setMessages([
            ...messages,
            message]);
    }

    const {send,connected} = useChatWebSocket(receiveMessage);


  if(!connected) {
      return <div>Connecting...</div>
  }
    return (
        <div className="App">
          {messages.map((message,index)=>{
            return <div key={index}>{message}</div>
          })}
          <input onChange={(e)=>{setMessage(e.target.value)}}/>
          <button onClick={()=>{send(message)}}>Send</button>
        </div>
    )
}

export default App
