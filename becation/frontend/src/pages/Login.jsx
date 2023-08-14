import "../stylesheets/login.css"
import EyeToHide from "../imgs/eye-crossed.svg"
import EyeHiden from "../imgs/eye.svg"
import { useState } from "react"

const styleCard = {
    borderRadius: "1rem",
    background: "#2e2e2e"
}

const initalForm = {
    email: "",
    password: ""
}

export default function Login (){
    
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

    const handleSubmit= ()=>{
        if(!form.email || !form.password){
            window.alert("Dale gay")
            return
        }
    }

    return (
        <section className="section_login">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100 ">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
                        <form onSubmit={handleSubmit} className="card text-white" style={styleCard}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-4">
                                    <h2 className="fw-bold mb-5 text-uppercase">Iniciar Sesión</h2>
                                    <div className="form-outline form-white mb-4 input_container">
                                        <label className="form-label" htmlFor="typeEmail">Email</label>
                                        <div className="input_login">
                                            <input type="email" id="typeEmail" name="email" value={form.email} onChange={handleForm}/>
                                        </div>
                                    </div>
                                    <div className="form-outline form-white mb-4 input_container">
                                        <label className="form-label" htmlFor="typeContraseña">Contraseña</label>
                                        <div className="input_login">
                                            <input type={passHidden ? "text" : "password"} id="password" name="password" value={form.password} onChange={handleForm}/>
                                            <img src={passHidden ? EyeHiden : EyeToHide} alt="" width={"30px"} onClick={changePassVisibility}/>
                                        </div>
                                    </div>
                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Olvidé mi Contraseña</a></p>
                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Continuar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <img src={EyeToHide} alt="" /> */}
        </section>
    )
}
    
