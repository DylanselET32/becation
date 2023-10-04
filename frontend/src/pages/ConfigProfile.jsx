import "../stylesheets/configprofile.css"
import { useNavigate } from "react-router-dom";


import { useState , useEffect } from "react";

export default function ConfigProfile({auth}){

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: '',
        surname: '',
        password: '',
        email: '',
        dni: '',
        privileges: '',
        role_id: '',
        area_id: '',
        avaible_days: '',
        total_days: '',
        is_acumulative: '',
        contrat_day: '',
        sign_up_date: '',

    // Otros campos de perfil
  });

  useEffect(()=>{
    const isNotLoginPage = location.pathname !== "/login";
    if(!auth.user && isNotLoginPage){
        navigate("/login");
    }
}, [auth, navigate]);
    
  //Este const maneja los cambios a realizar en el perfil
  const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    };
    

  //Esta const guarda los cambios en el perfil
    const handleSubmit = (e) => {
       e.preventDefault();
        
      };

    
  return (<>
    <main>
    <div className="container">
        <header>Configuración de Usuario</header>
        <form action="#">
            <div className="form">
                <div className="details personal">
                    <span className="title">Datos Personales</span>
                    <div className="fields">
                        <div className="input-field">
                            <label htmlFor="">Nombre</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Apellido</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Email</label>
                            <input type="mail" value="Funcion que regrese dato del register"/>
                        </div>

                        <div className="input-field">
                            <label htmlFor="">Dni</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Privilegies</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Rol</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                    </div>
                </div>

                <div className="details cuenta">
                    <span className="title">Datos de Cuenta</span>
                    <div className="fields">
                        <div className="input-field">
                            <label htmlFor="">Area</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Available Days</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Total Days</label>
                            <input type="mail" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Is Acumulative</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Contrat Day</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Sign In Up</label>
                            <input type="text" value="Funcion que regrese dato del register"/>
                        </div>
                    </div>
                    <button className="Btn">
                        <span className="btnText">Guardar Cambios</span>
                    </button>
                </div>
            </div>
        </form>

    </div>
    </main>


  </>)

}   