//importar la libreria http, y para poder utilizar el file system
var http = require("http"), fs = require("fs");


//crear servidor
	http.createServer(function(req,res){
	//leer el archivo index.html de forma sincrona y en el callback recibir las peticiones , una funcion es asincrona cuando no tiene agregaod la palabra sync
	fs.readFile("./index.html",function(err,html){

		/*esto solo funciona en el tutorial , en mi maquina me da el error  JavaScript heap out of memory
		var i = 0;
	while(true){
		i++;
		res.write(i+"");

		
	};*/
	//los 200 todo bien , los 400 no se encontro , 300 lo que buscas se movio , los 500 hubo algun error
	//es ideal colocar el tipo de contenido correcto lo cual puede producir errores
	//res.writeHead(200,{"Content-Type":"text/html"});
	res.writeHead(200,{"Content-Type":"application/json"});

	//para comprobar que encabezados hay podemos utilizar el siguiente comando curl -I localhost:8080

	res.write(JSON.stringify({nombre : "Jorge",usename : "chidoman"}));
	res.end();
	});
	
	//escuchar peticiones por el puerto 8080
	}).listen(8080);



/* 

con cada petitcion se tendria que volver a a leer el archivo
http.createServer(function(req,res){
	var html = fs.readFileSync("./index.html",function(err,html){});
	res.write(html);
	res.end();
	}).listen(8080);

*/