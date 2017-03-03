import express from 'express';

const app = express();

app.get('/', function(req,res){
  res.send('hi bae');
});

app.listen(3000)
