import Header from "./components/Header"
import Login from "./pages/Login"
import Home from "./pages/Home"
import AdminAreaRole from "./pages/AdminAreaRole"
import '../src/App.css'
import VacationManager from "./pages/VacationManager"
import VacationManagerCalendar from "./pages/VacationManagerCalendar"
import ProfileManager from "./pages/ProfileManager"
// import ProfileConfig from "./pages/ProfileConfig"
import RegisterUser from "./pages/RegisterUser"
import ResetPassword from "./pages/ResetPassword"
import NotFound from "./pages/NotFound"
import "./stylesheets/app.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import useAuth from "./hooks/useAuth"
import { AlertProvider } from "./contexts/AlertContext"
import ModalAlert from "./components/ModalAlert"
import AreaBoss from "./pages/AreaBoss"
import ProfileConfig from "./pages/ProfileConfig"


function App() {

  const auth = useAuth();
  
  
  return (
    <div className="app">
      <BrowserRouter>
        <AlertProvider>
          <ModalAlert/>
          <Header auth={auth} />
           <Routes>
            <Route exact path="/" element={<Home auth={auth} privilegeLevelCondition={p=>p>=1} />} /> {/*ACCESIBLE POR NIVEL 1 en adelante*/} 
            <Route exact path="/login" element={<Login auth={auth} privilegeLevelCondition={p=>true}/>} /> {/*ACCESIBLE POR TODOS*/} 
            <Route path="/home" element={<Home  auth={auth}  privilegeLevelCondition={p=>p>=1}/>} /> {/*ACCESIBLE POR NIVEL 1 en adelante*/} 
            <Route path="/areaBoss" element={<AreaBoss auth={auth} privilegeLevelCondition={p=>p>=2 && p != 3 }/>} /> {/*SOLO ACCESIBLE POR NIVEL 2 y no por el 3*/} 
            <Route path="/adminAreaRole" element={<AdminAreaRole auth={auth} privilegeLevelCondition={p=>p>=4}/>} />   {/*SOLO ACCESIBLE POR NIVEL 4*/} 
            <Route path="/vacationManager" element={<VacationManager auth={auth} privilegeLevelCondition={p=>p>=3}/>} /> {/*SOLO ACCESIBLE POR NIVEL 4*/} 
            <Route path="/vacationManagerCalendar/:id" element={<VacationManagerCalendar auth={auth} privilegeLevelCondition={p=>p>=3}/>} /> {/*SOLO ACCESIBLE POR NIVEL 4*/} 
            <Route path="/profileManager" element={<ProfileManager auth={auth} privilegeLevelCondition={p=>p>=3}/>} /> {/*SOLO ACCESIBLE POR NIVEL 4*/} 
            <Route path="/profileConfig/:id" element={<ProfileConfig auth={auth} privilegeLevelCondition={p=>p>=3}/>} /> {/*SOLO ACCESIBLE POR NIVEL 4*/} 
            <Route path="/registerUser" element={<RegisterUser auth={auth} privilegeLevelCondition={p=>p>=3}/>} /> {/*SOLO ACCESIBLE POR NIVEL 4*/} 
            <Route path="/resetPassword/:token" element={<ResetPassword auth={auth} privilegeLevelCondition={p=>true}/>} /> {/*ACCESIBLE POR TODOS*/}  
            <Route path="*" element={<NotFound />} />
          </Routes> 
        </AlertProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
