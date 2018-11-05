const express = require('express');
let router = express.Router();
const Knex = require('knex');

const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])

/* GET users listing. */
router.post('/newGame', function(req, res, next) {
  knex("Games").insert({
   Name: req.body.name
})
  .then(console.log(knex("Users").select('Name')))
  .then(res.redirect('/'));
});

router.post('/newUser', function(req, res, next) {
  knex("Users").insert({
   UserName: req.body.username,
   Email: req.body.email,
   Password: req.body.password
})
  .then(res.send(knex("Users").select('*')));
});

router.post('/joinGame', function(req, res, next) {
   knex("Game_Users").insert({
      UserID: req.body.username,
      GameID: req.body.gamename,
   })
   .then(res.send(knex("Game_Users").select('*')).toPlainObject());
});


module.exports = router;
