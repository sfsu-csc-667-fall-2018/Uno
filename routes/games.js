const express = require('express');
const router = express.Router();
const Game = require('../db/games');

router.post('/create', (request, response, next) => {
  const { user } = request;

  Game.create(req.body.name)
  .then(({ id }) => {
    return { id };
  })
  .then(({ id }) => console.log("Created new game: "+id))
    // TODO: add flash message on error
    .catch(error => {
      console.log(error);
      response.redirect('/');
    });
  });

module.exports = router;