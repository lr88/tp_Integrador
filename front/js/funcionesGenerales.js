function mostarMensajeCorrecto(mensaje = 'Proceso terminado con exito.') {
    $("#modalMensajeCorrecto").modal("show")
    $("#mensajeCorrecto").html(mensaje)
    setTimeout(() => {
        $("#modalMensajeCorrecto").modal("toggle")
        window.location.href = "/"
    }, 4000);
}

function mostarMensajeInCorrecto(mensaje = 'Error en el proceso.') {
    $("#modalMensajeInCorrecto").modal("show")
    $("#mensajeInCorrecto").html(mensaje)
    setTimeout(() => {
        $("#modalMensajeInCorrecto").modal("toggle")
    }, 4000);
}

var ejecutarAjax = async function (type, datos, urlForm) {
	return $.ajax({
        "url": urlForm,
        "headers": {
            "accept": 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        "type": type,
        "data": datos,
        "async": false,
        error: function (r) {
            mostarMesajeInCorrecto()
            console.log(r);
        }
    });
}