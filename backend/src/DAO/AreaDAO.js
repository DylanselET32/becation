/* Aquí los métodos para conseguir los datos de las areas en la BDD */
const pool = require('../database/connection');
const CRUD = require('./crud');

/* ORDEN: TABLA, DATOS A PEDIR, EXTRAS*/

/* GETS */
const getAllAreas = async () => await CRUD.getAll('area', ["id", "area", "area_manager", "to_create", "to_update", "to_update_date"]);

const getAreaById = async (id) => await CRUD.getById('area', id, ["id", "area", "area_manager", "to_create", "to_update", "to_update_date"]);

const getAreaByColumn = async (column, value, fields = ["id", "area", "area_manager", "to_create", "to_update", "to_update_date"]) => await CRUD.getByColumn('area', column, value, fields);

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