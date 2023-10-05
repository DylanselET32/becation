import "../stylesheets/register.css";
import "../stylesheets/modalAlert.css";
import EyeToHide from "../imgs/eye-crossed.svg";
import EyeHiden from "../imgs/eye.svg";
import { useEffect, useState } from "react";
import { addEmployer } from "../services/employeeServices";
import { getAllAreas } from "../services/areaServices";
import { useNavigate } from "react-router-dom";


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

export default function Register ({auth}){
    
    const [passHidden, setPassHidden] = useState(false);
    const [form, setForm] = useState(initalForm);
    const [areas, setAreas] = useState([]);
    const [fetchData,setFetchData] = useState();
    const [vacationToEdit,setVacationToEdit] = useState();
    const navigate = useNavigate();


    useEffect(()=>{
        const isNotLoginPage = location.pathname !== "/login";
        if(!auth.user && isNotLoginPage){
            navigate("/login");
        }
    }, [auth, navigate]);


    const handleClose = () => {
        setFetchData(null);
        setVacationToEdit(null);
    };

    const changePassVisibility = ()=>{
        setPassHidden(!passHidden);
    }

    const handleForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async () => {
        if ( form.nombre && form.apellido && form.dni && form.email && form.password && form.privileges && form.rol && form.area && form.availableDays && form.totalDays && form.signUpDay && form.isAvailable) {
            console.log("Nuevo usuario a agregar:", form);
        } else {
            window.alert("Por favor, rellene los campos.");
            return;
        }
    };

    // useEffect(() => {
    //     // Simulación de datos de áreas
    //     const simulatedAreas = [
    //         { id: 1, name: "Área 1" },
    //         { id: 2, name: "Área 2" },
    //         { id: 2, name: "Área 3" },
    //         { id: 2, name: "Área 4" },
    //         { id: 2, name: "Área 5" },
    //         { id: 2, name: "Área 6" },
    //         { id: 2, name: "Área 7" },
    //     ];

    //     setAreas(simulatedAreas);
    // }, []);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await getAllAreas();
                if (response.status === 200) {
                    setAreas(response.data);
                } else {
                    console.error("Error al obtener las áreas");
                }
            } catch (error) {
                console.error("Error al obtener las áreas:", error);
            }
        };

        fetchAreas();
    }, []);

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
                            <label className="form__register-label" htmlFor="password">Contraseña</label>
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
                                    {areas.map((area) => (
                                        <option key={area.id} className="form__register-option" value={area.id}>{area.name}</option>
                                    ))}
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
                            <label className="form__register-label-check" htmlFor="isAvailable">Está Disponible</label>
                        </div>
                        <input type="submit" className="btn-register" value="Registrarse"/>
                    </div>
                </form>
            </div>
        </div>
    );
}