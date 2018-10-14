var createError = require('http-errors');
var express = require('express');
var path = require('path');

if(process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

const router  =  express.Router();
const pgp = require('pg-promise')();
const connection = process.env.DATABASE_URL;
const db = pgp(connection);

module.exports = connection;

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.get("/tests",  (request,  response)  =>  {
    db.any(`INSERT  INTO  test_table  ("testString")  VALUES  ('Hello  at  ${Date.now()}')`)
        .then(  _=>db.any(`SELECT  *  FROM  test_table`)  )
        .then(  results=>response.json(  results  )  )
        .catch(  error=>  {
            console.log(  error  )
            response.json({  error  })
        })
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


module.exports  =  router;

module.exports = app;
