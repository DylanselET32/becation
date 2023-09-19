import { useEffect } from "react"
import Header from "./components/Header"
import useAuth from "./helpers/misc/useAuth"
import LogoBecation from "./imgs/BeCation_logo.png"
import Calendar from "./pages/Calendar"
import ConfigProfile from "./pages/ConfigProfile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./stylesheets/app.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import VacationAdministration from "./pages/VacationAdministration"
import CalendarAdministration from "./pages/CalendarAdministration"

function App() {

  const auth = useAuth();

  useEffect(()=>{
    console.log("AUTHEN: ", auth.user)
  }, [auth])

  return (
    <>

    <div className="app">
      <Header auth={auth}/> 
     <BrowserRouter>
        
        <Routes>
          
   
            
            <Route exact path="/login" element={<Login auth={auth} />}/>
            <Route path="/calendar" element={<Calendar />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/configProfile" element={<ConfigProfile />}/>
            <Route path="/vacationAdmin" element={<VacationAdministration />}/>
            <Route path="/calendarAdmin" element={<CalendarAdministration />}/>
      
           
        </Routes>
     </BrowserRouter>    
     </div>
    </>
  )
}

export default App
