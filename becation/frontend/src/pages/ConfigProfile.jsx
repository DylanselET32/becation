import "../stylesheets/configprofilex.css"

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
        
    </>)
}   