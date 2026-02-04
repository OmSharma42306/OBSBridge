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

    ws.on('message',async function message(data:any,isBinary){
        const msg = JSON.parse(data);
        if(msg.type === "client-join"){
            if(!router.rtpCapabilities){
                ws.send(JSON.stringify({ msg : "Router RTPCapabilities Error!"}));
                return;
            }

            const wsId = msg.wsId;
            peers.set(wsId,{ socket : ws,transports : new Map() , producers : new Map(),consumers : new Map() });

            console.log(" peers set done",wsId);
            const peer = peers.get(wsId);
            console.log("Peer",peer)
            ws.send(JSON.stringify({ type : "rtpCapabilities" , rtp : router.rtpCapabilities}))
            
            // issue : “Meeting already started → new consumer joins → cannot see existing screen share” 
            // fix : send existing producers list to client 
            const existingProducers = [];
            for(const[peerId,peer] of peers.entries()){
                if(peerId === wsId) continue;
                for(const producer of peer.producers.values()){
                    existingProducers.push({
                        producerId : producer.id,
                        peerId
                    });
                }
            }

            ws.send(JSON.stringify({ type : "existingProducers",producers : existingProducers}));
            return;
        }else if(msg.type === "createWebRtcTransport"){
            console.log(msg.type,msg.wsId);
            const wsId = msg.wsId;
            const direction = msg.direction;
            const transport = await createWebRtcTransport();
            const peer = peers.get(wsId);
            peer?.transports.set(transport.id,{transport,direction});
            ws.send(JSON.stringify({ type : 'transport',peerTransport : {id : transport.id,iceCandidates : transport.iceCandidates,iceParameters : transport.iceParameters,dtlsParameters : transport.dtlsParameters}}));
            return;
        }else if(msg.type === "connectTransport"){
            console.log(msg.type,msg.wsId);
            const wsId = msg.wsId;
            const transportId = msg.transportId;
            const peer = peers.get(wsId);
            const entry = peer?.transports.get(transportId);
            const transport = entry?.transport;
            await transport?.connect({ dtlsParameters : msg.dtlsParameters});
            ws.send(JSON.stringify({ type : "transportConnected",transportId : transport?.id}));
            return;
        }else if(msg.type === "produce"){
            console.log(msg.type,msg.wsId);
            const wsId = msg.wsId;
            const transportId = msg.transportId;
            const peer = peers.get(wsId);
            const entry = peer?.transports.get(transportId);
            if(entry?.direction !== "send"){
                throw new Error("Cannot Produce on recv transport");
            }
            const transport = entry.transport;
            const producer = await transport.produce({
                kind : msg.kind,
                rtpParameters : msg.rtpParameters
            });

            peer?.producers.set(producer.id,producer);

            ws.send(JSON.stringify({ type : "produced",producerId : producer.id }));
            // Skip the sender and broadcast the 'newProducer' event to everyone else in the room.
            for(const[otherPeerId,otherPeer] of peers.entries()){
                if(otherPeerId === wsId) continue; // here we skip if otherPeerId is producer.

                otherPeer.socket.send(JSON.stringify({
                    type : "newProducer",
                    producerId : producer.id,
                    peerId : wsId
                }));
            }
            return;
        }
    })

    ws.send(JSON.stringify({ msg : "success",room}));
});


async function createWebRtcTransport(){
    const transport = await router.createWebRtcTransport({
        listenIps:[{ ip : '0.0.0.0',announcedId : '192.168.31.59'}],
        enableTcp : true,
        enableUdp : true,
        preferUdp : true,
    });
    return transport;
};