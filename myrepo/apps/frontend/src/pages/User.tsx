import { useState } from "react";
import { ws } from "../sockets/sockets";

export default function User(){
    const [roomId,setRoomId] = useState<string>('');
    const [name,setName] = useState<string>('');

    function handleJoinRoom(){
        ws.send(JSON.stringify({msg : "ewfjweifwejfwj"}))
        alert(`Room Joined! for Room Number ${roomId} with Name : ${name}`);
    }
    return <div> 
        <h1>Enter RoomId</h1>
        <br />
        <input type="text" onChange={(e)=>{setRoomId(e.target.value)}} />
        <br />
        <h1>Enter Name</h1>
        <br />
        <input type="text" onChange={(e)=>{setName(e.target.value)}} />
        <br />
        <button onClick={handleJoinRoom}>Join Room</button>
    </div>
}