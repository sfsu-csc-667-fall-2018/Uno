const express = require('express');
let router = express.Router();

const sequelize = require('../db/test_sequelize_connection');
const { games } = require('../models');


/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('index', { title: 'Express' });
});

router.get('/newgame', function (req, res, next) {
   let newGame = games.build({
      name: "example"
   });
   res.render('index', { title: 'Express' });
});

router.post('/games/:id/moves', (request, response) => {
   // // Get data from the database
   // db.games.findById(request.params.id)
   // // Instantiate the game
   // const game = new GameStateThing(data);
   // // Provide the game with the move data
   // game.playcard()
})

module.exports = router;
