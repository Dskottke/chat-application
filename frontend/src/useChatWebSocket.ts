import useWebSocket from "react-use-websocket";
import {useState} from "react";
import {MessageFromUser} from "./models";


export default function useChatWebSocket(pendingToken: string | undefined, receiveMessage: (message: string) => void) {

    const [connected, setConnected] = useState<boolean>(false);

    let host = window.location.host;
    let protocolAndHost;
    if (host === "localhost:5173") {
        protocolAndHost = "ws://localhost:8080";
    } else {
        protocolAndHost = "ws://" + host;
    }
    let webserviceUrl = protocolAndHost + '/api/ws/chat';


    const webSocket = useWebSocket(webserviceUrl, {
        onOpen: () => {
            setConnected(true);
            send({pendingToken:pendingToken})
        },
        onMessage: (event: any) => {
            receiveMessage(event.data)
        },
        onClose: () => {
            setConnected(false)
        },

    });

    const send = (messageFromUser : MessageFromUser) => {
        webSocket.sendMessage(JSON.stringify(messageFromUser));
    }
    return {connected, send};

}