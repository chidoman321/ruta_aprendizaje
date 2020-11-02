const Imagen = require("../models/imagenes");

module.exports = function(req,res,next){
    console.log("entre");
    Imagen.findById(req.params.id,function(err,imagen){
        if(imagen != null){
            res.locals.imagen =imagen;
            console.log("encontrarste la imagen"+imagen.title);
            next(); 
        }else{
            res.redirect("/app");
        }
    }) 
}