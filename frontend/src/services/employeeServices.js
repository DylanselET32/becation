
import { setAuthToken, getAuthToken } from "../helpers/misc/authUtils";
const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;
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
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error ||data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al deshabilitar el usuario, ${error}`);
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
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error ||data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al deshabilitar el usuario, ${error}`);
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
            },
            body: JSON.stringify(obj),
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error || data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al loguearse, ${error}`);
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
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error ||data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al resetear la contraseña, ${error}`);
    }
}

export async function confirmEmailResetPassword(obj, token) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/user/confirmEmailResetPassword/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error ||data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al resetear la contraseña, ${error}`);
    }
}

/* EMPLOYEE SERVICES */
/* MÉTODOS GET */
export async function getAllEmployers() {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/employer/getAllEmployers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
        },
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error ||data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al conseguir los empleados, ${error}`);
    }
}

export async function getEmployer() {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/employer/getEmployer`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
        },
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error ||data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al conseguir el empleado, ${error}`);
    }
}

export async function getAllEmployersByArea(id) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/employer/getAllEmployersByArea/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error ||data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al conseguir los empleados, ${error}`);
    }
}

export async function getEmployerById(id) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/employer/getEmployerById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error ||data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al conseguir los empleados, ${error}`);
    }
}

/* MÉTODO POST */
export async function addEmployer(employer) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/employer/addEmployer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(employer),
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error || data?.message}`); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al agregar un empleado, ${error}`);
    }
}

/* MÉTODOS PATCH */
export async function editEmployer(employer) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/employer/editEmployer`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(employer),
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error || data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al editar el empleado, ${error}`);
    }
}

export async function editEmployerById(employer, id) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/employer/editEmployerById/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(employer),
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error || data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al editar el empleado, ${error}`);
    }
}

/* MÉTODO DELETE */
export async function deleteEmployer(id) {
    try {
        const response = await fetch(`${apiUrl}/vacation/deleteEmployer/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status != 200) throw new Error(`Error en el servidor, ${data?.error || data?.message}`);
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error(`Error al eliminar el empleado, ${error}`);
    }
}