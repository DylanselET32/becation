
import "../stylesheets/login.css"
import "../stylesheets/modalAlert.css"
import EyeToHide from "../imgs/eye-crossed.svg"
import EyeHiden from "../imgs/eye.svg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
// import ModalAlert from "../components/ModalAlert"
// import useModalAlert from "../helpers/useModalAlert"
import { login } from "../services/userServices"
import { useEffect } from "react"


const styleContainer = {
    borderRadius: "1rem",
    background: "#2e2e2e"
}

const initalForm = {
    email: "",
    password: ""
}

export default function Login ({auth}){
    
    const navigate = useNavigate();
    const [passHidden, setPassHidden] = useState(false)
    const [form, setForm] = useState(initalForm)

    


    const changePassVisibility = ()=>{
        setPassHidden(!passHidden)
    }

    const handleForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(!form.email || !form.password){
        
          setMsg("Complete los datos")
          return
        }
        const [data, status]= await login(form)
        if(status == 401){
          
          setMsg("Contraseña Incorrecta")
        }else if(status == 404){
          
          setMsg("Usuario incorrecto")
        }else if(status == 400){
         
          setMsg("Nombre de usuario en uso")
        }else if(status == 200){
            console.log("USER...", auth)
            redirec()
            auth.reloaded()
        }
    }

    const redirec = ()=>{
        const previousUrl = document.referrer;
        console.log(window.location.origin)
        if (previousUrl === window.location.href || !previousUrl) {
          navigate('/calendar');
        } else {
          navigate(-1);
        }
    }


    const reloaded = async () =>{
        const authe = await auth.reloaded();
        console.log(authe)
        if(authe){
          redirec();
        }
      }

      useEffect(()=>{
        reloaded()
      },[])
      

    return (

        <main>
            <div className="contenedor" style={styleContainer}>
                <form action="" onSubmit={handleSubmit} className="form-login" >
                    <h2 className="form__title">Iniciá Sesión</h2>
                    <div className="form__container">
                        <div className="form__group">
                            <label className="form__label" htmlFor="typeEmail">Email</label>
                            <input type="email" className="form__input" name="email" value={form.email} onChange={handleForm}/>
                        </div>
                        <div className="form__group">
                            <label className="form__label" htmlFor="typeContraseña">Contraseña</label>
                            <input type={passHidden ? "text" : "password"} className="form__input" name="password" id="password" value={form.password} onChange={handleForm}/>
                            <span className="form__span"><img src={passHidden ? EyeHiden : EyeToHide} alt="" width={"30px"} onClick={changePassVisibility}/></span>                  
                        </div>
                    </div>
                    <div className="register-link">
                        <a href="#">Olvidé mi contraseña</a>
                    </div>
                    <button className="btn-login">Continuar</button>
                </form>
            </div>
            {/* {alert && <ModalAlert msg={msg} handleModalAlert={handleModalAlert} modalStyle={alert ? modalAlertCalled : "aviso-hidden"}/>} */}
        </main>


    )
            }
    
