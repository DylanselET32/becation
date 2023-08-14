/* Aquí los métodos para conseguir los datos de los usuarios en la BDD */
const pool = require('../database/connection');
const CRUD = require('./crud');

/* ORDEN: TABLA, DATOS A PEDIR, EXTRAS*/

/* GETS */
const getAllUsers = async () => await CRUD.getAll('user', ["user_id", "name", "surname", "email", "dni", "is_able", "role_id", "available_days", "contrat_day"], "WHERE is_able = 1");

const getUserById = async (id, extraClauses = "WHERE is_able = 1") => await CRUD.getById('user', id, ["user_id", "name", "surname", "email", "dni", "is_able", "role_id", "available_days", "contrat_day"],extraClauses);

const getUserByColumn = async (column, value,extraClauses = "WHERE is_able = 1",fields = ["user_id", "name", "surname", "email", "dni", "is_able", "role_id", "available_days", "contrat_day"]) => await CRUD.getByColumn('user', column, value, fields, extraClauses);

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
