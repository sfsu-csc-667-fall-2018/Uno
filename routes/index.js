<<<<<<< HEAD
module.exports = function(io, db) {
  const express = require('express');
  const router = express.Router();
  const passport = require('passport');
  const logic = require('../socket/gameSession');
  const server = require('../socket/unoServer');

  io.on('connection', socket => server(io, socket, db));

  router.get('/', (req, res, next) => {
    console.log('Cookies: ', req.cookies)
    res.render('index');
  });

  router.get('/lobby', (req, res, next) => {
    db.query('SELECT * FROM GAMES')
    .then(games =>{
      res.render("lobby",{
        games: games
      })
    })
    .catch(error =>{
      res.send(error);
    })
  });

  router.get('/game', (req, res, next) => {
    console.log("gameid: "+ req.query.id);
    res.render("game",{
      cards:[
      {'image':'red_0.png'},
      {'image':'blue_3.png'}
      ],
      gameid: req.query.id
    });
  });

  router.get('/creategame', (req, res, next) => {
    res.render('creategame');
  });

  /*router.post('/register', (req, res, next) => {
    db.none('INSERT INTO users(username, email, password) VALUES(${username}, ${email}, ${password})', {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    res.redirect('/');
  });*/

  /*router.post('/creategame', (req, res, next) => {
    console.log("user: "+req.user);
    db.any('INSERT INTO games(name) VALUES(${roomname}) RETURNING id', {
      roomname: req.body.roomname
    }).then(id =>{
      db.any('INSERT INTO games_users(user_id,game_id) VALUES(${userid},${gameid}) RETURNING id', {
        userid: req.user[0].id,
        gameid: id[0]['id']
      })
    }).catch(err => {
      console.log("Error: "+err);
    });
    res.redirect('/lobby');
  });*/

  /*router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      console.log(req.user);
      res.redirect('/lobby');
    });*/

    router.get('/chat', (req, res, next) => {
      res.render('chat');
    });

    return router;
  };
=======
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

router.get('/updatesuccess', function(req, res) {

    res.render('updatesuccess');
});


router.get('/creategame', function(req, res) {

    res.render('creategame');
});

router.get('/lobby', function(req, res) {

    res.render('lobby');
});

router.get('/game', function(req, res) {

    res.render('game');
});


router.get('/userinfo', function(req, res) {

    res.render('userinfo');
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
>>>>>>> wireframes-preston
