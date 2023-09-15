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

    <main>
        <div className="contenedor" style={styleContainer}>
            <form action="" className="form-register">
                <h2 className="form__title">Registrar Usuario</h2>
                <div className="form__container">
                    <h2 className="form__subtitle">Información Personal</h2>
                    <div className="personal-info">
                        <div className="form__group">
                            <label htmlFor="typeName">Nombre</label>
                            <input type="text" className="form__input" name="nombre" onChange={handleForm}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="typeSurname">Apellido</label>
                            <input type="text" className="form__input" name="apellido" onChange={handleForm}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="typeDNI">DNI</label>
                            <input type="number" className="form__input" name="dni" onChange={handleForm}/>
                        </div>
                    </div>
                    <div className="account-info">
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
                    
                </div>
            </form>
        </div>
    </main>

    )
}
    