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
        let datos = await mysql.query(unaQuery).spread(function (res) {
            return res;
        });
        return datos;
    } catch (error) {
        throw new Error ("Error al ejecutar query : " + error.message)
    }
}

module.exports = {
    ejecutarConsulta
}