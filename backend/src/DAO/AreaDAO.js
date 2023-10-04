/* Aquí los métodos para conseguir los datos de las areas en la BDD */
const pool = require('../database/connection');
const CRUD = require('./CRUD');

/* ORDEN: TABLA, DATOS A PEDIR, EXTRAS*/

/* GETS */
const getAllAreas = async () => {
    let sql = `SELECT a.*, u.name, u.surname from area a inner join user u on a.area_manager = u.id`;
    const [results] = await pool.promise().query(sql);
    return results;
};

const getAreaById = async (id) => {
    let sql = `SELECT a.*, u.name, u.surname from area a inner join user u on a.area_manager = u.id WHERE a.id = ?`;
    let params = [id];
    const [results] = await pool.promise().query(sql, params);
    return results[0];
}

const getAreaByColumn = async (column, value, extraClauses = null) => {
    let sql = `SELECT a.*, u.name, u.surname from area a inner join user u on a.area_manager = u.id WHERE ?? = ?`;
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
/* ADD */
const addArea = async (data) => await CRUD.add('area', data);

/* EDIT */
const editArea = async (data, id) => await CRUD.edit('area', data, id);

/* DELETE */
const removeArea = async (id) => await CRUD.remove('area', id);


module.exports = {
    getAllAreas,
    getAreaById,
    getAreaByColumn,
    addArea,
    editArea,
    removeArea,
};