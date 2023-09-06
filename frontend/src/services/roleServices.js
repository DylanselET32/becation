import { setAuthToken, getAuthToken } from "../helpers/misc/authUtils";
const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

/* MÉTODOS GET */
export async function getRoleById(id) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/role/getRoleById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al conseguir el Role'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar el rol");
    }
}

export async function getRoleByName(nombreRol){
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/role/getRoleByName/${nombreRol}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al conseguir el Role'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar el rol");
    }
}

export async function getAllRoles() {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/role/getAllRoles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al conseguir los roles'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar el rol");
    }
}

/* MÉTODO ADD */
export async function addRole(role) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/role/addRole`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(role),
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al agregar el Role'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al agregar el rol");
    }
}

/* MÉTODO PATCH */
export async function editRole(id, role) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/role/editRole/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(role),
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al modificar el Role'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al modificar el rol");
    }
}

/* MÉTODO DELETE */
export async function deleteRole(id) {
    try {
        const response = await fetch(`${apiUrl}/role/deleteRole/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al eliminar el Role'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar rol");
    }
}