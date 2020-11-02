const User = require("../models/extra.js").User;

module.exports = function(req,res,next){
    if(!req.session.user_id){
        res.redirect("/login");
    }
    else{
        User.findById(req.session.user_id,function (err, usr) {
            if(err){
                res.redirect("/login");
            }
            else{
                res.locals={user:usr};
                next();
            }
        });
        
        
    }
}