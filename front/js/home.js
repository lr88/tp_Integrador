$(document).ready(async function () {
    console.log("asdasd");

    let data = {
        nombre : "JUAN",
        apellido: 'pepe',
        dni : 321
    }

    res = await ejecutarAjax('post',data,'http://localhost:3000/guardarDatos')
    
    console.log(res.data)
    
    res2 = await ejecutarAjax('post',data,'http://localhost:3000/getDatos')
    console.log(res2.data)

})

