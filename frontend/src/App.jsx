import { useEffect, useNa } from "react"
import Header from "./components/Header"
import useAuth from "./helpers/misc/useAuth"
import LogoBecation from "./imgs/BeCation_logo.png"
import Calendar from "./pages/Calendar"
import ConfigProfile from "./pages/ConfigProfile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useNavigate } from "react-router-dom"
import "./stylesheets/app.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  const auth = useAuth();



  return (
    <div className="app">
      <BrowserRouter>
        <Header auth={auth} />
        <Routes>
          <Route exact path="/" element={<Login auth={auth} />} />
          <Route exact path="/login" element={<Login auth={auth} />} />
          <Route path="/calendar" element={<Calendar auth={auth}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/configProfile" element={<ConfigProfile />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
