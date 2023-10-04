const AreaDAO = require('../DAO/AreaDAO');
const EmployerDAO = require('../DAO/EmployerDAO');
const { formatDateToString, formatFullDateTime } = require('../utils/dateUtils');

const getAllAreas = async (req, res)=>{
    try {
        const respuesta = await AreaDAO.getAllAreas();
        res.status(200).json(respuesta);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAreaById = async (req, res)=>{
    try {
        const idArea = req.params.id;
        const respuesta = await AreaDAO.getAreaById(idArea);
        res.status(200).json(respuesta);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAreaByColumn = async (req, res)=>{
    try {
        const columnName = req.params.name;
        const respuesta = await AreaDAO.getAreaById(columnName);
        res.status(200).json(respuesta);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addArea = async (req, res) =>{
    try {
        const data = req.body;
        // Agregar vacacion
        const id = await AreaDAO.addArea(data);
        if(!id) throw new Error('Error al agregar la vacación');
        res.status(200).json({ message: "El area se agregó correctamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const editArea = async (req, res) => {
    try {
        const employerAdmin_id = req.employer.id;
        const id = req.params.id; // Obtener el ID de la vacación
        if (id === 0 || id == null) { // Si la vacación no existe
            res.status(404).json({ message: 'Vacation not found' });
            return;
        }
        // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
        let data = {};
        for (const prop in req.body) {
            data[prop] = req.body[prop];
        }
        if (Object.keys(data).length >0){
            data  = {...data,
              to_update_date: formatFullDateTime(Date()),
              to_update:employerAdmin_id,
            }
        }
        console.log(Object.keys(data).length)
        console.log(data)
        const edit = await AreaDAO.editArea(data, id);
        if(!edit){throw new Error("Error to edit area")}
        res.status(200).json({});
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteArea = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del area
        const secure = await EmployerDAO.getEmployerByColumn("area_id", id);
        if (secure) {
            throw new Error("El registro está en uso");
        }
        const result = AreaDAO.removeArea(id);
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
    getAllAreas,
    getAreaById,
    getAreaByColumn,
    addArea,
    editArea,
    deleteArea,
};