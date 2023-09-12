import { setAuthToken, getAuthToken } from "../helpers/misc/authUtils";
const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

/* MÉTODOS GET */
export async function getVacationById(id) {
  try {
      const response = await fetch(`${apiUrl}/${apiVersion}/area/getVacationById/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getAuthToken()}`,
          },
      });
      const data = await response.json();
      const status = response.status;
      if (status == 500) throw new Error('Error al conseguir la vacacion.'); 
      return {data, status};
  } catch (error) {
      console.error(error);
      throw new Error("Error al solicitar la vacacion");
  }
}

export async function getVacationByColumn(nombreV){
  try {
      const response = await fetch(`${apiUrl}/${apiVersion}/area/getVacationByColumn/${nombreV}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getAuthToken()}`,
          },
      });
      const data = await response.json();
      const status = response.status;
      if (status == 500) throw new Error('Error al conseguir la vacacion'); 
      return {data, status};
  } catch (error) {
      console.error(error);
      throw new Error("Error al solicitar la vacacion");
  }
}

export async function getAllVacations() {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/vacation/getAllVacations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    if (status == 500) throw new Error('Error al conseguir las vacaciones.'); 
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar la vacacion");
  }
}

export async function getVacations() {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/vacation/getVacations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    if (status == 500) throw new Error('Error al conseguir las vacaciones.'); 
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar la vacacion");
  }
}

export async function getAllVacationsByArea() {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/vacation/getAllVacationsByArea`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    if (status == 500) throw new Error('Error al conseguir las vacaciones.'); 
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar la vacacion");
  }
}

export async function getAllVacationsByUser() {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/vacation/getAllVacationsByUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    if (status == 500) throw new Error('Error al conseguir las vacaciones.'); 
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar la vacacion");
  }
}

export async function getAllVacationsByEmployerId(id) {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/vacation/getAllVacationsByEmployerId/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    if (status == 500) throw new Error('Error al conseguir las vacaciones.'); 
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar la vacacion");
  }
}

export async function getAllVacationsBetweenDates(start_date, end_date) {
  try {
    const obj = {startDate : start_date, endDate : end_date};
    const response = await fetch(`${apiUrl}/${apiVersion}/vacation/getAllVacationsBetweenDays`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
        body: JSON.stringify(obj),
      },
    });
    const data = await response.json();
    const status = response.status;
    if (status == 500) throw new Error('Error al conseguir las vacaciones.'); 
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar la vacacion");
  }
}

export async function addVacation(vacation) {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/vacation/addVacation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vacation),
    });
    const data = await response.json();
    const status = response.status;
    if (status == 500) throw new Error('Error al agregar el area'); 
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar usuario");
  }
}

// export async function deleteUser() {
//   try {
//     const response = await fetch(`${apiUrl}/user/deleteUser`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getAuthToken()}`,
//       },
//     });
//     const data = await response.json();
//     const status = response.status;
//     return [data, status];
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error al eliminar usuario");
//   }
// }



// export async function confirmEmailByToken(token) {
//   try {
//     const response = await fetch(`${apiUrl}/user/confirmEmail/${token}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await response.json();
//     const status = response.status;
//     return {data, status};
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error al iniciar sesion");
//   }
// }
