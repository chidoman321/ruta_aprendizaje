const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/extra.js").User;

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
	//el documento user es una instancia del modelo
	var user = new User({email: req.body.email, pass: req.body.pass, password_confirmation : req.body.confirm,username: req.body.username});
	console.log(user.password_confirmation);


	//gardar en la bd con promises en vez de recibir callbrack regresa una promesa que permite ejecutar then

	user.save().then(function(us){
		res.send("guardamos el usuario exitosamente");
	},function(err){
		if(err){
			console.log(String(err));
			res.send("no se pudieron grabar los datos");
		}
	});
	/*/guardar en la bd
	user.save(function(err){
		//error, el documento creado , el numero de documentos afectados
		if(err){console.log(String(err,user,numeroafectadas));}
		res.send("recibimos tus datos");
	});
		//mapea los parametros y puedes acceder a ellos con body como si fuera un atributo
	console.log("Contraseña"+req.body.pass);
	console.log("Email "+ req.body.email);
	*/
	// con variables en la vistares.render('hello.pug', { mensaje: 'Usando Pug JS en Express' });
});


app.post("/",function(req,res){

res.render("form");
});
app.listen(8080);