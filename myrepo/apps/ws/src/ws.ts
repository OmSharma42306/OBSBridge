// web socket server
import {WebSocketServer,WebSocket} from "ws";

const wss = new WebSocketServer({port : 8080});

wss.on('connection',(ws:WebSocket)=>{
    ws.on('error',console.error)

    ws.on('message',function message(data:any,isBinary:any){
        const msg = JSON.parse(data);

        if(msg.type === "createRoom"){
            const {} = msg; // hostName, roomId 
        }else if(msg.type === "joinRoom"){
            const {} = msg; // roomId , Name
        }


    })

    ws.on('close',()=>{
        console.log('Connection Closed!',ws);
        return;
    })
})