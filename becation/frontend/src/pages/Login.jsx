export default function Login (){
    const styleCard = {
        borderRadius: "1rem",
    }

    

    return (
        <section className="gradient-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={styleCard}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Iniciar Sesión</h2>
                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="typeEmail">Email</label>
                                        <input type="email" id="typeEmail" className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="typeContraseña">Contraseña</label>
                                        <input type="password" id="typeContraseña" className="form-control form-control-lg"/>
                                        <input type="checkbox"/>
                                    </div>
                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Olvidé mi Contraseña</a></p>
                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Continuar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
    
