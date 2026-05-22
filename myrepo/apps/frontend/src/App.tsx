import {Routes,Route} from "react-router-dom"
import User from "./pages/User"
import Host from "./pages/Host"
import HostDashboard from "./pages/HostDashboard"
import UserDashboard from "./pages/UserDashboard"
import LandingPage from "./pages/landing-page"
import FeaturesPage from "./pages/features-page"
import PricingPage from "./pages/pricing-page"
import DocsPage from "./pages/docs-page"
import ObsViewer from "./pages/ObsViewer"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/user" element={<ProtectedRoute><User/></ProtectedRoute>}/>
      
      <Route path="/host" element={<ProtectedRoute><Host/></ProtectedRoute>}/>
      <Route path="/userDashboard" element={<ProtectedRoute><UserDashboard/></ProtectedRoute>}/>
      <Route path="/hostDashboard" element={<ProtectedRoute><HostDashboard/></ProtectedRoute>}/>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/features" element={<FeaturesPage/>}></Route>
      <Route path="/pricing" element={<PricingPage/>}></Route>
      <Route path="/docsPage" element={<DocsPage/>}></Route>
      <Route path="/obsviewer/:roomId/:slotId" element={<ProtectedRoute><ObsViewer/></ProtectedRoute>}></Route>
    </Routes>
      
    </>
  )
}

export default App
