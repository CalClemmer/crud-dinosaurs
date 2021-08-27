const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs');

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(ejsLayouts);
//body-parser middleware
app.use(express.urlencoded({extended: false}));

app.post('/dinosaurs', function(req, res) {
    console.log(req.body);
  });

app.get('/', function(req, res) {
    res.render('home');
  });

/*
app.get('/dinosaurs', function(req, res) {
    const dinosaurs = fs.readFileSync('./dinosaurs.json');
    console.log(dinosaurs);
});
*/

// lists all dinosaurs
app.get('/dinosaurs', function(req, res) {
    const dinosaurs = fs.readFileSync('./dinosaurs.json');
    const dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/index', {myDinos: dinoData});
    console.log(dinoData);
  });

app.get('/dinosaurs/new', function(req, res){
    res.render('dinosaurs/new');
});

  //express show route for dinosaurs (lists one dinosaur)
app.get('/dinosaurs/:idx', function(req, res) {
    // get dinosaurs
    const dinosaurs = fs.readFileSync('./dinosaurs.json');
    const dinoData = JSON.parse(dinosaurs);
  
    //get array index from url parameter
    const dinoIndex = parseInt(req.params.idx);
  
    //render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
  });

app.listen(PORT, () => {
  console.log('Server listening on PORT', PORT);
});
