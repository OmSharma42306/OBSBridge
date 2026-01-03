import {Routes,Route} from "react-router-dom"
import User from "./pages/User"
import Host from "./pages/Host"
function App() {
  
  return (
    <>
    <Routes>
      <Route path="/user" element=<User/>/>
      <Route path="/host" element=<Host/>/>
    </Routes>
      
    </>
  )
}

export default App
