const Imagen = require("../models/imagenes");
const Owner = require("./image_permission");

module.exports = function(req,res,next){
    console.log("entre");
    Imagen.findById(req.params.id)
    .populate("creator")
    .exec(function(err,imagen){
        if(imagen != null && Owner(imagen,req,res)){
            res.locals.imagen =imagen;
            console.log("encontrarste la imagen"+imagen.title+" y "+imagen.creator);
            next(); 
        }else{
            res.redirect("/app");
        }
    }) 
}