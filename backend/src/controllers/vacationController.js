const { getAreaById } = require('../DAO/AreaDAO');
const { getEmployerByColumn, getEmployerById, getCompleteEmployer } = require('../DAO/EmployerDAO');
const vDAO = require('../DAO/VacationDAO');

const email = require('../utils/emeilSendUtils');

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
    const employer_id = req.employer.id;
    const respuesta = await vDAO.getVacationByColumn("employee", employer_id);
    if (respuesta == null) {
      res.status(404).json({ message: "No se encontró el registro solicitado"});
    }else{
      res.status(200).json(respuesta);
    }
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
    if (respuesta == null) {
      res.status(404).json({ message: "No se encontró el registro solicitado"});
    }else{
      res.status(200).json(respuesta);
    }
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
    if (vacation == null) {
      res.status(404).json({ message: "No se encontró el registro solicitado"}); 
    }else{
      res.status(200).json(vacation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addVacation = async (req, res) => {
  try {
    const data = req.body;
    const employee_id = req.employer.id
    const vacationData = {
      employee: employee_id,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      note: data.note,
      date_asked: data.date_asked,
      area_manager_authorization: data.area_manager_authorization,
      to_update: employee_id,
      to_update_date: Date(),
    }

    // Agregar vacacion
    const id = await vDAO.addVacation(vacationData);
    if(!id) throw new Error('Error al agregar la vacación');

    email.sendVacationUploadConfirmation(vacationData.employee, id);
    res.status(200).json({ message: "La vacación se agregó correctamente"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editVacation = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el id de parametros
    const idEmployerAdmin = req.employer.id; // ID Empleado token
    const vacation = await vDAO.getVacationById(id);
    if (vacation == null) { // Si la vacación no existe
      res.status(404).json({ message: 'Vacation not found' });
      return;
    }
    
    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let data = {};
    for (const prop in req.body) {
      data[prop] = req.body[prop];
    }
    
    const employer = await getCompleteEmployer(vacation.employee)
    const employerAdmin = await getCompleteEmployer(idEmployerAdmin)

    const areaData = await  getAreaById(employer.area_id)
    const AreaManagerEmployer = await getEmployerByColumn("user_id",areaData.area_manager) ;
    
    if(AreaManagerEmployer.id == idEmployerAdmin || employerAdmin.privileges >= 3){
      
      const vacationData = {
      ...data,
      to_update: idEmployerAdmin,
      to_update_date: Date(),
      }

      const edit = await vDAO.editVacation(vacationData, id);
      if(!edit){res.status(404).json({ message: 'error to update vacation' });}
     
      email.sendVacationModification(vacation.employee, id);
      res.status(200).json({});
    }else{
      res.status(404).json({ message: 'Unauthorized' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteVacation = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID de la vacación
    const result = vDAO.removeVacation(id);
    if (result === 0) { // Si la vacación no existe
      res.status(404).json({ message: 'Vacation not found' });
      return;
    }
    res.status(200).json({ message: "La vacación se eliminó correctamente."}); //confirmo que se eliminó correctamente
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllVacationsByEmployerId = async (req, res) => {
  //esta funcion solo podria ser ejecutada por un admin o RRHH
  try {
    const employer_id = req.params.id;
    const respuesta = await vDAO.getVacationByColumn("employee", employer_id);
    if (respuesta == null) {
      res.status(404).json({ message: "No se encontró el registro solicitado"});
    }else{
      res.status(200).json(respuesta);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllVacations,
  getAllVacationsByArea,
  getAllVacationsByUser,
  getAllVacationsByEmployerId,
  getAllVacationsBetweenDates,
  getVacationById,
  addVacation,
  editVacation,
  deleteVacation,
};
