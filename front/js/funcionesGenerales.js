

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
            console.log(r);
        }
    });
}