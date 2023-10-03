import "../stylesheets/configprofile.css"

import { useState } from "react";

export default function ProfileConfig(){

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
    <div className="container">
        <header>Configuración de Usuario</header>
        <form action="#">
            <div className="form">
                <div className="details personal">
                    <span className="title">Datos Personales</span>
                    <div className="fields">
                        <div className="input-field">
                            <label htmlFor="">Nombre</label>
                            <input type="text" onChange={handleChange} name="name" value={profile.name}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Apellido</label>
                            <input type="text" onChange={handleChange} name="surname" value={profile.surname}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Email</label>
                            <input type="mail" onChange={handleChange} name="email" value={profile.email}/>
                        </div>

                        <div className="input-field">
                            <label htmlFor="">Dni</label>
                            <input type="text" onChange={handleChange} name="dni" value={profile.dni}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Privileges</label>
                            <input type="text" onChange={handleChange} name="privileges" value={profile.privileges}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Rol</label>
                            <input type="text" onChange={handleChange} name="role" value={profile.role_id}/>
                        </div>
                    </div>
                </div>

                <div className="details cuenta">
                    <span className="title">Datos de Cuenta</span>
                    <div className="fields">
                        <div className="input-field">
                            <label htmlFor="">Area</label>
                            <input type="text" onChange={handleChange} name="area" value={profile.area_id}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Available Days</label>
                            <input type="text" onChange={handleChange} name="avaible_days" value={profile.avaible_days}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Total Days</label>
                            <input type="mail" onChange={handleChange} name="total_days" value={profile.total_days}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Is Acumulative</label>
                            <input type="text" onChange={handleChange} name="is_acumulative" value={profile.is_acumulative}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Contrat Day</label>
                            <input type="text" onChange={handleChange} name="contrat_day" value={profile.contrat_day}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Sign In Up</label>
                            <input type="text" onChange={handleChange} name="sign_up_date" value={profile.sign_up_date}/>
                        </div>
                    </div>
                    <button className="Btn">
                        <span className="btnText" onClick={handleSubmit}>Guardar Cambios</span>
                    </button>
                </div>
            </div>
        </form>

    </div>
    </main>


  </>)

}   