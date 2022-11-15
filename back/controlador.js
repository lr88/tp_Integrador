const conexionBDD = require("./conexionBDD")
const funcionesGenerales = require("./funcionesGenerales.js")
const querys = require("./querys.js")

var guardarDatosUsuario = async function (req, res) {
    try {
        let datos = req.body

        let datosObligatoriosUsuario = ['nombre','apellido','fecha_nacimiento','password']
        funcionesGenerales.validaDatos(datos,datosObligatoriosUsuario)
        let respuestaGuardarUsuario = await conexionBDD.ejecutarConsulta(querys.guardarUsuario(datos))

        funcionesGenerales.responderAlFront(res,200,respuestaGuardarUsuario)
        
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

var actualizarDatosUsuario = async function (req, res) {
    try {
        let datos = req.body

        let datosObligatoriosUsuario = ['nombre','apellido','fecha_nacimiento','password','id_usuario']
        funcionesGenerales.validaDatos(datos,datosObligatoriosUsuario)
        await conexionBDD.ejecutarConsulta(querys.actualizarUsuario(datos))

        funcionesGenerales.responderAlFront(res,200,{})
        
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

var getDatosUsuarios = async function (req, res) {
    try {
        let respuestaGetDatos = await conexionBDD.ejecutarConsulta(querys.getDatosUsuarios())
        funcionesGenerales.responderAlFront(res,200,respuestaGetDatos)
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

var getDatosEstadisticos = async function (req, res) {
    try {
        let respuestaGetDatos = await conexionBDD.ejecutarConsulta(querys.getDatosEstadisticos())
        funcionesGenerales.responderAlFront(res,200,respuestaGetDatos)
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

var borrarUsuario = async function (req, res) {
    try {
        let datos = req.body
        let datosObligatoriosUsuario = ['id_usuario']
        funcionesGenerales.validaDatos(datos,datosObligatoriosUsuario)
        let respuestaBorrarUsuario = await conexionBDD.ejecutarConsulta(querys.borrarUsuario(datos.id_usuario))
        funcionesGenerales.responderAlFront(res,200,respuestaBorrarUsuario)
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

module.exports = {
    guardarDatosUsuario,
    getDatosUsuarios,
    actualizarDatosUsuario,
    getDatosEstadisticos,
    borrarUsuario
}


/*
 --------       EJEMPLO DE ESTRUCTURA JSON       --------
var datos = {
    "nombre" : 'pepe',
    "pellido" : 'lopez',
    "dni" : 356698541,
    "casa" : {
        "techo" : 'pepe',
        "piso" : 'lopez',
        "patio" : 356698541
    }
}

*/