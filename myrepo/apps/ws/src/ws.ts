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
        }else if(msg.type === "create-stream"){
            const {} = msg; // role : host , roomId, name : zyx
            // send back to all connected clients of same room that stream has been created.!
            // host will send video and audio stream to mediasoup sfu.
            // ws --> send (stream created by host and roomId is : e.g 123)
        }else if(msg.type === "join-stream"){
            const {} = msg; // role : joiner , roomId,name : xyz
            // joiner will send video and audio stream to mediasoup sfu.
            // send message to host socket that this xyz user has been joined....
            // hostSocket --> Send --> {name : xyz, roomId : 123, msg : "xyz has been Joined to created Room :123"}
            
        }


    })

    ws.on('close',()=>{
        console.log('Connection Closed!',ws);
        return;
    })
})