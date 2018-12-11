var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);

var socket = require('socket.io');
var io = socket(server);

app.use(express.static('public'));
console.log("The server is running");

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    socket.on('mouse', mouseMirror);
    
    function mouseMirror(data) {
        socket.broadcast.emit('mouse', data);
    }
}