import * as mediasoup from "mediasoup";
import { WebSocket,WebSocketServer} from "ws";
import type {Room,Peer} from "./types.js"
import type { Router, Worker } from "mediasoup/types";
// Websocket Server Initialization..
const wss = new WebSocketServer({port : 8080});

// mediasoup global variables.
let router : Router | any;

// peers and rooms tracking.
const peers = new Map<string,Peer>();

const room : Room | any  = {};

// mediasoup worker,router creation.
(async()=>{
    const worker : Worker = await mediasoup.createWorker();
    router = await worker.createRouter({mediaCodecs:[
        {kind : 'video',mimeType:'video/VP8',clockRate:90000}
    ]});
    console.log("Router Created!",router);
    room[router] = peers;
})();


wss.on('connection',function connection(ws : WebSocket){
    ws.on('error',console.error);

    ws.on('message',function message(data:any,isBinary){
        const msg = JSON.parse(data);
        if(msg.type === "client-join"){
            ws.send(JSON.stringify({ msg : router,peers}));
        }
    })

    ws.send(JSON.stringify({ msg : "success",room}));
})