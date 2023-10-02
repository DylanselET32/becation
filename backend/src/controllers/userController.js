
 const { getEmployerById, getEmployerByColumn } = require('../DAO/EmployerDAO');
const { getAllRoles } = require('../DAO/RoleDAO');
const UserDAO = require('../DAO/UserDAO');
const { hashCompare, verifyToken } = require('../utils/authUtils');
const { encryptText, createToken } = require('../utils/authUtils');
const email = require('../utils/emeilSendUtils');




// const getAllUsers = async (req,res) => {
//   //esta funcion solo podria ser ejecutada por un admin
//   try {
//     const respuesta = await UserDAO.getAllUsers()
//     res.status(200).json(respuesta);
//   }catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

// const getAllUsersByArea = async (req,res) => {
//     //esta funcion solo podria ser ejecutada por un admin o persona con privilegios y recibe por parametros el id del area y devuelve todos los usuarios que estan en ese area
//     try {
//       const area_id = req.params.area_id
//       const respuesta = await UserDAO.getUserByColumn("role_id",area_id);
//       res.status(200).json(respuesta);
//     }catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
// }

// const getAllAreas = async (req,res) => {
//     //esta funcion solo podria ser ejecutada por un admin o persona con privilegios
//     try {
//       const respuesta = await getAllRoles()
//       res.status(200).json(respuesta);
      
//     }catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
// }

// const getUserById = async (req,res) => {
//   //esta funcion solo podria ser ejecutada por un admin
//   try {
//     const id = req.params.id; // Obtener el ID del usuario desde la ruta
//     const user = await UserDAO.getUserById(id); 
//     if (!user){res.status(404).json({ message: 'User not found' });return;};
//     res.status(200).json(user); 
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
// const getUser = async (req,res) => {
//   //esta funcion va a ser llamada por un usuario y va a devolver su informacion a partir de su token
//   try {
//     const user_id = req.employer.user_id; // Obtener el ID del usuario desde el token en el middleware auth 
//     const user = await UserDAO.getUserById(user_id); 
//     if (!user){res.status(404).json({ message: 'User not found' });return;};
//     res.status(200).json(user); 
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


// const addUser = async (req, res) => {
//   try {
//     //const user_id = req.employer.user_id; // Obtener el ID del usuario desde el token en el middleware auth 

//     const data = req.body;
//     // Verificar si el email ya está registrado
//     const emailExists = await UserDAO.getUserByColumn('email', data.email,null); //lo pongo con null el tercer prop para que tenga en cuenta los emails desaibilitados
//     if (emailExists.length) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }


//     // encriptar contraseña 
//     const dataE = {
//       ...data,
//       password: await encryptText(data.password) 
//     }

//     // Agregar usuario
//     const id = await UserDAO.addUser(dataE);
//     if(!id) throw new Error('Error al agregar usuario');
//     const token = createToken({id}); // Crear el token JWT
//     res.status(200).json({ token }); // Devolver el token en la respuesta
//     //sendConfirmEmail(id);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const editUser = async (req,res) => {
//   try {
//     const id = req.employer.user_id; // Obtener el ID del usuario desde el auth
//     // Obtener el usuario por ID
//     const user = await UserDAO.getUserById(id);
//     // Validar si el usuario existe
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
//     let data = {};
//     for (const prop in req.body) {
//       if(prop != "is_able"){
//         data[prop] = req.body[prop];
//       }
//     }
//     if(data.password!=undefined) {
//       data.password = await encryptText(data.password);
//     }
//     const result = await UserDAO.editUser(data, id); // Editar el usuario utilizando la función edit de CRUD
//     if (result === 0) { // Si el usuario no existe
//       res.status(404).json({ message: 'Failed to edit user'});
//       return;
//     }
//     res.status(200).json({});

//   }catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

// const editUserById = async (req,res) => {
//   try {
//     const id = req.params.id; // Obtener el ID del usuario desde el auth
//     // Obtener el usuario por ID
//     const user = await UserDAO.getUserById(id);
//     console.log(user)
//     // Validar si el usuario existe
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
//     let data = {};
//     for (const prop in req.body) {
//       if(prop != "is_able"){
//         data[prop] = req.body[prop];
//       }
//     }
//     if(data.password!=undefined) {
//       data.password = await encryptText(data.password);
//     }
//     const result = await UserDAO.editUser(data, id); // Editar el usuario utilizando la función edit de CRUD
//     if (result === 0) { // Si el usuario no existe
//       res.status(404).json({ message: 'Failed to edit user'});
//       return;
//     }
//     res.status(200).json({});

