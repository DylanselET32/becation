import Header from "./components/Header"
import ConfigProfile from "./pages/ConfigProfile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./stylesheets/app.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import useAuth from "./hooks/useAuth"
import { useState } from "react"
import RequestVacationCalendar from "./pages/RequestVacationCalendar"

function App() {

  const auth = useAuth();
  const [showAlert,setShowAlert] = useState(false)
  const [alertModalConfig, setAlertModalConfig] = useState({status:"success",title:"Exitoso",message:"Se creo exitosamente",showAlert,setShowAlert});

  return (
    <div className="app">
      <BrowserRouter>
        <Header auth={auth} />
        <AlertModal configure={alertModalConfig}/>
        <Routes>
          <Route exact path="/" element={<Login auth={auth} />} />
          <Route exact path="/login" element={<Login auth={auth} />} />
          <Route path="/calendar" element={<RequestVacationCalendar auth={auth} alertModal={setAlertModalConfig}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/configProfile" element={<ConfigProfile />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
