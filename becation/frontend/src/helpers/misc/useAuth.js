import { useEffect, useState } from "react";
import { getUser } from "../../services/userServices";
import { getAuthToken } from "./authUtils";

const useAuth= ()=>{
    const [user,setUser] = useState(null);
    const [authenticated,setAuthenticated] = useState(false);

    const reloaded = async ()=>{
        setAuthenticated(false)
        setUser(null)
        if(getAuthToken()){
            const u = await getUser()

            if(u.data){
               setUser(u.data) 
                setAuthenticated(true)
                return true
            }
        }
        
    }
    
    useEffect(()=>{
        reloaded()
    },[])

    return{ authenticated, user, reloaded}

}
export default useAuth;