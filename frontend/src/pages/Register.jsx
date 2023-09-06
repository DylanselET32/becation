import "../stylesheets/register.css"
import "../stylesheets/modalAlert.css"
/*
import EyeToHide from "../imgs/eye-crossed.svg"
import EyeHiden from "../imgs/eye.svg"
import { useState } from "react"
import ModalAlert from "../components/ModalAlert"
import useModalAlert from "../helpers/useModalAlert"
import { login } from "../services/userServices"
*/

export default function Register (){
    /*
    const [passHidden, setPassHidden] = useState(false)
    const [form, setForm] = useState(initalForm)
    const [ handleModalAlert, alert, openModalAlert, modalAlertCalled, msg, setMsg]= useModalAlert();


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

        <h1>Hola Mundo</h1>

    )
}
    