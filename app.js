const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./db/index');

app.set( 'io', io )

http.listen(3000, function(){
  console.log('listening on *:3000');
});

if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

/*io.on('connection', function(socket){
  console.log("user connected");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});*/

app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret', //ToDo we need to change this (is an env var needed, would that even work?)
    saveUninitialized: true,
    resave: true
  }));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const indexRouter = require('./routes/index')(io, db);

app.use('/', indexRouter);

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
