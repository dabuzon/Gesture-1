let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

user = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.get('/', function(req, resp) {
    resp.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s of sockets connected', connections.length);
    });

    socket.on('send message', function(data) {
        console.log(data);
        io.sockets.emit('new message', {msg: data});
    });
});