/* Aquí los métodos para conseguir los datos de los usuarios en la BDD */
const pool = require('../database/connection');
const CRUD = require('./CRUD');

/* ORDEN: TABLA, DATOS A PEDIR, EXTRAS*/

/* GETS */
const getAllUsers = async () => await CRUD.getAll('user', ["id", "name", "surname", "email", "dni", "is_able", "privileges", "to_create", "sign_up_date", "to_update", "to_update_date"], "WHERE is_able = 1");

const getUserById = async (id, extraClauses = "WHERE is_able = 1") => await CRUD.getById('user', id, ["id", "name", "surname", "email", "dni", "is_able", "privileges", "to_create", "sign_up_date", "to_update", "to_update_date"],extraClauses);

const getUserByColumn = async (column, value,extraClauses = "WHERE is_able = 1",fields = ["id", "name", "surname", "email", "dni", "is_able", "privileges", "to_create", "sign_up_date", "to_update", "to_update_date"]) => await CRUD.getByColumn('user', column, value, fields, extraClauses);

/* ADD */
const addUser = async (data) => await CRUD.add('user', data);

/* EDIT */
const editUser = async (data, id) => await CRUD.edit('user', data, id);

/* DELETE */
const removeUser = async (id) => await CRUD.remove('user', id);


module.exports = {
    getAllUsers,
    getUserById,
    getUserByColumn,
    addUser,
    editUser,
    removeUser,
};
