/* Aquí los métodos para conseguir los datos de las vacaciones en la BDD */
const pool = require('../database/connection');
const CRUD = require('./CRUD');

/* GETS */
const getAllVacations = async () => {
    let sql = `SELECT v.*, a.id, a.area, u.name, u.surname from (((vacation v inner join employer e ON v.employee = e.id) inner join area a ON e.area_id = a.id) inner join user u on e.user_id = u.id)`;
    const [results] = await pool.promise().query(sql);
    return results;
};

// ID DE LA VACACION
const getVacationById = async (id) => {
    let sql = `SELECT v.*, a.id, a.area, u.name, u.surname from (((vacation v inner join employer e ON v.employee = e.id) inner join area a ON e.area_id = a.id) inner join user u on e.user_id = u.id) WHERE v.id = ?`;
    let params = [id];
    const [results] = await pool.promise().query(sql, params);
    return results;
}

// ID DE USUARIO (SI ASÍ SE DESEA) o cualquier columna
const getAllVacationByColumn = async (column, value, extraClauses = null) => {
    let sql = `SELECT v.*, a.id, a.area, u.name, u.surname from (((vacation v inner join employer e ON v.employee = e.id) inner join area a ON e.area_id = a.id) inner join user u on e.user_id = u.id) WHERE ?? = ?`;
    let params = [column, value];
    if (extraClauses) {
        if (extraClauses.includes('WHERE')) {
            sql += ` AND ${extraClauses.replace('WHERE', '')}`;
        }else {
            sql += ` ${extraClauses}`;
        }
    }
    const [results] = await pool.promise().query(sql, params);
    return results;
};

const getVacationByColumn = async (column, value, extraClauses = null) => {
    let sql = `SELECT v.*, a.id, a.area, u.name, u.surname from (((vacation v inner join employer e ON v.employee = e.id) inner join area a ON e.area_id = a.id) inner join user u on e.user_id = u.id) WHERE ?? = ?`;
    let params = [column, value];
    if (extraClauses) {
        if (extraClauses.includes('WHERE')) {
            sql += ` AND ${extraClauses.replace('WHERE', '')}`;
        }else {
            sql += ` ${extraClauses}`;
        }
    }
    const [results] = await pool.promise().query(sql, params);
    return results;
};

// GetAll entre fechas (la columna a comparar puede ser la fecha de inicio o la de fin)
const getVacationsBetweenDates = async (column, date1, date2) => {
    let sql = `SELECT v.*, a.id, a.area, u.name, u.surname from (((vacation v inner join employer e ON v.employee = e.id) inner join area a ON e.area_id = a.id) inner join user u on e.user_id = u.id) WHERE ?? BETWEEN ? AND ?`;
    let params = [column, date1, date2];
    
    const [results] = await pool.promise().query(sql, params);
    return results;
};

/* ADD */
const addVacation = async (data) => await CRUD.add('vacation', data);

/* EDIT */
const editVacation = async (data, id) => await CRUD.edit('vacation', data, id);

/* DELETE */
const removeVacation = async (id) => await CRUD.remove('vacation', id);

/* MÉTODOS ESPECÍFICOS */
const getVacationsByArea = async (area_id) => {
    let sql = `SELECT v.*, a.area, u.name, u.surname from (((vacation v inner join employer e ON v.employee = e.id) inner join area a ON e.area_id = a.id) inner join user u on e.user_id = u.id) WHERE a.id = ?`;
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