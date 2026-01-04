import {Routes,Route} from "react-router-dom"
import User from "./pages/User"
import Host from "./pages/Host"
import HostDashboard from "./pages/HostDashboard"
import UserDashboard from "./pages/UserDashboard"
function App() {
  
  return (
    <>
    <Routes>
      <Route path="/user" element=<User/>/>
      <Route path="/host" element=<Host/>/>
      <Route path="/userDashboard" element=<UserDashboard/>/>
      <Route path="/hostDashboard" element=<HostDashboard/>/>
    </Routes>
      
    </>
  )
}

export default App
