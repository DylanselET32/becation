import { useEffect, useState } from "react";
import { getUser } from "../../services/userServices";
import { getAuthToken,deleteAuthToken } from "./authUtils";

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
        return false
    }

    const logOut = ()=>{
        deleteAuthToken()
        setUser(null);
    }
    
    useEffect(()=>{
        reloaded()
    },[])

    return{ authenticated, user, reloaded,logOut}

}
export default useAuth;