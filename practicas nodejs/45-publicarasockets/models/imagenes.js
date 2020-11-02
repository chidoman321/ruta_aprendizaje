const mongoose = require("mongoose") ;

var sch_img = new mongoose.Schema({
    title:{type:String,required:true},
    creator:{type: mongoose.Schema.Types.ObjectId,ref: "User"},
    extension:{type: String, required: true}
});

var Imagen = mongoose.model("Imagen",sch_img);

module.exports = Imagen;