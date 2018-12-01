const express = require('express');
let router = express.Router();

const Game = require('../db/games');
const logic = require('../game_logic');

let testGame = new logic.UnoGameRoom("name",1);

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

router.post('/createDrawDeck', function(req, res, next) {
   testGame.startRound();
   console.log(testGame.getDrawDeckCards());
});

module.exports = router;
