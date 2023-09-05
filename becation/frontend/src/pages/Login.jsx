// import "../stylesheets/login.css"
// import "../stylesheets/modalAlert.css"
// import EyeToHide from "../imgs/eye-crossed.svg"
// import EyeHiden from "../imgs/eye.svg"
// import { useState } from "react"
// import ModalAlert from "../components/ModalAlert"
// import useModalAlert from "../helpers/useModalAlert"
// import { login } from "../services/userServices"

// const styleCard = {
//     borderRadius: "1rem",
// }

const styleContainer = {
    borderRadius: "1rem",
    background: "#2e2e2e"
}


    return (

        <main>
            <div className="contenedor" style={styleContainer}>
                <form action="" onSubmit={handleSubmit} className="form-login" >
                    <h2 className="form__title">Iniciá Sesión</h2>
                    <div className="form__container">
                        <div className="form__group">
                            <label className="form__label" htmlFor="typeEmail">Email</label>
                            <input type="email" className="form__input" name="email" value={form.email} onChange={handleForm}/>
                        </div>
                        <div className="form__group">
                            <label className="form__label" htmlFor="typeContraseña">Contraseña</label>
                            <input type={passHidden ? "text" : "password"} className="form__input" name="password" id="password" value={form.password} onChange={handleForm}/>
                            <span className="form__span"><img src={passHidden ? EyeHiden : EyeToHide} alt="" width={"30px"} onClick={changePassVisibility}/></span>                  
                        </div>
                    </div>
                    <div className="register-link">
                        <a href="#">Olvidé mi contraseña</a>
                    </div>
                    <button className="btn-login">Continuar</button>
                </form>
            </div>
            {alert && <ModalAlert msg={msg} handleModalAlert={handleModalAlert} modalStyle={alert ? modalAlertCalled : "aviso-hidden"}/>}
        </main>


    )
            }
    
