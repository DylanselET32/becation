import "../stylesheets/configprofile.css"
import { getEmployerById} from '../../services/employeeServices';
import { useState } from "react";

export default function ConfigProfile(){
    const [fetchData, setFetchData] = useState();
    const [profileToEdit, setProfileToEdit] = useState();

    const handleInput = (e)=>{
        setErrorMsg("")
        const {name,value} = e.target
       setVacationToEdit({ ...vacationToEdit, [name] : valueToSet })
    }



    const fetch = async ()->{
        try {
            const user = await getEmployerById(id)
            if(user.status != 200){throw new Error(user.data.message || user.data.error)}  
            
            const user = await getConfigProfileById(id)
            if(user.status != 200){throw new Error(user.data.message || user.data.error)}  

            const user = await getConfigProfileById(id)
            if(user.status != 200){throw new Error(user.data.message || user.data.error)}  

            const user = await getConfigProfileById(id)
            if(user.status != 200){throw new Error(user.data.message || user.data.error)}  

            const user = await getConfigProfileById(id)
            if(user.status != 200){throw new Error(user.data.message || user.data.error)}  

            const user = await getConfigProfileById(id)
            if(user.status != 200){throw new Error(user.data.message || user.data.error)}  
        
        setFetchData(
            {
            users: user.data,

            }
        )
            
        setProfileToEdit(
            {
            users: user.data,
            }
        )

        }catch(error){
            console.error(error)
            setErrorMsg(error.message)
        }

    }
    useEffect(()=>{
    fetch()
    },[])    
    
    
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