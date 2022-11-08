
function guardarUsuario(datos) {
    try {
        let query = ""
        query+= " INSERT INTO `usuario`"
        query+= " ("
        query+= " `tipo`"
        query+= " )"
        query+= " VALUES"
        query+= " ("
        query+= "'" + datos.tipo + "'"
        query+= ");"

        console.log("")
        console.log(query)
        console.log("")

        return query
    } catch (error) {
        
    }
}

function actualizarUsuarioRegistrado(datos) {
    try {
        let query = ""

        query+= " UPDATE `usuario_registrado`"
        query+= " SET"
        query+= " `nombre` = '" + datos.nombre + "',"
        query+= " `apellido` = '" + datos.apellido + "',"
        query+= " `password` = '" + datos.password + "',"
        query+= " `fecha_nacimiento` = '" + datos.fecha_nacimiento + "'"
        query+= " WHERE idusuario_registrado = " + datos.idusuario_registrado + ";"

        console.log("")
        console.log(query)
        console.log("")

        return query
    } catch (error) {
        
    }
}

function guardarUsuarioRegistrado(datos) {
    try {
        let query = ""
        
        query+= " INSERT INTO `usuario_registrado`"
        query+= " ("
        query+= " `idusuario_registrado`,"
        query+= " `nombre`,"
        query+= " `apellido`,"
        query+= " `fecha_nacimiento`,"
        query+= " `password`"
        query+= " )"
        query+= " VALUES"
        query+= " ("
        query+= "'" + datos.idusuario + "'"
        query+= ",'" + datos.nombre + "'"
        query+= ",'" + datos.apellido + "'"
        query+= ",'" + datos.fecha_nacimiento + "'"
        query+= ",'" + datos.password + "'"
        query+= " );"

        console.log("")
        console.log(query)
        console.log("")

        return query
    } catch (error) {
        
    }
}

function getDatos(datos) {
    try {
        let query = ""
        query+= " SELECT *"
        query+= " FROM "
        query+= " usuario_registrado"

        console.log("")
        console.log(query)
        console.log("")

        return query
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    guardarUsuario,
    guardarUsuarioRegistrado,
    actualizarUsuarioRegistrado,
    getDatos
}