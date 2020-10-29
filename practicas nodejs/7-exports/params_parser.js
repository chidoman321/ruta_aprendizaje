function parse(req){
	var aparam = [], hashparam = {};

	//si existe esta cadena
		if (req.url.indexOf("?") >0) {
			//parte todo en n cantidades n es el numero de ? que esten dentro de url
			var url_data = req.url.split("?");
			//le asignamos al arreglo el split anterior en la posicion 1 que contiene los parametros
			//url_data[0] = ? , url_data[1]= nombre = jorge,
			//dentro de url_data[1] separamos todos los parametros por el simbolo & 
			aparam = url_data[1].split("&");
			
		}

		for (var i = aparam.length - 1; i >= 0; i--) {
			//tenemos el nombre del parametro y el valor en aparam[i] guardamos cada valor en el arreglo param_value
			var param_value = aparam[i].split("=");
			hashparam[param_value[0]] = [param_value[1]];
				}


				return	hashparam;

}

module.exports.parse = parse;