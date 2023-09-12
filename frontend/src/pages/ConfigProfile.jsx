import "../stylesheets/configprofile.css"

import { useState } from "react";

export default function ConfigProfile(){

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
    <div class="container light-style flex-grow-1 container-p-y">
        <h4 class="font-weight-bold py-3 mb-4">
          Configuración de perfil
        </h4>
        <div class="card overflow-hidden">
            <div class="row no-gutters row-bordered row-border-light">
                <div class="col-md-3 pt-0">
                    <div class="list-group list-group-flush account-settings-links">
                        <a class="list-group-item list-group-item-action active" data-toggle="list"
                            href="#account-general">Usuario</a>
                        <a class="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-change-password">Cambiar Contraseña</a>
                        <a class="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-información">Info</a>
                    </div>
                </div>
                {/* Corte*/}
                <div class="col-md-9">
                    <div class="tab-content">
                        <div class="tab-pane fade active show" id="account-general">
                            <div class="card-body media align-items-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Foto De Perfil" class="d-block ui-w-80"/>
                                <div class="media-body ml-4">
                                    <label class="btn btn-outline-primary">
                                        Subir nueva foto
                                        <input type="file" class="account-settings-fileinput"/>
                                    </label> &nbsp;
                                    {/* Boton para resetear imagen y quede sin foto de perfil*/}
                                    {/* <button type="button" class="btn btn-default md-btn-flat">Reset</button> */}
                                    <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    </div>

    </main>


  </>)

}   