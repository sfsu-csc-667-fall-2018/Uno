const express = require('express');
let router = express.Router();
let api = require('../public/javascripts/api.js');

/* GET users listing. */
router.post('/newGame', function(req, res, next) {

   let gameID;
   let createDrawDeck;

   api.createGame(req.body.name)
   .then(function(result) {
     gameID = Number(result);
     console.log(gameID);
     api.createDrawDeck(gameID)
     return gameID})
   .then(function(result) {
      api.shuffleDrawDeck(gameID)
      return gameID})
   .then(res.redirect("/"));

});

module.exports = router;
