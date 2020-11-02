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

	name:String,
	last_name:String,
	username:String,
	pass:String,
	age:Number,
	email: String,
	date_of_birth:Date
	});


//crea la tabla, el nombre de la table seria el plural del primer parametro
var User =mongoose.model("User",user_schema);

module.exports.User=User;