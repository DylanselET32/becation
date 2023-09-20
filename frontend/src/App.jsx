import Header from "./components/Header"
import ConfigProfile from "./pages/ConfigProfile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./stylesheets/app.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";

import VacationAdministration from "./pages/VacationAdministration"
import CalendarAdministration from "./pages/CalendarAdministration"

import useAuth from "./hooks/useAuth"
import RequestVacationCalendar from "./pages/RequestVacationCalendar"
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
            <Route exact path="/" element={<Login auth={auth} />} />
            <Route exact path="/login" element={<Login auth={auth} />} />
            <Route path="/calendar" element={<RequestVacationCalendar auth={auth} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/configProfile" element={<ConfigProfile />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </AlertProvider>
      </BrowserRouter>
    </div>

  )
}

export default App
