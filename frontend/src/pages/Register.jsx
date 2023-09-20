import "../stylesheets/register.css"
import "../stylesheets/modalAlert.css"
import EyeToHide from "../imgs/eye-crossed.svg"
import EyeHiden from "../imgs/eye.svg"
import { useState } from "react"
//import ModalAlert from "../components/ModalAlert"
//import useModalAlert from "../helpers/useModalAlert"
//import { login } from "../services/userServices"

const initalForm = {
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    password: "",
    privilegios: "",
    rol: "",
    area: "",
    availableDays: "",
    totalDays: "",
    signUpDay: "",
    isAvailable: false,
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
    return (
        <div className="main_register-container">
            <div className="container_register">
                <form action="">
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
                        <FormGroup label="Contraseña" name="password" type={passHidden ? "text" : "password"} value={form.password} onChange={handleForm}/>
                        <div className="password"><img src={passHidden ? EyeHiden : EyeToHide} alt="" width={"30px"} onClick={changePassVisibility} className="ayeIcon"/></div>
                    </div>
                    <h2 className="form__register-subtitle">Información del Contrato</h2>
                    <div className="form__container-contrat-info">
                        <div className="form__inputs-info">
                        <FormGroup label="Privilegios" name="privilegios" type="text" value={form.privilegios} onChange={handleForm}/>
                        <FormGroup label="Rol" name="rol" type="text" value={form.rol} onChange={handleForm}/>
                            <div className="form__register-group">
                                <label className="form__register-label" htmlFor="typeArea">Área</label>
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
                            <input type="checkbox" className="form__register-checkbox" name="isAvailable" checked={form.isAvailable} onChange={() => { setForm({ ...form, isAvailable: !form.isAvailable, }); }}/>
                            <label htmlFor="typeIsAvailable">Está Disponible</label>
                        </div>
                        <button className="btn-register">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
}