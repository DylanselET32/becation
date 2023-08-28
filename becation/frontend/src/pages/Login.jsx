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

// const initalForm = {
//     email: "",
//     password: ""
// }

// export default function Login (){
    
//     const [passHidden, setPassHidden] = useState(false)
//     const [form, setForm] = useState(initalForm)
//     // const [ handleModalAlert, alert, openModalAlert, modalAlertCalled, msg, setMsg]= useModalAlert();


//     // const changePassVisibility = ()=>{
//     //     setPassHidden(!passHidden)
//     // }

//     // const handleForm = (e)=>{
//     //     setForm({
//     //         ...form,
//     //         [e.target.name]: e.target.value
//     //     })
//     // }

//     // const handleSubmit= async(e)=>{
//     //     e.preventDefault();
//     //     if(!form.email || !form.password){
//     //       openModalAlert();
//     //       setMsg("Complete los datos")
//     //       return
//     //     }
//     //     const [data, status]= await login(form)
//     //     if(status == 401){
//     //       openModalAviso();
//     //       setMsg("Contraseña Incorrecta")
//     //     }else if(status == 404){
//     //       openModalAviso();
//     //       setMsg("Usuario incorrecto")
//     //     }else if(status == 400){
//     //       openModalAviso();
//     //       setMsg("Nombre de usuario en uso")
//     //     }else if(status ==200){
//     //         console.log("LOGUEADO...")
//         //   redirec()
//         //   auth.reloaded()
//     //     }
//     // }

//     return (

//         <div></div>
//         // <div>
//         //        <section className="gradient-custom section_login">
//         //     <div className="container py-5 ">
//         //         <div className="row d-flex justify-content-center align-items-center h-80 ">
//         //             <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
//         //                 <form onSubmit={handleSubmit} className="card bg-dark text-white " style={styleCard}>
//         //                     <div className="card-body p-5 text-center">
//         //                         <div className="mb-md-5 mt-md-4 pb-5">
//         //                             <h2 className="fw-bold mb-2 ">Iniciar Sesión</h2>
//         //                             <div className="form-outline form-white mb-4 input_container">
//         //                                 <label className="form-label" htmlFor="typeEmail">Email</label>
//         //                                 <div className="input_login">
//         //                                     <input type="email" id="typeEmail" name="email" value={form.email} onChange={handleForm}/>
                                            
//         //                                 </div>
//         //                             </div>
//         //                             <div className="form-outline form-white mb-4 input_container">
//         //                                 <label className="form-label" htmlFor="typeContraseña">Contraseña</label>
//         //                                 <div className="input_login">
//         //                                     <input type={passHidden ? "text" : "password"} id="password" name="password" value={form.password} onChange={handleForm}/>
//         //                                     <img src={passHidden ? EyeHiden : EyeToHide} alt="" width={"30px"} onClick={changePassVisibility}/>
//         //                                 </div>
//         //                             </div>
//         //                             <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Olvidé mi Contraseña</a></p>
//         //                             <button className="btn btn-outline-light btn-lg px-5 button_login" type="submit">Continuar</button>
//         //                         </div>
//         //                     </div>
//         //                 </form>
//         //             </div>
//         //         </div>
//         //     </div>
//         //     {/* <img src={EyeToHide} alt="" /> */}
//         // </section>
//         // {/* {alert && <ModalAlert msg={msg} handleModalAlert={handleModalAlert} modalStyle={alert ? modalAlertCalled : "aviso-hidden"}/>} */}
//         // </div>
     

//     )
// }
    
