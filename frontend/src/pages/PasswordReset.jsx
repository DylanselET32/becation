import "../stylesheets/passwordreset.css"

import { useState } from "react";

export default function PasswordReset(){

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
    <div className="resetpassword-container">
        <header>Configuración de Contraseña</header>
        <form action="#">
            <div className="resetpassword-form">
                <div className="resetpassword">
                    <span className="resetpassword-title">Cambiar contraseña</span>
                    <div className="resetpassword-fields">
                        <div className="resetpassword-input-field">
                            <label htmlFor="">Contraseña actual</label>
                            <input type="password" placeholder="Ingrese su actual contraseña"/>
                        </div>
                        <div className="resetpassword-input-field">
                            <label htmlFor="">Ingresar Nueva Contraseña</label>
                            <input type="password" placeholder="Ingrese su nueva contraseña"/>
                        </div>
                        <div className="resetpassword-input-field">
                            <label htmlFor="">Repetir Nueva Contraseña</label>
                            <input type="password" placeholder="Repita su nueva contraseña"/>
                        </div>
                    </div>
                    <button className="btn">
                        <span className="btnText">Guardar Cambios</span>
                    </button>
                </div>
            </div>
        </form>

    </div>
    </main>


  </>)

}   