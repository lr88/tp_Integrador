const mysql = require('mysql2-promise')();

var sqlConfig = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'mydb'
}
mysql.configure(sqlConfig);

var ejecutarConsulta = async function (unaQuery) {
    try {
        return await mysql.query(unaQuery).spread(function (res) {
            return res;
        });
    } catch (error) {
        throw new Error ("Error al ejecutar query : " + error.message)
    }
}

module.exports = {
    ejecutarConsulta
}