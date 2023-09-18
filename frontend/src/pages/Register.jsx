import "../stylesheets/register.css"
import "../stylesheets/modalAlert.css"

import EyeToHide from "../imgs/eye-crossed.svg"
import EyeHiden from "../imgs/eye.svg"
import { useState } from "react"
//import ModalAlert from "../components/ModalAlert"
//import useModalAlert from "../helpers/useModalAlert"

//import { login } from "../services/userServices"

const styleContainer = {
  borderRadius: "1rem",
  background: "#2e2e2e"
}

const initalForm = {
  email: "",
  password: ""
}

export default function Register (){
    
    const [passHidden, setPassHidden] = useState(false)
    const [form, setForm] = useState(initalForm)
    //const [ handleModalAlert, alert, openModalAlert, modalAlertCalled, msg, setMsg]= useModalAlert();


    const changePassVisibility = ()=>{
        setPassHidden(!passHidden)
    }

    const handleForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
/*
    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(!form.email || !form.password){
          openModalAlert();
          setMsg("Complete los datos")
          return
        }
        const [data, status]= await login(form)
        if(status == 401){
          openModalAviso();
          setMsg("Contraseña Incorrecta")
        }else if(status == 404){
          openModalAviso();
          setMsg("Usuario incorrecto")
        }else if(status == 400){
          openModalAviso();
          setMsg("Nombre de usuario en uso")
        }else if(status ==200){
            console.log("LOGUEADO...")
        //   redirec()
        //   auth.reloaded()
        }
      }
*/
    return (

    <div className="main_register-container">
        <div className="container_register" style={styleContainer}>
            <form action="">
                <h2 className="form__register-title">Registrar Usuario</h2>
                <div className="form__register-container">
                    <h2 className="form__register-subtitle">Información Personal</h2>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeName">Nombre</label>
                        <input type="text" className="form__register-input" name="nombre" onChange={handleForm}/>
                    </div>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeSurname">Apellido</label>
                        <input type="text" className="form__register-input" name="apellido" onChange={handleForm}/>
                    </div>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeDNI">DNI</label>
                        <input type="number" className="form__register-input" name="dni" onChange={handleForm}/>
                    </div>
                    <h2 className="form__register-subtitle">Información de la Cuenta</h2>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeEmail">Email</label>
                        <input type="email" className="form__register-input" name="email" value={form.email} onChange={handleForm}/>
                    </div>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeContraseña">Contraseña</label>
                        <input type={passHidden ? "text" : "password"} className="form__register-input" name="password" id="password" value={form.password} onChange={handleForm}/>
                        <span className="form__register-span"><img src={passHidden ? EyeHiden : EyeToHide} alt="" width={"30px"} onClick={changePassVisibility}/></span>                  
                    </div>
                    <h2 className="form__register-subtitle">Información de Contrato</h2>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeName">Nombre</label>
                        <input type="text" className="form__register-input" name="nombre" onChange={handleForm}/>
                    </div>
                    
                </div>
            </form>
        </div>
    </div>

    )
}
    