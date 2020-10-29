/*
Jorge Luis Ibarra Gonzalez
28/10/2020

*///importar la libreria http, y para poder utilizar el file system
var http = require("http"), fs = require("fs");



//crear servidor
	http.createServer(function(req,res){

		//index of regresa el numero de incidencias que esta cierto string en una cadena
		/*if (req.url.indexOf("favicon.ico") > 0) {
			console.log("solicito el icono")
		}*/

		//monitorear el objeto req
		//console.log(req);
	//leer el archivo index.html de forma sincrona y en el callback recibir las peticiones , una funcion es asincrona cuando no tiene agregaod la palabra sync
	fs.readFile("./index.html",function(err,html){

		//convertir html a una cadena
		var html_string = html.toString();
		//expresiones regulares devuelve un arreglo de incidencias 
		var variables=html_string.match(/[^\{\}]+(?=\})/g);
		//esta variable estara en al vista
		var nombre = "";
		//arreglo con los parametros de un req url , y un hasd de parametros
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
		for (var i = variables.length - 1; i >= 0; i--) {

			//evaluar un string como codigo con la funcion eval en si convierte un string a variable
			//value nos regresa la referencia del la variable
			var value = eval(variables[i]);

			//asignar a html_string la version modificada con el remplazo
			html_string= html_string.replace("{"+variables[i]+"}", hashparam[variables[i]]);

			//codigo alternativo sin declarar value 
			//html_string= html_string.replace("{"+variables[i]+"}", eval(variables[i]));
		};

	//los 200 todo bien , los 400 no se encontro , 300 lo que buscas se movio , los 500 hubo algun error
	//es ideal colocar el tipo de contenido correcto lo cual puede producir errores
	//res.writeHead(200,{"Content-Type":"text/html"});
	res.writeHead(200,{"Content-Type":"text/html"});

	//para comprobar que encabezados hay podemos utilizar el siguiente comando curl -I localhost:8080

	res.write(html_string);
	res.end();
	});
	
	//escuchar peticiones por el puerto 8080
	}).listen(8080);