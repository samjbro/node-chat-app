import express from 'express';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const usernames = {};

app.set('view engine', 'ejs'); // Sets ejs as view engine
app.set('view options', { layout: false }); // Removes default layout
app.use('/public', express.static('public'));  // Set this or the view won't load your files

app.get('/', (req,res) => res.render('index'));

io.sockets.on('connection', (socket) => {
  socket.on('sendchat', (data) => {
    io.sockets.emit('updatechat', socket.username, data);
  });

  socket.on('adduser', (username) => {
    socket.username = username;
    usernames[username] = username;
    console.log(usernames);
    io.sockets.emit('updateusers', usernames);
  });

  socket.on('disconnect', () => {
    delete usernames[socket.username];

    io.sockets.emit('updateusers', usernames);
  });
});

server.listen(3000)
