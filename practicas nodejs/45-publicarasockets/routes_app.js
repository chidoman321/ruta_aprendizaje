const express = require("express");
const Imagen = require("./models/imagenes");
var router = express.Router();
const img_finder_middleware= require("./middlewares/find_image");
const fs = require("fs");
const redis = require("redis");
var client= redis.createClient();

router.get("/",function(req,res){
    Imagen.find({}).populate("creator").exec(function(err,img){
        if(err) console.log(err);
        res.render("app/home",{imagenes:img});
    });
    
});

// rest puy sirve para actualizar delete,post para crear

router.get("/imagenes/new",function(req,res){
    res.render("app/imagenes/new");
});

router.all("/imagenes/:id*", img_finder_middleware);

router.get("/imagenes/:id/edit",function(req,res){
    res.render("app/imagenes/edit");
    
    
});
router.route("/imagenes/:id").get(function(req,res){
    client.publish("images",res.locals.imagen.toString());
    res.render("app/imagenes/show");

}).put(function(req,res){
    res.locals.imagen.title = req.body.title;
    res.locals.imagen.save(function(err){
        if(!err){
            res.render("app/imagenes/show");
        }
        else{
            res.render("app/imagenes/"+req.params.id+"/edit");
        }
    });
}).delete(function(req,res){
    Imagen.findOneAndRemove({_id: req.params.id},function(err){
        if(!err){
            res.redirect("/app/imagenes");

        }else{
            console.log(err);
            res.redirect("app/imagenes/"+req.params.id);
        }
    });
});

router.route("/imagenes").get(function(req,res){
Imagen.find({},function(err,imagenes){
    if(err){
        res.redirect("/app"); return;}
    res.render("app/imagenes/index",{i: imagenes});
});

    
}).post(function(req,res){
    console.log(req.files.file + req.files.file.name);
    var img = new Imagen({title: req.body.title,creator: res.locals.user._id, extension: req.files.file.name.split(".").pop()});
    img.save(function(err){
        if(!err){
            client.publish("images",img.toString());
            fs.rename(req.files.file.path,"public/imagenes/"+img._id+"."+ req.files.file.name.split(".").pop(),function(){
                res.redirect("/app/imagenes/"+img._id);

            });
            
        }
        else{
            res.render(err);
        }
    });
});
module.exports = router;