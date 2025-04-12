const fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var hewanRouter = require("./routes/hewan");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hewan', hewanRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // return a 404 response
    res.status(404).json({
        error: {
            message: 'Not Found',
            status: 404
        }
    });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // return the error response
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status || 500
        }
    });
});

// Load and store the hewan data
const hewanDataPath = path.join(__dirname, 'public/data/hewan_esa.json');
const hewanData = fs.readFileSync(hewanDataPath);
const hewanJsonData = JSON.parse(hewanData);

// Load hewan kesayangan
const hewanKesayanganPath = path.join(__dirname, 'public/data/hewan_kesayangan.json');
const hewanKesayanganData = fs.readFileSync(hewanKesayanganPath);
const hewanKesayanganJsonData = JSON.parse(hewanKesayanganData);

hewanJsonData.forEach(hewan => {
    if (hewanKesayanganJsonData.find(kesayangan => kesayangan === hewan.nama)) {
        hewan.kesayangan = true;
    }
});

app.locals.hewanData = hewanJsonData;

module.exports = app;
