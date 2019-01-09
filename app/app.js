const express = require('express'),
    logger = require('morgan'),
    createError = require('http-errors');

const Blockchain = require('../blockchain'),
    indexRouter = require('./routes/index');

const app = express();
const bc = new Blockchain();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use(logger('dev'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
module.exports = app;

