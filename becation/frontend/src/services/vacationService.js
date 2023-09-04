import { setAuthToken, getAuthToken } from "../helpers/misc/authUtils";
const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;


// export async function addUser(user) {
//   try {
//     const response = await fetch(`${apiUrl}/${apiVersion}/addUser`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
//     const data = await response.json();
//     const status = response.status;
//     if (status === 200 && data.token) {
//       setAuthToken(data.token);
//     }
//     return [data, status];
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error al agregar usuario");
//   }
// }

// export async function editUser(user) {
//   try {
//     const response = await fetch(`${apiUrl}/user/editUser`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getAuthToken()}`,
//       },
//       body: JSON.stringify(user),
//     });
//     const data = await response.json();
//     const status = response.status;
//     return [data, status];
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error al editar usuario");
//   }
// }

// export async function getUser() {
//   try {
//     const response = await fetch(`${apiUrl}/user/getUser`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getAuthToken()}`,
//       },
//     });
//     const data = await response.json();
//     const status = response.status;
//     return {data:data, status};
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error al solicitar usuario");
//   }
// }

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
    return [data, status];
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar sesion");
  }
}

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