const express = require('express');

const app = express();
const server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

console.log("The server is running");

let socket = require('socket.io-client');

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    socket.on('mouse', mouseMirror);
    
    function mouseMirror(data) {
        socket.broadcast.emit('mouse', data);
    }
};