import Header from "./components/Header"
import LogoBecation from "./imgs/BeCation_logo.png"
import Calendar from "./pages/Calendar"
import ConfigProfile from "./pages/ConfigProfile"
import Login from "./pages/Login"
import "./stylesheets/app.css"

function App() {


  return (
    <>
      <div className="app">
        <Header />
        {/* <Login /> */}
        <ConfigProfile/>
        {/* <Calendar /> */}

      </div>
    
    </>
  )
}

export default App
