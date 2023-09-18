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