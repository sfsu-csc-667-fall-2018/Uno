const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');

let router = express.Router();

const User = require('../db/users');

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


module.exports = router;
