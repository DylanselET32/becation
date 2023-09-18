/* THIS JS HAS THE EMPLOYEE AND USER SERVICES/ENDPOINTS */

/* USER SERVICES */

/* MÉTODOS PATCH */
export async function disableUser() {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/user/disableUser`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al deshabilitar el usuario'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al deshabilitar el usuario");
    }
}

export async function disableUserByEmployerId(id) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/user/disableUser/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al deshabilitar el usuario'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al deshabilitar el usuario");
    }
}

/* MÉTODOS POST */
export async function login(email, pass) {
    try {
        const obj = {email : email, password : pass};
        const response = await fetch(`${apiUrl}/${apiVersion}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify(obj),
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al loguearse'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al loguearse");
    }
}

export async function resetPassword(id) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/user/resetPassword/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al solicitar el reseteo de contraseña'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar el reseteo de contraseña");
    }
}

export async function confirmEmailResetPassword(newPass, token) {
    try {
        const obj = {password : newPass};
        const response = await fetch(`${apiUrl}/${apiVersion}/user/confirmEmailResetPassword/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify(obj),
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al solicitar el reseteo de contraseña'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar el reseteo de contraseña");
    }
}