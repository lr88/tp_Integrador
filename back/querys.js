
function guardarUsuario(datos) {
    try {
        let query = ""
        query+= " INSERT INTO `usuario`"
        query+= " ("
        query+= " `nombre`"
        query+= " ,`apellido`"
        query+= " ,`password`"
        query+= " ,`fecha_nacimiento`"
        query+= " )"
        query+= " VALUES"
        query+= " ("
        query+= "'" + datos.nombre + "'"
        query+= ",'" + datos.apellido + "'"
        query+= ",'" + datos.password + "'"
        query+= ",'" + datos.fecha_nacimiento + "'"
        query+= ");"

        console.log("")
        console.log(query)
        console.log("")

        return query
    } catch (error) {
        
    }
}

function actualizarUsuario(datos) {
    try {
        let query = ""

        query+= " UPDATE `usuario`"
        query+= " SET"
        query+= " `nombre` = '" + datos.nombre + "',"
        query+= " `apellido` = '" + datos.apellido + "',"
        query+= " `password` = '" + datos.password + "',"
        query+= " `fecha_nacimiento` = '" + datos.fecha_nacimiento + "'"
        query+= " WHERE id_usuario = " + datos.id_usuario + ";"

        console.log("")
        console.log(query)
        console.log("")

        return query
    } catch (error) {
        
    }
}

function getDatosUsuarios() {
    try {
        let query = ""
        query+= " SELECT *"
        query+= " FROM "
        query+= " usuario"

        console.log("")
        console.log(query)
        console.log("")

        return query
    } catch (error) {
        console.log(error)
    }
}

function getDatosEstadisticos() {
    try {
        let query = ""

        query+= " select "
        query+= "     titulo,"
        query+= "     extension,"
        query+= "     fecha,"
        query+= "     count(id_descarga) as 'cantidad_de_descargas'"
        query+= " from descarga"
        query+= " inner join contenido on descarga.id_contenido_documento = contenido.id_contenido"
        query+= " group by id_contenido_documento "
        query+= " order by count(id_descarga) desc"
        query+= " LIMIT 3;"

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
    actualizarUsuario,
    getDatosUsuarios,
    getDatosEstadisticos
}