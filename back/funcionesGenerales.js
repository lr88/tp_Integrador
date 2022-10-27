function validaDatos(datos,datosObligatorios) {
    for (let index = 0; index < datosObligatorios.length; index++) {
        if (!datos[datosObligatorios[index]]) {
            throw new Error ("Error de al validar los datos : " + datosObligatorios[index])
        }
    }
}

function responderAlFront(res,codigoDeRespuesta,datos) {
    try {
        switch (codigoDeRespuesta) {
            case 200:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso OK" , "data" : datos});
                break;
            case 500:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso ERROR" , "error" : datos});
                break;
            case 400:
                res.status(codigoDeRespuesta).json({ "mensaje" : "Proceso NO HAY RUTA" , "data" : datos});
                break;
            default:
                res.status(500).json({ "mensaje" : "ERROR INESPERADO"});
                break;
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    validaDatos,
    responderAlFront
}