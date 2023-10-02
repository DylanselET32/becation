import Header from "./components/Header"
import Login from "./pages/Login"
import Home from "./pages/Home"
import AdminArea from "./pages/AdminArea"
import '../src/App.css'
import VacationManager from "./pages/vacationManager"
import VacationManagerCalendar from "./pages/VacationManagerCalendar"
import ProfileManager from "./pages/ProfileManager"
import ProfileConfig from "./pages/ProfileConfig"
import RegisterUser from "./pages/RegisterUser"
import ResetPassword from "./pages/ResetPassword"
import NotFound from "./pages/NotFound"
import "./stylesheets/app.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import useAuth from "./hooks/useAuth"
import { AlertProvider } from "./contexts/AlertContext"
import ModalAlert from "./components/ModalAlert"


function App() {

  const auth = useAuth();
  
  
  return (
    <div className="app">

      <BrowserRouter>
        <AlertProvider>
          <ModalAlert/>
          <Header auth={auth} />
           <Routes>
            <Route exact path="/" element={<Home auth={auth} />} />
            <Route exact path="/login" element={<Login auth={auth} />} />
            <Route path="/home" element={<Home  auth={auth} />} />
            <Route path="/adminArea " element={<AdminArea auth={auth} />} />
            <Route path="/vacationManager" element={<VacationManager auth={auth} />} />
            <Route path="/vacationManagerCalendar/:id" element={<VacationManagerCalendar auth={auth} />} />
            <Route path="/profileManager" element={<ProfileManager auth={auth} />} />
            <Route path="/profileConfig" element={<ProfileConfig auth={auth} />} />
            <Route path="/registerUser" element={<RegisterUser auth={auth} />} />
            <Route path="/resetPassword" element={<ResetPassword auth={auth} />} />
            <Route path="*" element={<NotFound />} />
          </Routes> 
        </AlertProvider>
      </BrowserRouter>
    </div>

  )
}

export default App
