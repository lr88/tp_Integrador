URL_HOST = 'http://localhost:3000'

$(document).ready(async function () {
    var unUsuario = {}
    
    mostrarPanel('ABMclientes')

    $('#alta_de_usuarios').on('click',function () {
        mostrarPanel('ABMclientes')
    })

    $('#reporte_de_usuarios').on('click',function () {
        limpiarCampos()
        loadTableUsuarios()
        mostrarPanel('clientes')
    })
    
    $('#reporte_de_estadisticos').on('click',function () {
        limpiarCampos()
        loadTableEstadisticos()
        mostrarPanel('estadisticos')
    })

    function mostrarPanel(panel) {
        let paneles = ['editarClientes','ABMclientes','clientes','estadisticos']
        paneles.forEach(element => {
            $('#'+element).hide()
        });
        $('#'+panel).show()
    }

    $('#limpiar').on('click',function () {
        limpiarCampos()
    })

    $('#guardar').on('click',function () {
        guardarUsuario()
    })

    $('#actualizar').on('click',function () {
        actializarUsuario(unUsuario)
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
        
        let columnas = [
            { data : 'nombre' },
            { data : 'apellido' },
            { data : 'fecha_nacimiento_parser' },
            { data : 'password' },
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
                $('#edit_nombre').val(unUsuario.nombre),
                $('#edit_apellido').val(unUsuario.apellido),
                $('#edit_fecha_nacimiento').val(unUsuario.fecha_nacimiento.substr(0,10).replaceAll("/","-"))
                $('#edit_password').val(unUsuario.password)
                mostrarPanel('editarClientes')
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

function validar(valor,nombre) {
    if (valor == '' || valor == undefined ) {
        alert(" El campo " + nombre + " debe completarse")
        throw new Error (" El campo " + nombre + " debe completarse")
    }
}

function validarCant(valor,nombre) {
    let formatValor = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/gi
    if (!formatValor.test(valor)) {
        alert(nombre + " Invalido : Debe tener minimo 3 y maximo 32 caracteres alfabeticos.")
        throw new Error (nombre + " Invalido")
    }
}

function validarFecha(valor) {
    let formatFecha = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/
    if (!formatFecha.test(valor) || valor == '' || valor == undefined ) {
        $('#fecha_nacimiento').val('')
        alert("Fecha Invalida")
        throw new Error ("Fecha Invalida")
    }
}

function validarPass(valor) {
    let formatPass = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm
    if (!formatPass.test(valor)) {
        $('#password').val('')
        alert("Contraseña Invalida")
        throw new Error ("Contraseña Invalida")
    }
}

async function guardarUsuario() {
    try {
        validar($('#nombre').val(),"Nombre")
        validarCant($('#nombre').val(),"Nombre")

        validar($('#apellido').val(),"Apellido")
        validarCant($('#apellido').val(),"Apellido")

        validarFecha($('#fecha_nacimiento').val())
        
        validarPass($('#password').val(),"Contraseña")
    
        let data = {
            nombre : $('#nombre').val(),
            apellido: $('#apellido').val(),
            fecha_nacimiento : $('#fecha_nacimiento').val(),
            password : $('#password').val()
        }

        res = await ejecutarAjax('post',data, URL_HOST + '/guardarDatosUsuario')
        
    } catch (error) {
        console.log(error.message)
    }
}

async function actializarUsuario(unUsuario) {
    try {
        validar($('#edit_nombre').val(),"Nombre")
        validarCant($('#edit_nombre').val(),"Nombre")

        validar($('#edit_apellido').val(),"Apellido")
        validarCant($('#edit_apellido').val(),"Apellido")

        validarFecha($('#edit_fecha_nacimiento').val())
        
        validarPass($('#edit_password').val(),"Contraseña")
    
        unUsuario.nombre = $('#edit_nombre').val()
        unUsuario.apellido = $('#edit_apellido').val()
        unUsuario.fecha_nacimiento = $('#edit_fecha_nacimiento').val()
        unUsuario.password = $('#edit_password').val()

        if(unUsuario.id_usuario){
            res = await ejecutarAjax('post',unUsuario, URL_HOST + '/actualizarDatosUsuario')
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


