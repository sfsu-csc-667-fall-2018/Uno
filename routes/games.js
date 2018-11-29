const express = require('express');
let router = express.Router();

const Game = require('../db/games');

router.post('/newgame', function(req, res, next) {
   Game.create(req.body.name)
   .then(res.send("success"));
});

router.post('/deletegame', function(req, res, next) {
   Game.create(req.body.name)
   .then(res.send("success"));
});


module.exports = router;
