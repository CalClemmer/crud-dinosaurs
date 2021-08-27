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

  app.post('/dinosaurs', function(req, res) {
    // read dinosaurs file
    const dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs);
  
    // add item to dinosaurs array
    dinosaurs.push(req.body);
  
    // save dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');
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
  
  app.get('/dinosaurs', function(req, res) {
    const dinosaurs = fs.readFileSync('./dinosaurs.json');
    const dinoData = JSON.parse(dinosaurs);
  
    const nameFilter = req.query.nameFilter;
  
    if (nameFilter) {
      dinoData = dinoData.filter(function(dino) {
        return dino.name.toLowerCase() === nameFilter.toLowerCase();
      });
    }
  
    res.render('dinosaurs/index', {myDinos: dinoData});
  });

app.listen(PORT, () => {
  console.log('Server listening on PORT', PORT);
});
