const RoleDAO = require('../DAO/RoleDAO');
const { formatFullDateTime } = require('../utils/dateUtils');

const getAllRoles = async (req, res)=>{
    try {
        const respuesta = await RoleDAO.getAllRoles();
        res.status(200).json(respuesta);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRoleById = async (req, res)=>{
    try {
        const idRol = req.params.role_id;
        const respuesta = await RoleDAO.getRoleById(idRol);
        res.status(200).json(respuesta);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRoleByName = async (req, res)=>{
    try {
        const nameRol = req.params.role_name;
        const respuesta = await RoleDAO.getRoleById(nameRol);
        res.status(200).json(respuesta);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addRole = async (req, res) =>{
    try {
        const data = req.body;
    
        // Agregar vacacion
        const id = await RoleDAO.addRole(data);
        if(!id) throw new Error('Error al agregar la vacación');
        res.status(200).json({ message:"El rol se agregó correctamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const editRole = async (req, res) => {
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
        if (Object.keys(data).length>0){
            data  = {...data,
              to_update_date:formatFullDateTime(Date()),
              to_update:employerAdmin_id,
            }
        }
        const edit = await RoleDAO.editRole(data, id);
        if(!edit){throw new Error("Error to edit area")}
        res.status(200).json({});
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteRole = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del rol
        const secure = await EmployerDAO.getEmployerByColumn("area_id", id);
        if (secure) {
            throw new Error("El registro está en uso");
        }
        const result = RoleDAO.removeRole(id);
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
    getAllRoles,
    getRoleById,
    getRoleByName,
    addRole,
    editRole,
    deleteRole,
};