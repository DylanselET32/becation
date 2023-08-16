/* Aquí los métodos para conseguir los datos de los empleados en la BDD */
const pool = require('../database/connection');
const CRUD = require('./crud');

/* ORDEN: TABLA, DATOS A PEDIR, EXTRAS*/

/* GETS */
const getAllEmployers = async () => await CRUD.getAll('employer', ["id", "user_id", "available_days", "total_days", "is_cumulative", "role_id", "area", "to_create", "to_update", "to_update_date"]);

const getEmployerById = async (id) => await CRUD.getById('employer', id, ["id", "user_id", "available_days", "total_days", "is_cumulative", "role_id", "area", "to_create", "to_update", "to_update_date"]);

const getEmployerByColumn = async (column, value, fields = ["id", "user_id", "available_days", "total_days", "is_cumulative", "role_id", "area", "to_create", "to_update", "to_update_date"]) => await CRUD.getByColumn('employer', column, value, fields);

/* ADD */
const addEmployer = async (data) => await CRUD.add('employer', data);

/* EDIT */
const editEmployer = async (data, id) => await CRUD.edit('employer', data, id);

/* DELETE */
const removeEmployer = async (id) => await CRUD.remove('employer', id);


module.exports = {
    getAllEmployers,
    getEmployerById,
    getEmployerByColumn,
    addEmployer,
    editEmployer,
    removeEmployer,
};