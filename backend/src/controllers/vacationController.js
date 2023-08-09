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
  //esta funcion solo podria ser ejecutada por un admin o RRHH
  try {
    const data = req.body;
    const fecha1 = data.startDate;
    const fecha2 = data.endDate;
    const respuesta = await vDAO.getVacationsBetweenDates("initial_date", fecha1, fecha2);
    res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVacationById = async (req, res) => {
  //esta funcion solo podria ser ejecutada por un admin o RRHH
  try {
    const id = req.params.vacation_id;
    const vacation = await vDAO.getVacationById(id);
    res.status(200).json(vacation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addVacation = async (req, res) => {
  try {
    const data = req.body;

    // Agregar vacacion
    const id = await vDAO.addVacation(data);
    if(!id) throw new Error('Error al agregar la vacación');
    res.status(200).json("La vacación se agregó correctamente");
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
  addVacation,
  editVacation,
  deleteVacation,
};
