/* Aquí los métodos para conseguir los datos de los roles en la BDD */
const pool = require('../database/connection');
const CRUD = require('../models/crud');

/* GETS */
const getAllRoles = async () => await CRUD.getAll('role', ["role_id", "role_name"]);

const getRoleById = async (id) => await CRUD.getById('role', id, ["role_id", "role_name"]);

const getRoleByColumn = async (column = "role_name", value, fields = ["role_id", "role_name"]) => await CRUD.getByColumn('role', column, value, fields);

