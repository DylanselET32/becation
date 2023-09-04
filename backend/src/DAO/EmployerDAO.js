/* Aquí los métodos para conseguir los datos de los empleados en la BDD */
const pool = require('../database/connection');
const CRUD = require('./crud');

/* ORDEN: TABLA, DATOS A PEDIR, EXTRAS*/

/* GETS */
const getAllEmployers = async () => await CRUD.getAll('employer', ["id", "user_id", "available_days", "total_days", "is_cumulative", "role_id", "area_id", "to_create", "to_update", "to_update_date"]);

const getEmployerById = async (id) => await CRUD.getById('employer', id, ["id", "user_id", "available_days", "total_days", "is_cumulative", "role_id", "area_id", "to_create", "to_update", "to_update_date"]);

const getEmployerByColumn = async (column, value, fields = ["id", "user_id", "available_days", "total_days", "is_cumulative", "role_id", "area_id", "to_create", "to_update", "to_update_date"]) => await CRUD.getByColumn('employer', column, value, fields);

/* ADD */
const addEmployer = async (data) => await CRUD.add('employer', data);

/* EDIT */
const editEmployer = async (data, id) => await CRUD.edit('employer', data, id);

/* DELETE */
const removeEmployer = async (id) => await CRUD.remove('employer', id);


const getCompleteEmployer = async(employer_id) =>{
    let sql = `SELECT u.id, u.name, u.surname, u.email, u.dni, u.is_able, u.privileges, u.to_create, u.sign_up_date, u.to_update, u.to_update_date, a.area, e.*, r.role_name FROM (((user u inner join employer e on u.id = e.user_id) inner join area a on e.area_id = a.id) inner join role r on e.role_id = r.id) WHERE e.id = ?`;
    let params = [employer_id];

    const [results] = await pool.promise().query(sql, params);
    if(results.length >0){
        return results[0]
    }
    return null;
}

const getAllCompleteEmployer = async() =>{
    let sql = `SELECT u.id, u.name, u.surname, u.email, u.dni, u.is_able, u.privileges, u.to_create, u.sign_up_date, u.to_update, u.to_update_date, a.area, e.*, r.role_name FROM (((user u inner join employer e on u.id = e.user_id) inner join area a on e.area_id = a.id) inner join role r on e.role_id = r.id)`;
    let params = [];

    const [results] = await pool.promise().query(sql, params);
    return results;
}

const getAllCompleteEmployerByArea = async(area_id) =>{
    let sql = `SELECT u.id, u.name, u.surname, u.email, u.dni, u.is_able, u.privileges, u.to_create, u.sign_up_date, u.to_update, u.to_update_date, a.area, e.*, r.role_name FROM (((user u inner join employer e on u.id = e.user_id) inner join area a on e.area_id = a.id) inner join role r on e.role_id = r.id) WHERE a.id = ?`;
    let params = [area_id];
    
    const [results] = await pool.promise().query(sql, params);
    return results;
}


module.exports = {
    getAllEmployers,
    getEmployerById,
    getEmployerByColumn,
    addEmployer,
    editEmployer,
    removeEmployer,
    getCompleteEmployer,
    getAllCompleteEmployer,
    getAllCompleteEmployerByArea,
};