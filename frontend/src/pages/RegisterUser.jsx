import "../stylesheets/register.css";
import "../stylesheets/modalAlert.css";
import EyeToHide from "../imgs/eye-crossed.svg";
import EyeHiden from "../imgs/eye.svg";
import { useEffect, useState } from "react";
import { addEmployer } from "../services/employeeServices";
import { getAllAreas } from "../services/areaServices";
import { useNavigate } from "react-router-dom";
import { getAllRoles } from "../services/roleServices";
import Loading from '../components/Loading'
import Select from "react-select";
import { useAlert } from "../contexts/AlertContext";


const initalForm = {
    name: "",
    surname: "",
    dni: "",
    email: "",
    password: "",
    privileges: "",
    role_id: 0,
    area_id: 0,
    availableDays: "",
    total_days: "",
    signUpDay: "",
    is_cumulative:true,
}

function FormGroup({ label, name, type, value, onChange }) {
    return (
        <div className="form__register-group">
            <label className="form__register-label" htmlFor={name}>{label}</label>
            {(type == 'number')?
                <input type={type} className="form__register-input" name={name} value={value} min={0} onChange={onChange}/>
            :
                <input type={type} className="form__register-input" name={name} value={value}  onChange={onChange}/>
            }

        </div>
    );
}

export default function RegisterUser ({auth}){
    
    const [passHidden, setPassHidden] = useState(false);
    const [form, setForm] = useState(initalForm);
    const [areas, setAreas] = useState([]);
    const [fetchData,setFetchData] = useState();
    const [errorMsg , setErrorMsg ] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    const { alertConfig, setAlertConfig } = useAlert(); // Usa el contexto alert


    useEffect(()=>{
        const isNotLoginPage = location.pathname !== "/login";
        if(!auth.user && isNotLoginPage){
            navigate("/login");
        }
    }, [auth, navigate]);


    const changePassVisibility = ()=>{
        setPassHidden(!passHidden);
    }

    const handleForm = (e)=>{
        setErrorMsg("")
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const handleSelectChangeAreas = (selectedOption) => {
        setForm({ ...form, area_id: selectedOption.value });
      };

    const handleSelectChangeRoles = (selectedOption) => {
        setForm({ ...form, role_id: selectedOption.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        if ( !form.name || !form.surname || !form.dni || !form.email || !form.password || !form.privileges || !form.role_id || !form.area_id || !form.availableDays || !form.total_days || !form.signUpDay ) {
            setErrorMsg("Por favor, rellene los campos.");
            return;
        } 

        if(form.password.length <8){
            setErrorMsg("La contraseña debe tener como minimo 8 caracteres");
            return;
        }
        const newEmployerToSend = {
            ...form,
            signUpDay : `${form.signUpDay}T00:00:00`
            
        }
        try {
            const save = await addEmployer(newEmployerToSend)
            if(save.status != 200){throw new Error(`No se pudo registrar,${save.date.error || save.date.message}`)}
            setAlertConfig({
                show: true,
                status: "success",
                title: "Registrado",
                message: `Se registro a ${form.name} ${form.surname} con exito`,
              });
        } catch (error) {
            console.error(error)
            setAlertConfig({
                show: true,
                status: "danger",
                title: "Error",
                message: `Hubo un error con el registro, ${error.message}`,
              });
        }
       
    };

    const fetch = async () => {
        try {
          setLoaded(false);
          const areas = await getAllAreas()
          if (areas.status != 200) { throw new Error(areas.data.message || areas.data.error) }
    
          const areasOrder = areas.data.map(area => ({
            value: area.id,
            label: area.area
          }));
    
          const roles = await getAllRoles()
          if (roles.status != 200) { throw new Error(roles.data.message || roles.data.error) }
    
          const rolesOrder = roles.data.map(role => ({
            value: role.id,
            label: role.role_name
          }));
          
          setFetchData({areas:areasOrder,roles:rolesOrder});
          setLoaded(true);
        } catch (error) {
          console.error(error);
          setAlertConfig({
            show: true,
            status: "danger",
            title: "Error",
            message: `Hubo un error al traer los datos ${error.message}`,
          });
        }
      };
      const darkTheme = (theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#999595', // selected option
          primary75: 'white', //no se
          primary50: '#787777', // al hacer click
          primary25: '#999595', //selected option default
          danger: 'red',
          dangerLight: 'white',
          neutral0: '#212020', //background
          neutral5: 'white',
          neutral10: '#212020',
          neutral20: 'white', //flecha select control
          neutral30: 'gray', // hover del input controler
          neutral40: 'white', //text not option 
          neutral50: 'white', //texto placeholder
          neutral60: 'white', // flecha selected contrtol
          neutral70: '#212020',
          neutral80: 'white', //texto select control
          neutral90: 'red',
        },
      });
      const styleSelect = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: 'transparent',
          border: '1px solid #ccc',
          color: 'white', 
          cursor:"pointer"

        }),
        option: (provided, state) => ({
            ...provided,
            cursor:"pointer"
  
          })
      };

    useEffect(() => {
        fetch()
    }, []);

    return (
        <div className="main_register-container">
            
            {loaded?<div className="container_register">
                {errorMsg && (
                <div className="alert alert-danger" role="alert">
                <span className="fw-bold">¡Error! </span>
                {errorMsg}
                </div>
                )}
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="form__register-title">Registrar Usuario</h1>
                    <h2 className="form__register-subtitle">Información Personal</h2>
                    <div className="form__inputs-info">
                        <FormGroup label="Nombre" name="name" type="text" value={form.name} onChange={handleForm}/>
                        <FormGroup label="Apellido" name="surname" type="text" value={form.surname} onChange={handleForm}/>
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
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="">Area</label>
                            <Select
                                theme={darkTheme}
                                styles={styleSelect}
                                options={fetchData?.areas}
                                isDisabled={!loaded}
                                value={(loaded && fetchData?.areas)?fetchData.areas.find(option => option.value == form.area_id) : null}
                                onChange={handleSelectChangeAreas}
                                placeholder={loaded ? "Seleccione un jefe de área" : "Cargando..."}
                            />
                        </div>
                        <div className="form__register-group">
                            <label className="form__register-label" htmlFor="">Rol</label>
                            <Select
                                theme={darkTheme}
                                styles={styleSelect}
                                options={fetchData?.roles}
                                isDisabled={!loaded}
                                value={(loaded && fetchData?.areas)?fetchData.roles.find(option => option.value == form.role_id) : null}
                                onChange={handleSelectChangeRoles}
                                placeholder={loaded ? "Seleccione un jefe de área" : "Cargando..."}
                            />
                        </div>
                        </div>
                        <div className="form__inputs-info d-flex flex-column">
                            <div className="form__inputs-info">
                                <FormGroup label="Días Disponibles" name="availableDays" type="number" value={form.availableDays} onChange={handleForm}/>
                                <FormGroup label="Total de Días" name="total_days" type="number" value={form.total_days} onChange={handleForm}/>
                            </div>
                            
                            <div className="form__inputs-info">
                                <div className="form__register-group">
                                    <label className="form__register-label" htmlFor="form-control">Rol</label>
                                    <select
                                        className="form__register-input form__register-input_options"
                                        id="is_cumulative"
                                        name="is_cumulative"
                                        value={form?.is_cumulative}
                                        onChange={handleForm}
                                        >
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>
                                </div>
                                <FormGroup label="Fecha de contratacion" name="signUpDay" type="date" value={form.signUpDay} onChange={handleForm}/>
                            </div>

                        </div>
                    </div>
                    <div className="form__register-check-submit">                        
                        <input type="submit" className="btn-register" value="Registrarse"/>
                    </div>
                </form>
                
            </div>
            :
            <Loading/>
            }
        </div>
    );
}