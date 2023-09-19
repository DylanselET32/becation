import "../stylesheets/register.css"
import "../stylesheets/modalAlert.css"

import EyeToHide from "../imgs/eye-crossed.svg"
import EyeHiden from "../imgs/eye.svg"
import { useState } from "react"
//import ModalAlert from "../components/ModalAlert"
//import useModalAlert from "../helpers/useModalAlert"

//import { login } from "../services/userServices"



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
        <div className="container_register">
            <form action="">
                <h1 className="form__register-title">Registrar Usuario</h1>

                <h2 className="form__register-subtitle">Información Personal</h2>
                {/* <div className="form__register-container"> */}
                <div className="form__inputs-info">
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeName">Nombre</label>
                        <input type="text" className="form__register-input" name="nombre" onChange={handleForm}/>
                    </div>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeApellido">Apellido</label>
                        <input type="text" className="form__register-input" name="apellido" onChange={handleForm}/>
                    </div>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeDNI">DNI</label>
                        <input type="text" className="form__register-input" name="dni" onChange={handleForm}/>
                    </div>
                </div>
                
                <h2 className="form__register-subtitle">Información de la Cuenta</h2>
                <div className="form__inputs-info">
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeEmail">Email</label>
                        <input type="email" className="form__register-input" name="email" value={form.email} onChange={handleForm}/>
                    </div>
                    <div className="form__register-group">
                        <label className="form__register-label" htmlFor="typeContraseña">Contraseña</label>
                        <input type={passHidden ? "text" : "password"} className="form__register-input" name="password" id="password" value={form.password} onChange={handleForm}/>
                        <span className="form__register-span"><img src={passHidden ? EyeHiden : EyeToHide} alt="" width={"30px"} onClick={changePassVisibility}/></span>                  
                    </div>
                </div>
                
                <h2 className="form__register-subtitle">Información del Contrato</h2>
                <div className="form__container-contrat-info">
                    <div className="form__inputs-info">
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="typePrivilegios">Privilegios</label>
                            <input type="email" className="form__register-input" name="privilegios" onChange={handleForm}/>
                        </div>
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="typeRol">Rol</label>
                            <input type="email" className="form__register-input" name="rol" onChange={handleForm}/>
                        </div>
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="typeArea">Área</label>
                            
                            <select className="form__register-select" name="area" id="area">
                                <option className="form__register-option" selected disabled>Elige un área</option>
                                <option className="form__register-option" value="#">opción 1</option>
                                <option className="form__register-option" value="#">opción 1</option>
                            </select>
                        </div>
                    </div>
                    <div className="form__inputs-info">
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="typeAvailableDays">Días Disponibles</label>
                            <input type="number" className="form__register-input" name="availableDays" onChange={handleForm}/>
                        </div>
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="typeTotalDays">Total de Días</label>
                            <input type="number" className="form__register-input" name="totalDays" onChange={handleForm}/>
                        </div>
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="typeSignUpDay">Día de Alta</label>
                            <input type="date" className="form__register-input" name="signUpDay" onChange={handleForm}/>
                        </div>
                    </div>
                    <div className="form__register-check-submit">
                        <div className="form__register-checkbox">
                                <input type="checkbox" className="form__register-checkbox" name="isAvailable" onChange={handleForm}/>
                                <label className="form__register-label-check" htmlFor="typeIsAvailable">Está Disponible</label>
                        </div>
                        <input type="submit" />
                    </div>
                    
                </div>
                
            </form>
        </div>
    </div>

    )
}
    