const createError = require('http-errors');
const express = require('express');
const path = require('path');

if(process.env.NODE_ENV === 'development') {
 require("dotenv").config();
}

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const databaseRouter = require('./routes/database');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/database', databaseRouter);

module.exports = app;
