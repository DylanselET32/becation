import "../stylesheets/login.css";
import "../stylesheets/modalAlert.css";
import EyeToHide from "../imgs/eye-crossed.svg";
import EyeHiden from "../imgs/eye.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/userServices";
import { useEffect } from "react";
import { useAlert } from "../contexts/AlertContext";

const initalForm = {
  email: "",
  password: "",
};

export default function Login({ auth }) {
  const navigate = useNavigate();
  const [passHidden, setPassHidden] = useState(false);
  const [form, setForm] = useState(initalForm);
  const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert

  const changePassVisibility = () => {
    setPassHidden(!passHidden);
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setAlertConfig({
        show: true,
        status: 'warning',
        title: 'Error al iniciar sesion',
        message: "Complete los datos faltantes",
      });
      return;
    }
    const { data, status } = await login(form);
    if (status == 401) {
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error al iniciar sesion',
        message: "Contraseña Incorrecta",
      });
    } else if (status == 404) {
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error al iniciar sesion',
        message: "Email incorrecto",
      });
    } else if (status == 500) {
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error al iniciar sesion',
        message: "Error en el servidor, intentelo mas tarde",
      });
    } else if (status == 200) {
     
      await auth.reloaded();
      console.log("USER...", auth);
      redirec(); 
      setAlertConfig({
        show: false,
       });
    }
  };

  const redirec = () => {
    const previousUrl = document.referrer;

    if (previousUrl === window.location.href || !previousUrl) {
      navigate("/");
    } else {
      window.history.back();
    }
  };

  const reloaded = async () => {
    const authe = await auth.reloaded();
    console.log(authe);
    if (authe) {
      redirec();
    }
  };

  // useEffect(()=>{
  //   reloaded()
  // },[])

  return (
    <>
      <div className="main_login-container">
        <div className="container_login">
          <form action="" onSubmit={handleSubmit}>
            <h2 className="form__login-title">Iniciá Sesión</h2>
            <div className="form__login-container">
              <div className="form__login-group">
                <label className="form__login-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="form__login-input"
                  name="email"
                  value={form.email}
                  onChange={handleForm}
                />
              </div>
              <div className="form__login-group">
                <label className="form__login-label" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type={passHidden ? "text" : "password"}
                  className="form__login-input"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleForm}
                />
                <span className="form__login-span">
                  <img
                    src={passHidden ? EyeHiden : EyeToHide}
                    alt=""
                    width={"30px"}
                    onClick={changePassVisibility}
                  />
                </span>
              </div>
            </div>
            <button className="btn-login">Continuar</button>
          </form>
        </div>
        {/* {alert && <ModalAlert msg={msg} handleModalAlert={handleModalAlert} modalStyle={alert ? modalAlertCalled : "aviso-hidden"}/>} */}
      </div>
    </>
  );
}
