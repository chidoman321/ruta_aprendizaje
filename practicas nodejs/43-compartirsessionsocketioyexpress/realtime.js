module.exports = function(server,sessionMiddlew){
    var io = require("socket.io")(server);
    io.use(function(socket,next){
        sessionMiddlew(socket.request,socket.request.res,next);
    });

    io.sockets.on("connection",function(socket){
        console.log(socket.request.session.user_id);
    });
}