const express = require('express');
let router = express.Router();

const Game = require('../db/games');

router.post('/newgame', function(req, res, next) {
   Game.createGame(req.body.name)
   .then(
      Game.listGames().then(function(results){
         res.send(results);
      })
      );
});

router.post('/deletegame', function(req, res, next) {
   Game.deleteGame(req.body.name)
   .then(res.send("success"));
});


module.exports = router;
