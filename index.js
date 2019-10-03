const express = require('express');
const socket = require('socket.io');

const app = express();
let server = app.listen(4000, () => {
    console.log('listening to request on port 4000');
});

//serving static file
app.use(express.static('public'));

//setup socket.io
let io = socket(server);

io.on('connection', (socket) => {
 console.log('made socket connection', socket.id)

 socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
 });

 socket.on('typing', (data) => {
     socket.broadcast.emit('typing', data)
 });

});
