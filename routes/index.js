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
      gameid: req.query.id
    })
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