import { useState } from "react"

export default function Host(){
    const [name,setName] = useState("");
    const [roomNumber,setRoomNumber] = useState("");

    function handleCreateRoom(){
        alert(`Room Created! for Room Number ${roomNumber} with Name : ${name}`);
    }
    return <div>
        This is a Host Page..
        
        <h1>Enter Name</h1>
        
        <input type="text" placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}} />
        <br />

        <h1>Enter Room Number</h1>
        <input type="text" placeholder="Enter Room Number" onChange={(e)=>{setRoomNumber(e.target.value)}}/>
        <br />
        <button onClick={handleCreateRoom}>Create Room</button>
    </div>
}