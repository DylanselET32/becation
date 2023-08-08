/* Este archivo JS contiene todos los métodos genéricos para conseguir datos de la BDD */
const pool = require('../database/connection');

/*Método para convertir nombre de una tabla a ID*/
/* Ejemplo => user --> idUser */
function toId(table) {
    const t =  table.charAt(0).toUpperCase() + table.slice(1);
    return `id${t}`
}

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
    let sql = `SELECT ${selectFields.join(', ')} FROM ?? WHERE ?? = ?`;
    let params = [table, toId(table), id];
    
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


/* ADD genérico */
const add = async (table, data) => {
    const [results, fields] = await pool.promise()
    .query(`INSERT INTO ?? SET ?`, [table,data]);
    return results.insertId;
};

/* UPDATE genérico */
const edit = async (table, data, id) => {
    const [results, fields] = await pool.promise()
    .query(`UPDATE ?? SET ? WHERE ?? = ?`, [table,data,toId(table) ,id]);
    return results.affectedRows;
};

/* DELETE genérico */
const remove = async (table, id, where = null) => {
    let sql = 'DELETE FROM ??';
    const params = [table];

    if (id) {
        sql += ' WHERE ?? = ?';
        params.push(toId(table), id);
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
    return results;
};

module.exports = {
    getAll,
    getById,
    add,
    edit,
    remove,
    getByColumn
};