/* Aquí los métodos para conseguir los datos de los roles en la BDD */
const pool = require('../database/connection');
const CRUD = require('./CRUD');

/* GETS */
const getAllRoles = async () => await CRUD.getAll('role', ["id", "role_name", "to_create", "to_update", "to_update_date"]);

const getRoleById = async (id) => await CRUD.getById('role', id, ["id", "role_name", "to_create", "to_update", "to_update_date"]);

const getRoleByName = async (column = "role_name", value, fields = ["id", "role_name", "to_create", "to_update", "to_update_date"]) => await CRUD.getByColumn('role', column, value, fields);

/* ADD */
const addRole = async (data) => await CRUD.add('role', data);

/* EDIT */
const editRole = async (data, id) => await CRUD.edit('role', data, id);

/* DELETE */
const removeRole = async (id) => await CRUD.remove('role', id);


module.exports = {
    getAllRoles,
    getRoleById,
    getRoleByName,
    addRole,
    editRole,
    removeRole,
};