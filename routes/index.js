var express = require('express');
var router = express.Router();

const Knex = require('knex');
const knex = Knex(require('../knexfile.js') [process.env.NODE_ENV || 'development'])


router.get('/', function(req, res) {

   res.render('index');
});

router.get('/login', function(req, res) {

    res.render('login');
});

router.get('/users', function(req, res) {
   knex('Users')
   .then(
      knex.select('UserName', 'email', 'Password').from('Users')
      .then(function(users) {
         //console.log(users.length);
         res.render('users',{users: users});
      }));
});


module.exports = router;

   // req.query.username