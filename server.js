import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.set('view options', { layout: false });

app.get('/', (req,res) => res.render('index'));

app.listen(3000)
