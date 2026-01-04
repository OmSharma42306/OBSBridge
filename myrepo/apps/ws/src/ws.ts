// web socket server
import { WebSocket, WebSocketServer } from "ws";

interface sockets{
    hostSocket : WebSocket | null;
    joineeSocket : WebSocket | null;
}
const wss = new WebSocketServer({port : 8080});

// sessions stored
const sessions = new Map<any,sockets>();   // roomId , {hostSocket : ws, joineeSocket : ws};

wss.on('connection',(ws:WebSocket)=>{
    ws.on('error',console.error);

    ws.on('message',function message(data:any,isBinary:any){
        const msg = JSON.parse(data);
        console.log(msg);
        if(msg.type === "createRoom"){
            const {hostName,roomId} = msg; // hostName, roomId 
            sessions.set(roomId,{hostSocket : ws,joineeSocket : null});
            ws.send(JSON.stringify({ msg : "Room Created Successfully!", roomId : roomId,hostName : hostName}));
        }else if(msg.type === "joinRoom"){
            const {roomId, name} = msg; // roomId , Name
            const existingSession = sessions.get(roomId);
            if(!existingSession){
                console.log('Host is not ready...');
            } 
            if(existingSession){
                existingSession.joineeSocket = ws;
                existingSession.hostSocket?.send(JSON.stringify({ msg : 'success',name:name }))
            }

            
        }else if(msg.type === "create-stream"){
            const {} = msg; // role : host , roomId, name : zyx
            // send back to all connected clients of same room that stream has been created.!
            // host will send video and audio stream to mediasoup sfu.
            // ws --> send (stream created by host and roomId is : e.g 123)
            const session= getSessionBySocket(ws);
            const hostSocket = session?.hostSocket;

        }else if(msg.type === "join-stream"){
            const {} = msg; // role : joiner , roomId,name : xyz
            // joiner will send video and audio stream to mediasoup sfu.
            // send message to host socket that this xyz user has been joined....
            // hostSocket --> Send --> {name : xyz, roomId : 123, msg : "xyz has been Joined to created Room :123"}
            
        }


    })

    ws.on('close',()=>{
        // console.log('Connection Closed!',ws);
        return;
    })
});

function getSessionBySocket(ws : WebSocket){
    for(const[roomId,session] of sessions.entries()){
        if(session.hostSocket === ws || session.joineeSocket){
            return session;
        }
    }
    return null;
}