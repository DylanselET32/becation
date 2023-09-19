import { setAuthToken, getAuthToken } from "../helpers/misc/authUtils";
const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

/* MÉTODOS GET */
export async function getAreaById(id) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/area/getAreaById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al conseguir el area'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar el area");
    }
}

export async function getAreaByColumn(nombreArea){
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/area/getAreaByColumn/${nombreArea}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al conseguir el area'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar el area");
    }
}

export async function getAllAreas() {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/area/getAllAreas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al conseguir las areas'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar las area");
    }
}

/* MÉTODO ADD */
export async function addArea(area) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/area/addArea`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(area),
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al agregar el area'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al agregar el area");
    }
}

/* MÉTODO PATCH */
export async function editArea(id, area) {
    try {
        const response = await fetch(`${apiUrl}/${apiVersion}/area/editArea/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(area),
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al modificar el area'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al editar el area");
    }
}

/* MÉTODO DELETE */
export async function deleteArea(id) {
    try {
        const response = await fetch(`${apiUrl}/area/deleteArea/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        if (status == 500) throw new Error('Error al eliminar el area'); 
        return {data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar el area");
    }
}