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
    Imagen.findById(req.params.id,function(err,doc){
        res.render("app/imagenes/edit",{imagen: doc});
    });
    
    
});
router.route("/imagenes/:id").get(function(req,res){
    Imagen.findById(req.params.id,function(err,doc){
        res.render("app/imagenes/show",{image: doc});
    });

}).put(function(req,res){
    Imagen.findById(req.params.id,function(err,img){
        img.title = req.body.title;
        img.save(function(err){
            if(!err){
                res.render("app/imagenes/show",{image: img});
            }
            else{
                res.render("app/imagenes/"+img.id+"/edit",{image: img});
            }
        });
        

    });
}).delete(function(req,res){

});

router.route("/imagenes").get(function(req,res){
Imagen.find({},function(err,imagenes){
    if(err){
        res.redirect("/app"); return;}
    res.render("app/imagenes/index",{i: imagenes});
});

    
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