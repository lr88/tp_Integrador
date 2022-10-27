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
app.post('/guardarDatos', async function (req, res) {
    controlador.guardarDatos(req, res)
})

// RECIBIR LOS DATOS DEL FRONT  -- OK
app.post('/getDatos', async function (req, res) {
    controlador.getDatos(req, res)
})

app.listen(PORT, function () {
    console.log('Server corriendo en el puerto:', PORT)
})

//  
//  GRUPO 4
//      ABM             ABM Registrados					
//      reporteria      Listado documentos vistos por un usuario Registrado					