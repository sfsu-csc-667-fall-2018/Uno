const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');

let router = express.Router();

const db = require('../models');

const user = require('../models/users');

passport.use(new localStrategy(
  (username, password, done) => {
    user.getUserByUserName(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }

      user.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          done(null, false, { message: 'Invalid password' })
        }
      })
    })
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

// Get Registration Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register User
router.post('/register', (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let password2 = req.body.password2;

  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    let newUser = db.user.build({
      username: username,
      email: email,
      password: password
    });

    db.user.findOne({ where: { username: newUser.username } }).then((result) => {
      if (result === null) {
        db.user.findOne({ where: { email: newUser.email } }).then((result) => {
          if (result === null) {
            user.createUser(newUser, (err, user) => {
              if (err) throw err;
            });

            res.redirect('/users/login');
          } else {
            console.log("email is already in use");
            res.redirect('/users/register');
          }
        })
      } else {
        console.log("username is already in use");
        res.redirect('/users/register');
      }
    });
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout();
  req.redirect('/users/login');
});

module.exports = router;
