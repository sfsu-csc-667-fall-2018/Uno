const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');

let router = express.Router();

const { User } = require('../models/');

passport.use(new localStrategy(
    (username, password, done) => {
        User.findOne({ where: { username } })
            .then(resultUser => {
                if (password === resultUser.password) {
                    return done(null, resultUser);
                } else {
                    return done(null, false, { message: 'Invalid Password' });
                }
            }).catch((err) => {
                console.log(err)
                return done(null, false, { message: 'Unknown User' });
            })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(user => {
        done(null, user);
    }).catch(err => {
        done(err)
    });
});

// Get Registration Page
router.get('/register', (req, res) => {
    res.render('register');
});

const validateFields = request => {
    request.checkBody('username', 'Name is required').notEmpty();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('email', 'Email is not valid').isEmail();
    request.checkBody('password', 'Password is required').notEmpty();
    request.checkBody('password2', 'Passwords do not match').equals(request.body.password);

    return request.validationErrors();
}

// Register User
router.post('/register', (req, res) => {
    const { username, email, password } = req.body
    const errors = validateFields(req);

    if (errors) {
        res.render('register', { errors });
    } else {
        Promise.all([
            User.findOne({ where: { username } }),
            User.findOne({ where: { email } })
        ]).then(([usernameResult, emailResult]) => {
            if (usernameResult === null && emailResult === null) {
                // if both of those are null, user does not exist
                User.create({ username, email, password }).then(() => {
                    res.redirect('/users/login');
                })
            } else {
                // user exists
                console.log("USER EXISTS!!!!!!");
                res.redirect('/users/register');
            }
        })
    }
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/register',
        failureFlash: false
    }),
    (req, res) => {
        res.redirect('/');
    });

router.get('/logout', (req, res) => {
    req.logout();
    req.redirect('/users/login');
});

module.exports = router;
