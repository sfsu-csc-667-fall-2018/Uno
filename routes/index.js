const express = require('express');
let router = express.Router();

const sequelize = require('../db/test_sequelize_connection');
const game = require('../models/games');


/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
});

router.get('/newgame', function(req, res, next) {
   let newGame = sequelize.games.build({
      name: "example"
   });
   res.render('index', { title: 'Express' });
});

module.exports = router;
