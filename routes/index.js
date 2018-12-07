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

    router.get('/chat', (req, res, next) => {
      res.render('chat');
    });

    router.get('/login', function(req, res) {
        res.render('login');
    });

    router.get('/updatesuccess', function(req, res) {

        res.render('updatesuccess');
    });

    router.get('/userinfo', function(req, res) {

        res.render('userinfo');
    });

    return router;
  };
