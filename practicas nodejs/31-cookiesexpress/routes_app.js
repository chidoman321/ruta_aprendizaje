const express = require("express");
const Imagen = require("./models/imagenes");
var router = express.Router();


router.get("/",function(req,res){
    res.render("app/home");
});

// rest puy sirve para actualizar delete,post para crear

router.get("/imagenes/new",function(req,res){
    res.render("app/imagenes/new");
});
router.get("/imagenes/:id/edit",function(req,res){
    
});
router.route("/imagenes/:id").get(function(req,res){
    Imagen.findById(req.params.id,function(err,doc){
        res.render("app/imagenes/show",{imagen: doc});
    });

}).put(function(req,res){

}).delete(function(req,res){

});

router.route("/imagenes").get(function(req,res){

    
}).post(function(req,res){
    var img = new Imagen({title: req.body.title});
    img.save(function(err){
        if(!err){
            res.redirect("/app/imagenes/"+img._id);
        }
        else{
            res.render(err);
        }
    });
});
module.exports = router;