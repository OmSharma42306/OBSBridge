import { ws as socket } from "../sockets/sockets"
export default function JoinStream(){
    
    function handleJoinStream(){
        socket?.send(JSON.stringify({ type : "join-stream",role : "joiner",roomId:"123",name:"sagar sharma"}))
    }
    
    return <div>
        <button onClick={handleJoinStream}>Join Stream</button>
    </div>
}