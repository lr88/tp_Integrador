const conexionBDD = require("./conexionBDD")
const funcionesGenerales = require("./funcionesGenerales.js")
const querys = require("./querys.js")

var guardarDatosUsuario = async function (req, res) {
    try {
        let datos = req.body

        console.log("req.body")
        console.log(req.body)
        
        let datosObligatoriosUsuario = ['tipo']
        funcionesGenerales.validaDatos(datos,datosObligatoriosUsuario)
        let respuestaGuardarUsuario = await conexionBDD.ejecutarConsulta(querys.guardarUsuario(datos))

        datos.idusuario = respuestaGuardarUsuario.insertId

        let datosObligatoriosRegistrado = ['nombre','apellido','fecha_nacimiento','password','idusuario']
        funcionesGenerales.validaDatos(datos,datosObligatoriosRegistrado)
        await conexionBDD.ejecutarConsulta(querys.guardarUsuarioRegistrado(datos))

        funcionesGenerales.responderAlFront(res,200,{})
        
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

var actualizarDatosUsuario = async function (req, res) {
    try {
        let datos = req.body

        let datosObligatoriosRegistrado = ['nombre','apellido','fecha_nacimiento','password','idusuario_registrado']
        funcionesGenerales.validaDatos(datos,datosObligatoriosRegistrado)
        await conexionBDD.ejecutarConsulta(querys.actualizarUsuarioRegistrado(datos))

        funcionesGenerales.responderAlFront(res,200,{})
        
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

var getDatos = async function (req, res) {
    try {
        let respuestaGetDatos = await conexionBDD.ejecutarConsulta(querys.getDatos())
        funcionesGenerales.responderAlFront(res,200,respuestaGetDatos)
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

module.exports = {
    guardarDatosUsuario,
    getDatos,
    actualizarDatosUsuario
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