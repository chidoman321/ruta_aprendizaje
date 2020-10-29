const express = require("express");

var app = express();
//indicarle con que engine view utilizare
app.set('view engine', 'pug');
//indicar donde estan las vistas
app.set('views', './views');
app.get("/",function(req,res){
	res.render('index.pug',{hola :"hola jorge"});
	// con variables en la vistares.render('hello.pug', { mensaje: 'Usando Pug JS en Express' });
});
app.listen(8080);