import "../stylesheets/register.css"
import "../stylesheets/modalAlert.css"
import EyeToHide from "../imgs/eye-crossed.svg"
import EyeHiden from "../imgs/eye.svg"
import { useEffect, useState } from "react"
import { addEmployer } from "../services/employeeServices"
//import ModalAlert from "../components/ModalAlert"
//import useModalAlert from "../helpers/useModalAlert"
//import { login } from "../services/userServices"

const initalForm = {
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    password: "",
    privileges: "",
    rol: "",
    area: "",
    availableDays: "",
    totalDays: "",
    signUpDay: "",
    isAvailable: true,
}

function FormGroup({ label, name, type, value, onChange }) {
    return (
        <div className="form__register-group">
            <label className="form__register-label" htmlFor={name}>{label}</label>
            <input type={type} className="form__register-input" name={name} value={value} onChange={onChange}/>
        </div>
    );
}

export default function Register (){
    
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


    useEffect(()=>{
        console.log("CAMBIO DE ESTADO: ",form)
    }, [form])

    const handleSubmit = async ()=>{
        if(form.nombre && form.apellido && form.dni && form.email && form.password && form.privileges && form.rol && form.area && form.availableDays && form.totalDays && form.signUpDay && form.isAvailable ){
            const addUser = await addEmployer(form);
            console.log(addUser);
        }
        else{
            window.alert("Por favor, rellene los campos.");
            return
        }
    }

    return (
        <div className="main_register-container">
            <div className="container_register">
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="form__register-title">Registrar Usuario</h1>
                    <h2 className="form__register-subtitle">Información Personal</h2>
                    <div className="form__inputs-info">
                        <FormGroup label="Nombre" name="nombre" type="text" value={form.nombre} onChange={handleForm}/>
                        <FormGroup label="Apellido" name="apellido" type="text" value={form.apellido} onChange={handleForm}/>
                        <FormGroup label="DNI" name="dni" type="text" value={form.dni} onChange={handleForm}/>
                    </div>
                    <h2 className="form__register-subtitle">Información de la Cuenta</h2>
                    <div className="form__inputs-info">
                        <FormGroup label="Email" name="email" type="email" value={form.email} onChange={handleForm}/>
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="typeContraseña">Contraseña</label>
                            <input type={passHidden ? "text" : "password"} className="form__login-input" name="password" id="password" value={form.password} onChange={handleForm}/>
                            <span className="form__register-span"><img src={passHidden ? EyeHiden : EyeToHide} className="form__register-eye-closed" alt="" width={"30px"} onClick={changePassVisibility}/></span>                  
                        </div>
                    </div>
                    <h2 className="form__register-subtitle">Información del Contrato</h2>
                    <div className="form__container-contrat-info">
                        <div className="form__inputs-info">
                        <FormGroup label="Privilegios" name="privileges" type="number" value={form.privileges} onChange={handleForm}/>
                        <FormGroup label="Rol" name="rol" type="text" value={form.rol} onChange={handleForm}/>
                            <div className="form__register-group">
                                <label className="form__register-label" htmlFor="area">Área</label>
                                <select className="form__register-select" name="area" id="area" value={form.area} onChange={handleForm}>
                                    <option className="form__register-option" value="" disabled>Elige un área</option>
                                    <option className="form__register-option" value="opcion1">Opción 1</option>
                                    <option className="form__register-option" value="opcion2">Opción 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="form__inputs-info">
                            <FormGroup label="Días Disponibles" name="availableDays" type="number" value={form.availableDays} onChange={handleForm}/>
                            <FormGroup label="Total de Días" name="totalDays" type="number" value={form.totalDays} onChange={handleForm}/>
                            <FormGroup label="Día de Alta" name="signUpDay" type="date" value={form.signUpDay} onChange={handleForm}/>
                        </div>
                    </div>
                    <div className="form__register-check-submit">
                        <div className="form__container-checkbox">
                            <input type="checkbox" className="form__register-checkbox" name="isAvailable" checked={form.isAvailable}/>
                            <label className="form__register-label-check" htmlFor="typeIsAvailable">Está Disponible</label>
                        </div>
                        <input type="submit" className="btn-register" ></input>
                    </div>
                </form>
            </div>
        </div>
    );
}