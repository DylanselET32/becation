import { useParams } from "react-router";
import "../stylesheets/passwordreset.css"

import { useState } from "react";
import { confirmEmailResetPassword, resetPassword } from "../services/employeeServices";
import { useAlert } from "../contexts/AlertContext";
import { useNavigate } from "react-router-dom";


export default function ResetPassword({auth}){
    const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert

    const token = useParams().token
    
  const [dataToFetch, setDataToFetch] = useState({
    password1:'',
    password2:''
  });
  
  const [errorMsg,setErrorMsg] = useState(false)
  const [seePassword1,setSeePassword1] = useState(false)
  const [seePassword2,setSeePassword2] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    const isNotLoginPage = location.pathname !== "/login";
    if(!auth.user && isNotLoginPage){
        navigate("/login");
    }
}, [auth, navigate]);
    
  //Este const maneja los cambios a realizar en la contraseña
  const handleChange = (e) => {
    setErrorMsg("")
      const { name, value } = e.target;
      setDataToFetch({ ...dataToFetch, [name]: value });
    };

  //Esta const guarda los cambios de la contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const p1 = dataToFetch.password1;
      const p2 = dataToFetch.password2;
  
      // Check if any field is empty
      if (!p1 || !p2) {
        setErrorMsg("Completa todos los campos!");
        return;
      }
      // Check if passwords do not match
      if (p1 !== p2) {
        setErrorMsg("Las contraseñas no coinciden");
        return;
      }
      // Check if the password length is at least 8 characters
      if (p1.length < 8) {
        setErrorMsg("La contraseña debe tener al menos 8 caracteres");
        return;
      }
      const passwordPattern = /^[a-zA-Z0-9]+$/;
      if (!passwordPattern.test(p1) || !passwordPattern.test(p2)) {
        setErrorMsg("La contraseña no debe contener caracteres especiales");
        return;
      }
  
      const objToSend = {
        password: p1,
      };
      const sendPassword = await confirmEmailResetPassword(objToSend, token);
      if(sendPassword.status == 200){
        setAlertConfig({
            show: true,
            status: 'success',
            title: 'Guardado',
            message: `Se guardo la nueva contaseña con exito, ¡Ya podes iniciar sesion!`,
        });
      }
      console.log(objToSend);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        "Hubo un error al guardar la nueva contraseña. Vuelve a intentarlo en un rato. Si el error persiste, ponte en contacto con Soporte."
      );
    }
  };
  

  return (<>
    <main>
    <div className="resetpassword-container">
        <header>Configuración de Contraseña</header>
        {errorMsg && (
            <div className="alert alert-danger" role="alert">
              <span className="fw-bold">¡Error! </span>
              {errorMsg}
            </div>
          )}
        <form action="#">
            <div className="resetpassword-form">
                <div className="">
                    <div className="resetpassword-fields">
                        <div className="resetpassword-input-field">
                            <label htmlFor="">Ingresar Nueva Contraseña</label>
                            <input className="input-text" type={seePassword1?'text':'password'} name="password1" value={dataToFetch.password1} placeholder="Ingrese su nueva contraseña" onChange={handleChange}/>
                            <label htmlFor="password1"><input id="password1" value={seePassword1} onChange={() => setSeePassword1(!seePassword1)} type="checkbox"/> Ver Contaseña</label>
                        </div>
                        <div className="resetpassword-input-field">
                            <label htmlFor="">Repetir Nueva Contraseña</label>
                            <input  className="input-text" type={seePassword2?'text':'password'} name="password2" value={dataToFetch.password2} placeholder="Repita su nueva contraseña" onChange={handleChange}/>
                            <label htmlFor="password2"><input id="password2" value={seePassword2} onChange={() => setSeePassword2(!seePassword2)} type="checkbox"/> Ver Contaseña</label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                    <button className="m-auto mt-5 position-absolute" onClick={handleSubmit}>
                        <span className="btnText">Guardar Cambios</span>
                    </button>
                    
                    </div>
                </div>
            </div>
        </form>
    </div>
    </main>


  </>)

}   