module.exports = function(server,sessionMiddlew){
    var io = require("socket.io")(server);
    const redis = require("redis");
    var client= redis.createClient();
    client.subscribe("images");

    io.use(function(socket,next){
        sessionMiddlew(socket.request,socket.request.res,next);
    });

    client.on("message",function(channel,message){
        console.log("recibimos un mensaje del canal");
         console.log(message);
    });
    
    io.sockets.on("connection",function(socket){
        console.log(socket.request.session.user_id);
    });
}