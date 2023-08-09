/* Aquí los métodos para conseguir los datos de las vacaciones en la BDD */
const pool = require('../database/connection');
const CRUD = require('./crud');

/* GETS */
const getAllVacations = async () => await CRUD.getAll('vacation', ["vacation_id", "required_user_id", "hr_user_id", "initial_date", "final_date", "days_taked", "enum", "note"]);

// ID DE LA VACACION
const getVacationById = async (id) => await CRUD.getById('vacation', id, ["vacation_id", "required_user_id", "hr_user_id", "initial_date", "final_date", "days_taked", "enum", "note"]);

// ID DE USUARIO (SI ASÍ SE DESEA) o cualquier columna
const getVacationByColumn = async (column, value, fields = ["vacation_id", "required_user_id", "hr_user_id", "initial_date", "final_date", "days_taked", "enum", "note"]) => await CRUD.getByColumn('vacation', column, value, fields);

// GetAll entre fechas (la columna a comparar puede ser la fecha de inicio o la de fin)
const getVacationsBetweenDates = async(column, date1, date2, fields = ["vacation_id", "required_user_id", "hr_user_id", "initial_date", "final_date", "days_taked", "enum", "note"]) => await CRUD.getAllBetweenDates('vacation', column, date1, date2, fields);

/* ADD */
const addVacation = async (data) => await CRUD.add('vacation', data);

/* EDIT */
const editVacation = async (data, id) => await CRUD.edit('vacation', data, id);

/* DELETE */
const removeVacation = async (id) => await CRUD.remove('vacation', id);


module.exports = {
    getAllVacations,
    getVacationById,
    getVacationByColumn,
    getVacationsBetweenDates,
    addVacation,
    editVacation,
    removeVacation,
};