import { setAuthToken, getAuthToken } from "../helpers/misc/authUtils";
const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;


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
    return {data:data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar usuario");
  }
}

export async function addVacation(vacation) {
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/vacation/addVacation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const status = response.status;
  
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
