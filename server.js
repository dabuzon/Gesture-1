var app = require('express');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server running');

app.use(express.static('public'));

io.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: %s sockets', connections.length);

    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data});
    });
});