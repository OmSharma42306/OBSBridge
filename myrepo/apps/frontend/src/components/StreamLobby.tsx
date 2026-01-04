import CreateStream from "./CreateStream"
import JoinStream from "./JoinStream"

export default function StreamLobby(action : string){
    if(action === "createStream"){
        return <div>
            <CreateStream/>
        </div>        
    }
    return <div>
        <JoinStream/>
    </div>
}