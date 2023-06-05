import useWebSocket from "react-use-websocket";
import {useState} from "react";


export default function useChatWebSocket(receiveMessage: (message: string) => void) {

    const [connected, setConnected] = useState<boolean | string>(false);

    let host = window.location.host;
    let protocolAndHost;
    if (host === "localhost:5173") {
        protocolAndHost = "ws://localhost:8080";
    } else {
        protocolAndHost = "ws://" + host;
    }
    let webserviceUrl = protocolAndHost +  '/api/ws/chat';


    const webSocket = useWebSocket(webserviceUrl, {
        onOpen: () => {
            setConnected(true);
        },
        onMessage: (event: any) => {
           receiveMessage(event.data)
        },
        onClose: () => {
            setConnected("Connection was closed or could not be established. Please reload.")
        },
    });

    const send = (message: string | undefined) => {
        if (message === undefined || message === "")  return;
        webSocket.sendMessage(JSON.stringify(message));
    }

    return {connected, send};

}