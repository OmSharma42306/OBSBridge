import { ws as socket } from "../sockets/sockets"
export default function CreateStream(){

    function createStream(){
        socket.send(JSON.stringify({ type : "create-stream", role : "host", roomId:"123" , name:"Om Sharma"}))
    }

    return <div>
        <button onClick={createStream}>Create Stream</button>
    </div>
}