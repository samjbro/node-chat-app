import express from 'express';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.set('view engine', 'ejs'); // Sets ejs as view engine
app.set('view options', { layout: false }); // Removes default layout
app.use('/public', express.static('public'));  // Set this or the view won't load your files

app.get('/', (req,res) => res.render('index'));

app.listen(3000)
