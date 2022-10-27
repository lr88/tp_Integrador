const conexionBDD = require("./conexionBDD")
const funcionesGenerales = require("./funcionesGenerales.js")

var guardarDatos = async function (req, res) {
    try {
        let datos = req.body
        let datosObligatorios = ['nombre','apellido','dni']
        funcionesGenerales.validaDatos(datos,datosObligatorios)
        let respuestaGuardarLosDatosEnLabaseDeDatos = await conexionBDD.ejecutarConsulta('select * from usuario')
        funcionesGenerales.responderAlFront(res,200,respuestaGuardarLosDatosEnLabaseDeDatos)
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

var getDatos = async function (req, res) {
    try {
        let respuestaGetDatos = await conexionBDD.ejecutarConsulta('select * from categoria')
        funcionesGenerales.responderAlFront(res,200,respuestaGetDatos)
    } catch (error) {
        console.log(error.message)
        funcionesGenerales.responderAlFront(res,500,error.message)
    }
}

module.exports = {
    guardarDatos,
    getDatos
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