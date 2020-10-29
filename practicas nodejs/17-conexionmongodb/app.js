const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var app = express();

mongoose.connect("mongodb://localhost:27017/fotos",{ useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});

var user_schema = new mongoose.Schema({email:String, pass:String});

var User =mongoose.model("User",user_schema);

//middleware statico
app.use("/static",express.static("public"));
app.use(express.static("assets"));
//leer los archivos de la peticcion
app.use(bodyParser.json()); //para application/json
app.use(bodyParser.urlencoded({extended:true})); //si esta en falso no se puede hacer parsing para arreglos
//indicarle con que engine view utilizare
app.set('view engine', 'pug');
//indicar donde estan las vistas
app.set('views', './views');
app.get("/",function(req,res){
	res.render('index.pug');
	// con variables en la vistares.render('hello.pug', { mensaje: 'Usando Pug JS en Express' });
});

app.get("/login",function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render("login");
	});
	

});

app.post("/users",function(req,res){
	var user = new User({email: req.body.email, pass: req.body.pass});
	user.save(function(){
		res.send("recibimos tus datos");
	});
		//mapea los parametros y puedes acceder a ellos con body como si fuera un atributo
	console.log("Contraseña"+req.body.pass);
	console.log("Email "+ req.body.email);
	
	// con variables en la vistares.render('hello.pug', { mensaje: 'Usando Pug JS en Express' });
});


app.post("/",function(req,res){

res.render("form");
});
app.listen(8080);