const express = require("express"); //get express from node_modules
const socket = require("socket.io");


var app = express();   //created object of express package and gave it to the variable


//to run app---->port number, function(callback function and it will keep on getting executed as long as it as our sever is running)
var server = app.listen(4000, function(){
    console.log("Listening to Port 4000");
})

app.use(express.static("public"));


// to make it bidirectional, wrap server variable to the socket
var upgradedServer = socket(server);

upgradedServer.on("connection", function (socket) {

    socket.on("sendingMessage", function(data) {
        upgradedServer.emit("broadcastMessage", data);
    });

    console.log("Websocket connected", socket.id);
});