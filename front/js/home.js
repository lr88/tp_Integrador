URL_HOST = 'http://localhost:3000'

$(document).ready(async function () {
    var unUsuario = {}
    
    mostrarABMClientes()

    $('#alta_de_usuarios').on('click',function () {
        mostrarABMClientes()
    })

    $('#reporte_de_usuarios').on('click',function () {
        mostrarPanelClientes()
    })

    $('#reporte_de_estadisticos').on('click',function () {
        mostrarPanelEstadisticos()
    })

    function mostrarPanelClientes() {
        limpiarCampos()
        loadTableUsuarios()
        mostrarPanel('clientes')
    }

    function mostrarPanelEstadisticos() {
        limpiarCampos()
        loadTableEstadisticos()
        mostrarPanel('estadisticos')
    }

    function mostrarABMClientes() {
        mostrarPanel('ABMclientes')
    }

    $('#limpiar').on('click',function () {
        limpiarCampos()
    })

    $('#guardar').on('click',function () {
        guardarUsuario()
    })

    $('#actualizar').on('click',function () {
        actualizarUsuario(unUsuario)
    })

    $('#borrar').on('click',function () {
        borrarUsuario(unUsuario)
    })

    function parsearFecha(unaFecha) {
        let fecha = unaFecha.substr(0,10).split('-')
        unaFecha = fecha[2] + "/" + fecha[1] + "/" + fecha[0]
        return unaFecha
    }

    async function loadTableUsuarios() {
        res2 = await ejecutarAjax('post',{}, URL_HOST + '/getDatosUsuarios')
        
        if ( $.fn.DataTable.isDataTable('#tabla_clientes') ) {
            $('#tabla_clientes').DataTable().destroy();
        }

        res2.data.forEach(element => {
            element.fecha_nacimiento_parser = parsearFecha(element.fecha_nacimiento)
        });

        res2.data.forEach(element => {
            element.estadoFormato = element.estado == 1 ? 'Activo' : 'Inactivo' 
        });
        
        let columnas = [
            { data : 'nombre' },
            { data : 'apellido' },
            { data : 'fecha_nacimiento_parser' },
            { data : 'password' },
            { data : 'estadoFormato' },
        ]
        
        var table = $('#tabla_clientes').DataTable({
            data: res2.data,
            columns:columnas,
            searching: true,
            paging: false,
            ordering: true,
            lengthChange: false,
            info: false
        });
    
        $('#tabla_clientes tbody').on( 'click', 'tr', function (event) {
            event.preventDefault()
            let usuario = table.row(this).data()
            if(usuario){
                unUsuario = usuario
                console.log(usuario);
                if(usuario.estado){
                    $('#edit_nombre').val(unUsuario.nombre),
                    $('#edit_apellido').val(unUsuario.apellido),
                    $('#edit_fecha_nacimiento').val(unUsuario.fecha_nacimiento.substr(0,10).replaceAll("/","-"))
                    $('#edit_password').val(unUsuario.password)
                    mostrarPanel('editarClientes')
                }else{
                    mostarMensajeInCorrecto("Ese registro no se puede editar esta dado de baja")
                }
            }
        } );
    }

    async function loadTableEstadisticos() {
        res2 = await ejecutarAjax('post',{}, URL_HOST + '/getDatosEstadisticos')
        
        if ( $.fn.DataTable.isDataTable('#tabla_estadisticos') ) {
            $('#tabla_estadisticos').DataTable().destroy();
        }

        res2.data.forEach(element => {
            element.fecha = parsearFecha(element.fecha)
        });
        
        let columnas = [
            { data : 'titulo' },
            { data : 'extension' },
            { data : 'fecha' },
            { data : 'cantidad_de_descargas' },
        ]

        $('#tabla_estadisticos').DataTable({
            data: res2.data,
            columns:columnas,
            searching: false,
            paging: false,
            ordering: false,
            lengthChange: false,
            info: false
        });
    
    }
})

function mostrarPanel(panel) {
    let paneles = ['editarClientes','ABMclientes','clientes','estadisticos']
    paneles.forEach(element => {
        $('#'+element).hide()
    });
    $('#'+panel).show()
}

