import type { Router,Worker,Transport,Consumer,Producer } from "mediasoup/types";

export type Peer = {
    socket : WebSocket;
    transports : Map<string,Transport>
    producers : Map<string,Producer>
    consumers : Map<string,Consumer>
};

export type Room = {
    router : Router;
    peers : Map<string,Peer>
};