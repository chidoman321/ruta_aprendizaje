const express = require("express");

var app = express();
//indicarle con que engine view utilizare
app.set('view engine', 'pug');
//indicar donde estan las vistas
app.set('views', './views');
app.get("/",function(req,res){
	res.render('index.pug');
	// con variables en la vistares.render('hello.pug', { mensaje: 'Usando Pug JS en Express' });
});

app.get("/algo",function(req,res){
	res.render('form.pug');
	// con variables en la vistares.render('hello.pug', { mensaje: 'Usando Pug JS en Express' });
});

app.get("/:nombre",function(req,res){
	console.log(req.params.nombre);
	res.render('form.pug',{nom : req.params.nombre});
	// con variables en la vistares.render('hello.pug', { mensaje: 'Usando Pug JS en Express' });
});


app.post("/",function(req,res){

res.render("form");
});
app.listen(8080);