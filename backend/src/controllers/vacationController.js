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
    const area_id = req.params.area_id;
    const respuesta = await vDAO.getVacationsByArea(area_id);
    res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/*TOKEN ACA */
const getAllVacationsByUser = async (req, res) => {
  //esta funcion solo podria ser ejecutada por un admin o RRHH
  try {
    const employer_id = req.user.id;
    const respuesta = await vDAO.getVacationByColumn("employee", employer_id);
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
    const respuesta = await vDAO.getVacationsBetweenDates("start_date", fecha1, fecha2);
    res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVacationById = async (req, res) => {
  //esta funcion solo podria ser ejecutada por un admin o RRHH
  try {
    const id = req.params.id;
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
    const id = req.body.id_vacation; // Obtener el ID de la vacación
    if (id === 0 || id == null) { // Si la vacación no existe
      res.status(404).json({ message: 'Vacation not found' });
      return;
    }
    
    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let data = {};
    for (const prop in req.body) {
      data[prop] = req.body[prop];
    }
    const edit = await vDAO.editVacation(data, id);
    res.status(200).json(edit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteVacation = async (req, res) => {
  try {
    const id = req.body.id_vacation; // Obtener el ID de la vacación
    const result = vDAO.removeVacation(id);
    if (result === 0) { // Si la vacación no existe
      res.status(404).json({ message: 'Vacation not found' });
      return;
    }
    res.status(200).json({}); //confirmo que se eliminó correctamente
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
