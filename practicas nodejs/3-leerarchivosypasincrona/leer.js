//importar la libreria http, y para poder utilizar el file system
var http = require("http"), fs = require("fs");

//leer el archivo index.html de forma sincrona y en el callback recibir las peticiones , una funcion es asincrona cuando no tiene agregaod la palabra sync
var html = fs.readFileSync("./index.html",function(err,html){
//crear servidor
	http.createServer(function(req,res){
		//escribir el archivo que leimos
	res.write(html);
	res.end();
	//escuchar peticiones por el puerto 8080
	}).listen(8080);
});


/* 

con cada petitcion se tendria que volver a a leer el archivo
http.createServer(function(req,res){
	var html = fs.readFileSync("./index.html",function(err,html){});
	res.write(html);
	res.end();
	}).listen(8080);

*/