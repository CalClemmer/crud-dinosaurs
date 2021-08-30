var express = require('express');
var router = express.Router();
// const router = express();


router.post('/prehistoric_creatures', function(req, res) {
    // read dinosaurs file
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    creatures = JSON.parse(creatures);
  
    // add item to dinosaurs array
    creatures.push(req.body);
  
    // save dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/prehistoric_creatures');
  });
  
  
  
  /*
  router.get('/dinosaurs', function(req, res) {
      const dinosaurs = fs.readFileSync('./dinosaurs.json');
      console.log(dinosaurs);
  });
  */
  
  router.get('/prehistoric_creatures', function(req, res) {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);
  
    let nameFilter = req.query.nameFilter;
  
    if (nameFilter) {
      creatureData = creatureData.filter(function(creature) {
        return creature.name.toLowerCase() === nameFilter.toLowerCase();
      });
    }
  
    res.render('prehistoric_creatures/index', {myCreatures: creatureData});
  });
  
  /*
  // lists all dinosaurs
  router.get('/dinosaurs', function(req, res) {
      const dinosaurs = fs.readFileSync('./dinosaurs.json');
      const dinoData = JSON.parse(dinosaurs);
      res.render('dinosaurs/index', {myDinos: dinoData});
      console.log(dinoData);
    });
  */
  
  router.get('/prehistoric_creatures/new', function(req, res){
      res.render('prehistoric_creatures/new');
  });
  
    //express show route for dinosaurs (lists one dinosaur)
  
  
  router.get('/prehistoric_creatures/:idx', function(req, res) {
      // get dinosaurs
      let creatures = fs.readFileSync('./prehistoric_creatures.json');
      let creatureData = JSON.parse(creatures);
    
      //get array index from url parameter
      let creaturesIndex = parseInt(req.params.idx);
    
      //render page with data of the specified animal
      res.render('prehistoric_creatures/show', {myCreature: creatureData[creaturesIndex]});
    });
  
  router.get('/prehistoric_creatures/edit/:idx', function(req, res){
      const creatures = fs.readFileSync('./prehistoric_creatures.json');
      const creatureData = JSON.parse(creatures);
      res.render('prehistoric_creatures/edit', {creature: creatureData[req.params.idx], creatureId: req.params.idx});
    });
  
  router.put('/prehistoric_creatures/:idx', function(req, res){
      const creatures = fs.readFileSync('./prehistoric_creatures.json');
      const creatureData = JSON.parse(creatures);
    
      //re-assign the name and type fields of the dinosaur to be editted
      creatureData[req.params.idx].name = req.body.name;
      creatureData[req.params.idx].type = req.body.type;
    
       // save the editted dinosaurs to the data.json file
      fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
      res.redirect('/prehistoric_creatures');
    });

//We shouldn't need delete here 
/*
  router.delete('/dinosaurs/:idx', function(req, res){
      const creatures = fs.readFileSync('./dinosaurs.json');
      const creatureData = JSON.parse(dinosaurs);
    
      // remove the deleted dinosaur from the dinosaurs array
      dinoData.splice(req.params.idx, 1)
    
      // save the new dinosaurs to the data.json file
      fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    
      //redirect to the GET /dinosaurs route (index)
      res.redirect('/dinosaurs');
    });
*/
  



module.exports = router;