//   }catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

const disableUser = async (req, res) => {
  try {
    const id = req.employer.id; // Obtener el ID del usuario desde params
    
    const employer = await getEmployerById(id)
    console.log(employer)
    // Obtener el usuario por ID
    const user = await UserDAO.getUserById(employer.user_id);
    // Validar si el usuario existe
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const data = { is_able: 0 }; // Actualiza el campo "is_able" a false para desactivar el usuario
    const result = await UserDAO.editUser(data, user.id); // Editar el usuario utilizando la función edit de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'Failed to disable user' });
      return;
    }
    res.status(200).json({});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const disableUserByEmployerId = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del usuario desde params
    
    const employer = await getEmployerById(id)
    console.log(employer)
    // Obtener el usuario por ID
    const user = await UserDAO.getUserById(employer.user_id);
    // Validar si el usuario existe
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const data = { is_able: 0 }; // Actualiza el campo "is_able" a false para desactivar el usuario
    const result = await UserDAO.editUser(data, user.id); // Editar el usuario utilizando la función edit de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'Failed to disable user' });
      return;
    }
    res.status(200).json({});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// const deleteUser = async (req,res) => {
//   try {
//     //Por logica empresarial no es correcto eliminar por completo a un usuario de una empresa, debido a que siempre debe quedar registro, pero por normativa tiene que estar el endpoint. 
//     const id = req.employer.user_id; // Obtener el ID del usuario desde el auth
//     const result = await UserDAO.removeUser(id); // Eliminar el usuario 
//     if (result === 0) { // Si el usuario no existe
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     res.status(200).json({}); //confirmo que se elimino correctamente

//   }catch(error){
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

//Funciones especificas

const login = async (req, res) => {
  try {
    const uEmail = req.body.email; // Obtener el nombre de usuario desde el body
    const password = req.body.password;
    
    const userDB =  await UserDAO.getUserByColumn("email", uEmail,null,["id","password"]);;
    
   
    if (!userDB) { res.status(404).json({ message: 'Invalid User' }); return; };

    const isMatch = await hashCompare(password, userDB.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const employee = await getEmployerByColumn("user_id",userDB.id)
    console.log(employee)
    const token = createToken({id:employee.id}); // Crear el token JWT
    console.log(employee.id)
    res.status(200).json({ token }); // Devolver el token en la respuesta
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const confirmEmailResetPassword = async (req, res) => {
  try {
    //aca va a ir la funcion para blanquear una contraseña 
    const infoToken = verifyToken(req.params.token.replaceAll("*","."));
    const uEmail = infoToken.email; // Obtener el email desde el token
    const newPassword = req.body.password;
    if(!infoToken.user_id)throw new Error("invalid or modified token"); 
    const userDB =  await UserDAO.getUserByColumn("email", uEmail, null, ["id", "email","password"]);
    if (!userDB) { res.status(404).json({ message: 'User not found' }); return; };
    if(infoToken.user_id != userDB.id){throw new Error("invalid or modified token")};
    if(userDB.email != infoToken.email)throw new Error("Invalid email")
    let updateData = {
      password: await encryptText(newPassword)
    }
    const updatedUser = await UserDAO.editUser(updateData, userDB.id);
    if(!updatedUser){throw new Error("Error trying to modify the password")}
    const employee = await getEmployerByColumn("user_id",userDB.id)
    const token = createToken({id:employee.id}); // Crear el token JWT
    if (token != null || token != "") {
      res.status(200).json({ token }); // Devolver el token en la respuesta
    }else{
      res.status(400).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const resetPassword = async (req,res) => {
  try {
    const employer_idToReset = req.params.id;
    const sendEmail = email.resetPassword(employer_idToReset);
    if(!sendEmail){throw new Error("Error to send email")}
    res.status(200).json({}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



  
module.exports = {
  // getAllUsers,
  // getAllUsersByArea,
  // getAllAreas,
  // getUserById,
  // getUser,
  // addUser,
  // editUser,
  // editUserById,
  disableUser,
  // deleteUser,
  login,
  resetPassword,
  confirmEmailResetPassword,
  disableUserByEmployerId

}