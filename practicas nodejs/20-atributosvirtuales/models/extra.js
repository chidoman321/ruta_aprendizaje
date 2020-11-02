const mongoose = require("mongoose");

//conexion 
mongoose.connect("mongodb://localhost:27017/fotos",{ useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});
//schema para crear la coleccion
var user_schema = new mongoose.Schema({

	name: String,
	username: String,
	pass: String,
	age: Number,
	email: String,
	date_of_birth: Date
	});

// atributos virtuals
user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(passconfirm){
	this.p_c= passconfirm;
});

user_schema.virtual("full_name").get(function(){
	return this.name + this.last_name;
}).set(function(full_name){
	full_name = full_name.split(" ");
	this.name = full_name[0];
	this.last_name = full_name[1];
});
//crea la tabla, el nombre de la table seria el plural del primer parametro
var User =mongoose.model("User",user_schema);

module.exports.User=User;