const express = require('express');
const router = express.Router();
const Game = require('../db/games');

router.post('/create', (req, res, next) => {
  let gameName = req.body.name;

  Game.create(gameName)
  .catch(error => {
    console.log(error);
    response.redirect('/');
  })
  .then(({ id })
    => {
      return { id };
    })
  .then(({ id }) => console.log("Created new game: "+id))
    // TODO: add flash message on error
  })
;



module.exports = router;