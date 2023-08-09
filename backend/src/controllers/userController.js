// const CRUD = require('../services/crud')
// const userService = require('../services/userService');
// const { sendConfirmEmail } = require('../utils/emeilSendUtils');
// const utils = require('../utils/utils')
// const bcrypt = require('bcryptjs');

const getAllUsers = async (req,res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    // const respuesta = await userService.getAllUsers();
    // res.status(200).json(respuesta);
    res.status(200).json("ENDPOINT ENRUTADO");
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllUsersByArea = async (req,res) => {
    //esta funcion solo podria ser ejecutada por un admin
    try {
      // const respuesta = await userService.getAllUsers();
      // res.status(200).json(respuesta);
      res.status(200).json("ENDPOINT ENRUTADO");
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllAreas = async (req,res) => {
    //esta funcion solo podria ser ejecutada por un admin
    try {
      // const respuesta = await userService.getAllUsers();
      // res.status(200).json(respuesta);
      res.status(200).json("ENDPOINT ENRUTADO");
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserById = async (req,res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    // const id = req.params.id; // Obtener el ID del usuario desde la ruta
    // const user = await userService.getUserById(id); 
    // if (!(utils.isExist(user))){res.status(404).json({ message: 'User not found' });return;};
    // res.status(200).json(user); 
    res.status(200).json("ENDPOINT ENRUTADO");

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const getUser = async (req,res) => {
  try {
    // const id = req.user.idUser; // Obtener el ID del usuario desde el auth
    // const user = await userService.getUserById(id); 
    // if (!(utils.isExist(user))){res.status(404).json({ message: 'User not found' });return;};
    // res.status(200).json(user); 
    res.status(200).json("ENDPOINT ENRUTADO");

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const addUser = async (req, res) => {
  try {
//     const data = req.body;

//     // Verificar si el email ya está registrado
//     const emailExists = await userService.getUserByColumn('email', data.email,null); //lo pongo con null el tercer prop para que tenga en cuenta los emails desaibilitados
//     if (emailExists.length) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Verificar si el nombre de usuario ya está en uso
//     const userNameExists = await userService.getUserByColumn("userName", data.userName,null); //lo pongo con null el tercer prop para que tenga en cuenta los users desaibilitados
//     if (userNameExists.length) {
//       return res.status(400).json({ message: 'Username already taken' });
//     }

//     // encriptar contraseña 
//     const dataE = {
//       ...data,
//       password: await utils.encryptText(data.password) 
//     }
//     // Agregar usuario
//     const id = await userService.addUser(dataE);
//     if(!id) throw new Error('Error al agregar usuario');
//     const token = utils.createToken({idUser:id}); // Crear el token JWT
//     res.status(200).json({ token }); // Devolver el token en la respuesta
//     sendConfirmEmail(id);
res.status(200).json("ENDPOINT ENRUTADO");

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const editUser = async (req,res) => {
  try {
    // const id = req.user.idUser; // Obtener el ID del usuario desde el auth
    
    // // Obtener el usuario por ID
    // const user = await userService.getUserById(id);
    // // Validar si el usuario existe
    // if (!utils.isExist(user)) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    // let data = {};
    // for (const prop in req.body) {
    //   if(prop != "is_active"){
    //     data[prop] = req.body[prop];
    //   }
    // }
    // if(data.password!=undefined) {
    //   data.password = await utils.encryptText(data.password);
    // }
    // const result = await userService.editUser(data, id); // Editar el usuario utilizando la función edit de CRUD
    // if (result === 0) { // Si el usuario no existe
    //   res.status(404).json({ message: 'User not edit' });
    //   return;
    // }
    // res.status(200).json({});
    res.status(200).json("ENDPOINT ENRUTADO");

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const disableUser = async (req, res) => {
  try {
    // const id = req.user.idUser; // Obtener el ID del usuario desde el auth
    
    // // Obtener el usuario por ID
    // const user = await userService.getUserById(id);
    // // Validar si el usuario existe
    // if (!utils.isExist(user)) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // const data = { is_active: false }; // Actualiza el campo "is_active" a false para desactivar el usuario
    // const result = await userService.editUser(data, id); // Editar el usuario utilizando la función edit de CRUD
    // if (result === 0) { // Si el usuario no existe
    //   res.status(404).json({ message: 'User not deleted' });
    //   return;
    // }
    // res.status(200).json({});
    res.status(200).json("ENDPOINT ENRUTADO");



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteUser = async (req,res) => {
  try {
    // //NO ES CORRECTO ELIMINAR UN USUARIO, SE DEBE DESACTIVAR NUNCA ELIMINAR. PERO POR NORMATIVA DEJO EL ENDPOINT
    // const id = req.user.idUser; // Obtener el ID del usuario desde el auth
    // const result = await CRUD.remove("user", id); // Eliminar el usuario utilizando la función remove de CRUD
    // if (result === 0) { // Si el usuario no existe
    //   res.status(404).json({ message: 'User not found' });
    //   return;
    // }
    // res.status(200).json({}); //confirmo que se elimino correctamente
    res.status(200).json("ENDPOINT ENRUTADO");
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Funciones especificas

const login = async (req, res) => {
  try {
    // const user = req.body.user; // Obtener el nombre de usuario desde el body
    // const password = req.body.password;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // let userDB = null;
    // if (emailRegex.test(user)) {
    //   userDB = await userService.getUserByColumn("email", user,null,["idUser","name","surname","email","userName","password","photo"]);
    // } else {
    //   userDB = await userService.getUserByColumn("userName", user,null,["idUser","name","surname","email","userName","password","photo"]);
    // }
    // if (!(utils.isExist(userDB))) { res.status(404).json({ message: 'Invalid User' }); return; };
    // const isMatch = await utils.hashCompare(password, userDB[0].password);
    // if (!isMatch) {
    //   res.status(401).json({ message: "Invalid credentials" });
    //   return;
    // }
    // const token = utils.createToken(userDB[0]); // Crear el token JWT
    // res.status(200).json({ token }); // Devolver el token en la respuesta
    res.status(200).json("ENDPOINT ENRUTADO");

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


  
module.exports = {
  getAllUsers,
  getAllUsersByArea,
  getAllAreas,
  getUserById,
  getUser,
  addUser,
  editUser,
  disableUser,
  deleteUser,
  login,

}