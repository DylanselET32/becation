import Header from "./components/Header"
import LogoBecation from "./imgs/BeCation_logo.png"
import Calendar from "./pages/Calendar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./stylesheets/app.css"

function App() {


  return (
    <>
      <div className="app">
        <Header />
        <Register />
        {/*<Login />*/}

        {/* <Calendar /> */}

      </div>
    
    </>
  )
}

export default App
