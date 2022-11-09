'use strict'
var express = require('express')
var app = express()
const PORT = 3000
const controlador = require("./controlador")
var cors = require('cors')

app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

// RECIBIR LOS DATOS DEL FRONT  -- OK
app.post('/guardarDatosUsuario', async function (req, res) {
    controlador.guardarDatosUsuario(req, res)
})

// RECIBIR LOS DATOS DEL FRONT  -- OK
app.post('/actualizarDatosUsuario', async function (req, res) {
    controlador.actualizarDatosUsuario(req, res)
})

// RECIBIR LOS DATOS DEL FRONT  -- OK
app.post('/getDatosUsuarios', async function (req, res) {
    controlador.getDatosUsuarios(req, res)
})

// RECIBIR LOS DATOS DEL FRONT  -- OK
app.post('/getDatosEstadisticos', async function (req, res) {
    controlador.getDatosEstadisticos(req, res)
})

app.listen(PORT, function () {
    console.log('Server corriendo en el puerto:', PORT)
})

//  
//  GRUPO 4
//      ABM Usuarios Registrados
//      Reporte de un para traer listados de usuarios registrados y, los 3 documentos más vistos indicando la cantidad de veces que se vio cada uno
			