function validar(valor,nombre,campo) {
    if (valor == '' || valor == undefined ) {
        mostarMensajeInCorrecto(" El campo " + nombre + " debe completarse")
        hacerFocus(campo)
        throw new Error (" El campo " + nombre + " debe completarse")
    }
}

function hacerFocus(campo) {
    setTimeout(() => {
        document.getElementById(campo).focus()
    }, 4500);
}

function validarCant(valor,nombre,campo) {
    let formatValor = /[a-zA-Z][a-zA-Z0-9-_]{2,32}/gi
    if (!formatValor.test(valor)) {
        mostarMensajeInCorrecto(nombre + " Invalido : Debe tener minimo 3 y maximo 32 caracteres alfabeticos.")
        hacerFocus(campo)
        throw new Error (nombre + " Invalido")
    }
}

function validarFecha(valor,campo) {
    let formatFecha = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/
    if (!formatFecha.test(valor) || valor == '' || valor == undefined || !esfutura(valor)) {
        $('#fecha_nacimiento').val('')
        mostarMensajeInCorrecto("Fecha Invalida")
        hacerFocus(campo)
        throw new Error ("Fecha Invalida")
    }
}

function esfutura(valor) {
    var date = new Date();
    return new Date(valor) < date.setDate(date.getDate() - 2);
}

function validarPass(valor,campo) {
    let formatPass = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm
    if (!formatPass.test(valor)) {
        $('#password').val('')
        mostarMensajeInCorrecto("Contraseña Invalida")
        hacerFocus(campo)
        throw new Error ("Contraseña Invalida")
    }
}

async function guardarUsuario() {
    try {
        validar($('#nombre').val(),"Nombre",'nombre')
        validarCant($('#nombre').val(),"Nombre",'nombre')

        validar($('#apellido').val(),"Apellido",'apellido')
        validarCant($('#apellido').val(),"Apellido",'apellido')

        validarFecha($('#fecha_nacimiento').val(),'fecha_nacimiento')
        
        validarPass($('#password').val(),"Contraseña",'password')
    
        let data = {
            nombre : $('#nombre').val(),
            apellido: $('#apellido').val(),
            fecha_nacimiento : $('#fecha_nacimiento').val(),
            password : $('#password').val()
        }

        res = await ejecutarAjax('post',data, URL_HOST + '/guardarDatosUsuario')
        mostarMensajeCorrecto('Datos guardados correctamente')
    } catch (error) {
        console.log(error.message)
    }
}

async function actualizarUsuario(unUsuario) {
    try {
        validar($('#edit_nombre').val(),"Nombre",'nombre')
        validarCant($('#edit_nombre').val(),"Nombre",'nombre')

        validar($('#edit_apellido').val(),"Apellido",'edit_apellido')
        validarCant($('#edit_apellido').val(),"Apellido",'edit_apellido')

        validarFecha($('#edit_fecha_nacimiento').val(),'edit_fecha_nacimiento')
        
        validarPass($('#edit_password').val(),"Contraseña",'edit_password')
    
        unUsuario.nombre = $('#edit_nombre').val()
        unUsuario.apellido = $('#edit_apellido').val()
        unUsuario.fecha_nacimiento = $('#edit_fecha_nacimiento').val()
        unUsuario.password = $('#edit_password').val()

        if(unUsuario.id_usuario){
            res = await ejecutarAjax('post',unUsuario, URL_HOST + '/actualizarDatosUsuario')
            mostarMensajeCorrecto('Datos actualizados correctamente')
        }
        
    } catch (error) {
        console.log(error.message)

    }
}

async function borrarUsuario(unUsuario) {
    try {
        if(unUsuario.id_usuario){
            res = await ejecutarAjax('post',unUsuario, URL_HOST + '/borrarUsuario')
            $('#cerrar').click()
            window.location.href = "/"
        }else{
            alert("Ese registro no existe")
        }
    } catch (error) {
        console.log(error.message)
    }
}

function limpiarCampos() {
    $('#nombre').val(''),
    $('#apellido').val(''),
    $('#fecha_nacimiento').val(''),
    $('#password').val('')
}


