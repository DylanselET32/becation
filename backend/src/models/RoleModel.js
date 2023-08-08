/* Aquí los métodos para conseguir los datos de los roles en la BDD */
const pool = require('../database/connection');
const CRUD = require('../models/crud');

/* GETS */
const getAllRoles = async () => await CRUD.getAll('role', ["role_id", "role_name"]);

const getRoleById = async (id) => await CRUD.getById('role', id, ["role_id", "role_name"]);

const getRoleByName = async (column = "role_name", value, fields = ["role_id", "role_name"]) => await CRUD.getByColumn('role', column, value, fields);

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