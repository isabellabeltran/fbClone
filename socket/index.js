const express = require('express');
const app = express();
const socketUsers = require('socket.io.users');
// socketUsers.Session(app);

app.use(express.static(__dirname + '/../client/public'));

server = app.listen(3000, () => {
  console.log('Listening on port ' + 3000);
});

const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  socket.on('new-message', (msg) => {
    console.log(msg);
    io.emit('receive-message', msg);
  }); 
});