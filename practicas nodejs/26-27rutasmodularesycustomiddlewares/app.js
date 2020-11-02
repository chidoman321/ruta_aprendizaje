const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/extra.js").User;
const session = require("express-session");
const router_app = require("./routes_app");
const session_middleware = require("./middlewares/session");

var app = express();



// colecciones = tablas
// documentos = filas
/*
	tipos de datos disponibles
	String
	Number
	Date
	Buffer
	Boolean
	Mixed
	Object
	Array
*/

//middleware statico
app.use("/static",express.static("public"));
app.use(express.static("assets"));
//leer los archivos de la peticcion
app.use(bodyParser.json()); //para application/json
app.use(bodyParser.urlencoded({extended:true})); //si esta en falso no se puede hacer parsing para arreglos
// session
/*app.use(session({secret: "a32sd23sad18s5d4758as74",genid: function(req){

}}));*/

/* app */ 

/*	/	*/

app.use(session({secret: "a32sd23sad18s5d4758as74",resave: true,saveUninitialized: true}));

//indicarle con que engine view utilizare
app.set('view engine', 'pug');
//indicar donde estan las vistas
app.set('views', './views');
app.get("/",function(req,res){
	console.log(req.session.user_id);
	res.render('index.pug');
	// con variables en la vistares.render('hello.pug', { mensaje: 'Usando Pug JS en Express' });
});

app.get("/signup",function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render("signup");
	});
	

});

app.get("/login",function(req,res){

		res.render("login");
	

});

app.post("/sessions",function(req,res){
	/*
	encontrar un documento por id
	User.findById("id",function(){
		
	});
	*/
	//para encontar un documento usamos findone
	User.findOne({email: req.body.email,pass: req.body.pass},"username email",function(err,docs){
		req.session.user_id = docs._id;
		res.send("hola mundo");
	});
	/*/buscar el usuario , find regresa una coleccion o tabla  p1query,p2campos,cb
	User.find({email: req.body.email,pass: req.body.pass},"username email",function(err,docs){
		console.log(docs);
		res.send("adios");
	});*/
});

app.use("/app",session_middleware);
app.use("/app",router_app); 
app.listen(8080);