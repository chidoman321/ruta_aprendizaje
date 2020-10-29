//importar
var express = require("express");

var app =express();



app.get("/",function(req,res){
//send es particular de express y cierra el solo res.end()
res.send("hola que hace");

});
//escuchar por el puerto 
app.listen(8080);