import { useEffect } from "react"
import { ws as socket } from "../sockets/sockets"
import { Device } from "mediasoup-client";

let device : any;

let sendTransport : any;
let transportPendingCallback : any;
let producerConnectPendingCallback : any;

export default function CreateStream({wsId}:any){
    useEffect(()=>{
        socket.onmessage = async(event : any)=>{
            
            const msg = JSON.parse(event.data);
            console.log(msg)
            if(msg.type === "rtpCapabilities"){
                if(!device) device = new Device();
                await device.load({ routerRtpCapabilities : msg.rtp});
                socket.send(JSON.stringify({type : "createWebRtcTransport", wsId : '123',direction : "send" }));
            }else if(msg.type === "transport"){
                if(device){
                    sendTransport = await device.createSendTransport(msg.peerTransport);

                    // event listeners on sendTransport.

                    sendTransport.on("connect",({dtlsParameters}:any,callback:any)=>{
                        socket.send(JSON.stringify({ type : "connectTransport",wsId : '123',transportId : sendTransport?.id,dtlsParameters : dtlsParameters}));
    
                        // handleconnectTransport
                        transportPendingCallback = callback;
                    });

                    sendTransport.on("produce",({kind , rtpParameters}:any,callback:any)=>{
                        socket.send(JSON.stringify({ type : "produce",wsId : '123',transportId : sendTransport?.id,kind : kind,rtpParameters : rtpParameters}));
                        // handlePendingProduce
                        producerConnectPendingCallback = callback;

                    });


                    // all above events will be triggered when you 
                    // get video tracks and audio track from naviagtor mediadevices..
                    const stream = await navigator.mediaDevices.getDisplayMedia({ video : true,audio : true});
                    const track = stream.getVideoTracks()[0];
                    await sendTransport.produce({ track});
                }else if(msg.type === "transportConnected"){
                    transportPendingCallback();
                }else if(msg.type === "produced"){
                    producerConnectPendingCallback({ id : msg.producerId});
                }
            }
        }
    },[wsId])

    function createStream(){
        console.log("function called on create stream");
        socket.send(JSON.stringify({ type : "create-stream",direction :"send" , role : "host", roomId:"123" , name:"Om Sharma"}))
    }

    return <div>
        <button onClick={createStream}>Create Stream</button>
    </div>
}