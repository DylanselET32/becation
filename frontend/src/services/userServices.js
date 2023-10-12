import { setAuthToken, getAuthToken } from "../helpers/misc/authUtils";
const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

export async function addUser(user) {
  try {
    const response = await fetch(`${apiUrl}/user/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const status = response.status;
    if (status === 200 && data.token) {
      setAuthToken(data.token);
    }
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error(`Error al agregar un usuario, ${error}`);
  }
}

export async function editUser(user) {
  try {
    const response = await fetch(`${apiUrl}/user/editUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const status = response.status;
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al editar usuario");
  }
}

export async function getUser() {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/Employer/getEmployer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar usuario");
  }
}

export async function deleteUser() {
  try {
    const response = await fetch(`${apiUrl}/user/deleteUser`, {
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
    throw new Error(`Error al eliminar el usuario, ${error}`);
  }
}

export async function login(user) {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const status = response.status;
    if (status === 200 && data.token) setAuthToken(data.token);
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error(`Error al loguearse, ${error}`);
  }
}