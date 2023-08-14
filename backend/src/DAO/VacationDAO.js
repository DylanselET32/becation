/* Aquí los métodos para conseguir los datos de las vacaciones en la BDD */
const pool = require('../database/connection');
const CRUD = require('./crud');

/* GETS */
const getAllVacations = async () => await CRUD.getAll('vacation', ["vacation_id", "required_user_id", "hr_user_id", "initial_date", "final_date", "days_taked", "status", "note"]);

// ID DE LA VACACION
const getVacationById = async (id) => await CRUD.getById('vacation', id, ["vacation_id", "required_user_id", "hr_user_id", "initial_date", "final_date", "days_taked", "status", "note"]);

// ID DE USUARIO (SI ASÍ SE DESEA) o cualquier columna
const getVacationByColumn = async (column, value, fields = ["vacation_id", "required_user_id", "hr_user_id", "initial_date", "final_date", "days_taked", "status", "note"]) => await CRUD.getByColumn('vacation', column, value, fields);

// GetAll entre fechas (la columna a comparar puede ser la fecha de inicio o la de fin)
const getVacationsBetweenDates = async(column, date1, date2, fields = ["vacation_id", "required_user_id", "hr_user_id", "initial_date", "final_date", "days_taked", "status", "note"]) => await CRUD.getAllBetweenDates('vacation', column, date1, date2, fields);

/* ADD */
const addVacation = async (data) => await CRUD.add('vacation', data);

/* EDIT */
const editVacation = async (data, id) => await CRUD.edit('vacation', data, id);

/* DELETE */
const removeVacation = async (id) => await CRUD.remove('vacation', id);

/* MÉTODOS ESPECÍFICOS */
const getVacationsByRole = async (role_id) => {
    let sql = `SELECT v.*, r.role_name from ((vacation v inner join user u ON v.required_user_id = u.user_id) inner join role r ON u.role_id = r.role_id) WHERE r.role_id = ?`;
    let params = [role_id];

    const [results] = await pool.promise().query(sql, params);
    return results;
};


module.exports = {
    getAllVacations,
    getVacationById,
    getVacationByColumn,
    getVacationsBetweenDates,
    getVacationsByRole,
    addVacation,
    editVacation,
    removeVacation
};