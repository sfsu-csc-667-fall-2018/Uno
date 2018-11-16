const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');

const app = express();

app.use(session({
    secret: 'secret', //ToDo we need to change this (is an env var needed, would that even work?)
    saveUninitialized: true,
    resave: true
 }));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
   }
   return {
      param : formParam,
      msg   : msg,
      value : value
   };
}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/users', gamesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
