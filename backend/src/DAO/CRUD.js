/* Este archivo JS contiene todos los métodos genéricos para conseguir datos de la BDD */
const pool = require('../database/connection');

/* Get All genérico */
const getAll = async (table, selectFields = ['*'], extraClauses = null) => {
    let sql = `SELECT ${selectFields.join(', ')} FROM ??`;
    let params = [table];

    if (extraClauses) {
        sql += ` ${extraClauses}`;
    }

    const [results, fields] = await pool.promise().query(sql, params);
    return results;
};

/* Get By Id genérico */
const getById = async (table, id, selectFields = ['*'], extraClauses = null) => {
    let sql = `SELECT ${selectFields.join(', ')} FROM ?? WHERE id = ?`;
    let params = [table, id];
    
    if (extraClauses) {
        if (extraClauses.includes('WHERE')) {
            sql += ` AND ${extraClauses.replace('WHERE', '')}`;
        } else {
            sql += ` ${extraClauses}`;
        }
    }

    const [results, fields] = await pool.promise().query(sql, params);
    return results[0];
};

/* Get All Between Dates */
const getAllBetweenDates = async (table, column, date1, date2, selectFields = ['*'], extraClauses = null) => {
    let sql = `SELECT ${selectFields.join(', ')} FROM ?? WHERE ?? BETWEEN ? AND ?`;
    let params = [table, column, date1, date2];

    if (extraClauses) {
        if (extraClauses.includes('WHERE')) {
            sql += ` AND ${extraClauses.replace('WHERE', '')}`;
        }else {
            sql += ` ${extraClauses}`;
        }
    }
    
    const [results, fields] = await pool.promise().query(sql, params);
    return results;
};

/* ADD genérico */
const add = async (table, data) => {
    const [results, fields] = await pool.promise()
    .query(`INSERT INTO ?? SET ?`, [table,data]);
    return results.insertId;
};

/* UPDATE genérico */
const edit = async (table, data, id) => {
    const [results, fields] = await pool.promise()
    .query(`UPDATE ?? SET ? WHERE ?? = ?`, [table,data,"id",id]);
    return results.affectedRows;
};

/* DELETE genérico */
const remove = async (table, id, where = null) => {
    let sql = 'DELETE FROM ??';
    const params = [table];

    if (id) {
        sql += ' WHERE ?? = ?';
        params.push("id", id);
    }

    if (where) {
        const whereKeys = Object.keys(where);
        if (whereKeys.length) {
            sql += id ? ' AND ' : ' WHERE ';
            sql += whereKeys.map((key) => {
                params.push(key, where[key]);
                return `?? = ?`;
            }).join(' AND ');
        }
    }

    const [result] = await pool.promise().query(sql, params);
    return result.affectedRows;
};

/* GET por columna (campo) */
const getByColumn = async (table, column, value, selectFields = ['*'], extraClauses = null) => {
    let sql = `SELECT ${selectFields.join(', ')} FROM ?? WHERE ?? = ?`;
    let params = [table, column, value];

    if (extraClauses) {
        if (extraClauses.includes('WHERE')) {
            sql += ` AND ${extraClauses.replace('WHERE', '')}`;
        }else {
            sql += ` ${extraClauses}`;
        }
    }
    
    const [results, fields] = await pool.promise().query(sql, params);
    return results[0];
};

const getAllByColumn = async (table, column, value, selectFields = ['*'], extraClauses = null) => {
    let sql = `SELECT ${selectFields.join(', ')} FROM ?? WHERE ?? = ?`;
    let params = [table, column, value];

    if (extraClauses) {
        if (extraClauses.includes('WHERE')) {
            sql += ` AND ${extraClauses.replace('WHERE', '')}`;
        }else {
            sql += ` ${extraClauses}`;
        }
    }
    
    const [results, fields] = await pool.promise().query(sql, params);
    return results;
};

module.exports = {
    getAll,
    getAllByColumn,
    getById,
    add,
    edit,
    remove,
    getByColumn,
    getAllBetweenDates
};