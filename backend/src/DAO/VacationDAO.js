/* Aquí los métodos para conseguir los datos de las vacaciones en la BDD */
const pool = require('../database/connection');
const CRUD = require('./crud');

/* GETS */
const getAllVacations = async () => await CRUD.getAll('vacation', ["id", "employee", "start_date", "end_date", "status", "note", "date_asked", "area_manager_authorization", "to_create", "to_update", "to_update_date"]);

// ID DE LA VACACION
const getVacationById = async (id) => await CRUD.getById('vacation', id, ["id", "employee", "start_date", "end_date", "status", "note", "date_asked", "area_manager_authorization", "to_create", "to_update", "to_update_date"]);

// ID DE USUARIO (SI ASÍ SE DESEA) o cualquier columna
const getAllVacationByColumn = async (column, value, fields = ["id", "employee", "start_date", "end_date", "status", "note", "date_asked", "area_manager_authorization", "to_create", "to_update", "to_update_date"]) => await CRUD.getAllByColumn('vacation', column, value, fields);
const getVacationByColumn = async (column, value, fields = ["id", "employee", "start_date", "end_date", "status", "note", "date_asked", "area_manager_authorization", "to_create", "to_update", "to_update_date"]) => await CRUD.getByColumn('vacation', column, value, fields);

// GetAll entre fechas (la columna a comparar puede ser la fecha de inicio o la de fin)
const getVacationsBetweenDates = async(column, date1, date2, fields = ["id", "employee", "start_date", "end_date", "status", "note", "date_asked", "area_manager_authorization", "to_create", "to_update", "to_update_date"]) => await CRUD.getAllBetweenDates('vacation', column, date1, date2, fields);

/* ADD */
const addVacation = async (data) => await CRUD.add('vacation', data);

/* EDIT */
const editVacation = async (data, id) => await CRUD.edit('vacation', data, id);

/* DELETE */
const removeVacation = async (id) => await CRUD.remove('vacation', id);

/* MÉTODOS ESPECÍFICOS */
const getVacationsByArea = async (area_id) => {
    let sql = `SELECT v.*, a.area from ((vacation v inner join employer e ON v.employee = e.id) inner join area a ON e.area_id = a.id) WHERE a.id = ?`;
    let params = [area_id];

    const [results] = await pool.promise().query(sql, params);
    return results;
};


module.exports = {
    getAllVacations,
    getVacationById,
    getAllVacationByColumn,
    getVacationByColumn,
    getVacationsBetweenDates,
    getVacationsByArea,
    addVacation,
    editVacation,
    removeVacation
};