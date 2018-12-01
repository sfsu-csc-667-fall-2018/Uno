const express = require('express');
let router = express.Router();

const Game = require('../db/games');
const User = require('../db/users');

const logic = require('../game_logic');
let testGame;

router.post('/newgame', function(req, res, next) {
   testGame = new logic.UnoGameRoom("name",1);
   let player1 = new logic.UnoPlayer("moses");
   let player2 = new logic.UnoPlayer("tim");
   let player3 = new logic.UnoPlayer("preston");
   let player4 = new logic.UnoPlayer("chris");
   let player5 = new logic.UnoPlayer("pablo");

   testGame.addPlayer('player1');
   testGame.addPlayer('player2');

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

router.post('/dealcards', function(req, res, next) {
   Game.deleteGame(req.body.name)
   .then(res.send("success"));
});

router.post('/createDrawDeck', function(req, res, next) {
   testGame.startRound();
   let cards = testGame.getDrawDeckCards();
   console.log(cards);
   let i = 0;
   /*for(let c in cards){
      Game.addCardToDrawDeck(req.body.gameid,c.mapId,i)
      .then();
      i++;
   }*/
});

router.post('/newuser', function(req, res, next) {
  User.createUser(req.body.username)
  .then(
    User.listUsers().then(function(results){
     res.send(results);
  })
    );
});

router.post('/deleteuser', function(req, res, next) {
  User.deleteUser(req.body.username)
  .then(
    User.listUsers().then(function(results){
     res.send(results);
  })
    );
});

router.post('/addUserToGame', function(req, res, next) {
  User.addUserToGame(req.body.userid, req.body.gameid)
  .then(
    User.listGamesUsers().then(function(results){
     res.send(results);
  })
    );
});
module.exports = router;
