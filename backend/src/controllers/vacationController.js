const CRUD = require('../DAO/CRUD')
const vDAO = require('../DAO/VacationDAO');

const getAllVacations = async (req, res) => {
  //Este método solo podria ser ejecutada por un admin o RRHH
  try {
    const respuesta = await vDAO.getAllVacations();
    res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllVacationsByArea = async (req, res) => {
  //esta funcion solo podria ser ejecutada por un admin o RRHH
  try {
    const role_id = req.params.role_id;
    const respuesta = await vDAO.getVacationsByRole(role_id);
    res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllVacationsByUser = async (req, res) => {
  //esta funcion solo podria ser ejecutada por un admin o RRHH
  try {
    const user_id = req.user.user_id;
    const respuesta = await vDAO.getVacationByColumn("user_id", user_id);
    res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllVacationsBetweenDates = async (req, res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    // const respuesta = await vacationService.getAllVacations();
    // res.status(200).json(respuesta);
    res.status(200).json("ENDPOINT ENRUTADO");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVacationById = async (req, res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    // const id = req.params.id; // Obtener el ID del usuario desde la ruta
    // const vacation = await vacationService.getVacationById(id);
    // if (!(utils.isExist(vacation))){res.status(404).json({ message: 'Vacation not found' });return;};
    // res.status(200).json(vacation);
    res.status(200).json("ENDPOINT ENRUTADO");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVacation = async (req, res) => {
  try {
    // const id = req.vacation.idVacation; // Obtener el ID del usuario desde el auth
    // const vacation = await vacationService.getVacationById(id);
    // if (!(utils.isExist(vacation))){res.status(404).json({ message: 'Vacation not found' });return;};
    // res.status(200).json(vacation);
    res.status(200).json("ENDPOINT ENRUTADO");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addVacation = async (req, res) => {
  try {
    //     const data = req.body;

    //     // Verificar si el email ya está registrado
    //     const emailExists = await vacationService.getVacationByColumn('email', data.email,null); //lo pongo con null el tercer prop para que tenga en cuenta los emails desaibilitados
    //     if (emailExists.length) {
    //       return res.status(400).json({ message: 'Email already exists' });
    //     }

    //     // Verificar si el nombre de usuario ya está en uso
    //     const vacationNameExists = await vacationService.getVacationByColumn("vacationName", data.vacationName,null); //lo pongo con null el tercer prop para que tenga en cuenta los vacations desaibilitados
    //     if (vacationNameExists.length) {
    //       return res.status(400).json({ message: 'Vacationname already taken' });
    //     }

    //     // encriptar contraseña
    //     const dataE = {
    //       ...data,
    //       password: await utils.encryptText(data.password)
    //     }
    //     // Agregar usuario
    //     const id = await vacationService.addVacation(dataE);
    //     if(!id) throw new Error('Error al agregar usuario');
    //     const token = utils.createToken({idVacation:id}); // Crear el token JWT
    //     res.status(200).json({ token }); // Devolver el token en la respuesta
    //     sendConfirmEmail(id);
    res.status(200).json("ENDPOINT ENRUTADO");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editVacation = async (req, res) => {
  try {
    // const id = req.vacation.idVacation; // Obtener el ID del usuario desde el auth

    // // Obtener el usuario por ID
    // const vacation = await vacationService.getVacationById(id);
    // // Validar si el usuario existe
    // if (!utils.isExist(vacation)) {
    //   return res.status(404).json({ message: 'Vacation not found' });
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
    // const result = await vacationService.editVacation(data, id); // Editar el usuario utilizando la función edit de CRUD
    // if (result === 0) { // Si el usuario no existe
    //   res.status(404).json({ message: 'Vacation not edit' });
    //   return;
    // }
    // res.status(200).json({});
    res.status(200).json("ENDPOINT ENRUTADO");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const disableVacation = async (req, res) => {
  try {
    // const id = req.vacation.idVacation; // Obtener el ID del usuario desde el auth

    // // Obtener el usuario por ID
    // const vacation = await vacationService.getVacationById(id);
    // // Validar si el usuario existe
    // if (!utils.isExist(vacation)) {
    //   return res.status(404).json({ message: 'Vacation not found' });
    // }

    // const data = { is_active: false }; // Actualiza el campo "is_active" a false para desactivar el usuario
    // const result = await vacationService.editVacation(data, id); // Editar el usuario utilizando la función edit de CRUD
    // if (result === 0) { // Si el usuario no existe
    //   res.status(404).json({ message: 'Vacation not deleted' });
    //   return;
    // }
    // res.status(200).json({});
    res.status(200).json("ENDPOINT ENRUTADO");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteVacation = async (req, res) => {
  try {
    // //NO ES CORRECTO ELIMINAR UN USUARIO, SE DEBE DESACTIVAR NUNCA ELIMINAR. PERO POR NORMATIVA DEJO EL ENDPOINT
    // const id = req.vacation.idVacation; // Obtener el ID del usuario desde el auth
    // const result = await CRUD.remove("vacation", id); // Eliminar el usuario utilizando la función remove de CRUD
    // if (result === 0) { // Si el usuario no existe
    //   res.status(404).json({ message: 'Vacation not found' });
    //   return;
    // }
    // res.status(200).json({}); //confirmo que se elimino correctamente
    res.status(200).json("ENDPOINT ENRUTADO");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllVacations,
  getAllVacationsByArea,
  getAllVacationsByUser,
  getAllVacationsBetweenDates,
  getVacationById,
  getVacation,
  addVacation,
  editVacation,
  deleteVacation,
};
