const Imagen = require("../models/imagenes");

module.exports = function(req,res,next){
    console.log("entre");
    Imagen.findById(req.params.id)
    .populate("creator")
    .exec(function(err,imagen){
        if(imagen != null){
            res.locals.imagen =imagen;
            console.log("encontrarste la imagen"+imagen.title+" y "+imagen.creator);
            next(); 
        }else{
            res.redirect("/app");
        }
    }) 
}