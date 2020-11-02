const mongoose = require("mongoose");

//conexion 
mongoose.connect("mongodb://localhost:27017/fotos",{ useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});


var pass_valid={validator:function(p){
	return this.password_confirmation == p;
},message: "las contraseñas no son iguales"};
//enum

var po_valores=["M","F"];
//schema para crear la coleccion
//required a cualquier tipo de dato , min y max para number
//para string
var user_schema = new mongoose.Schema({

	name: String,
	username: {type: String,maxlength: [50,"no mas de 50 caracteres amigo"],required: "El nombre de usuario es obligatorio"},
	pass:{type: String, minlength: [8,"el password debe de tener almenos 8 caracteres"],
	validate: pass_valid},
	age: {type: Number, min: [5,"la edad no puede ser menor de 5"],max: [100,"la edad no puede ser mayor de 100"]},
	email:{type: String,required: "El correo es obligatorio",match:  [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"coloca un email"]},
	date_of_birth: Date,
	sex: {type: String,enum: {values:po_valores,message: "opcion no valida"}}
	});
//email:{type: String,required: true},
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