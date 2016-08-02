var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes/')
var socketio = require('socket.io');

app.use(morgan('dev'));
var server = app.listen(3000);
var io = socketio.listen(server)
console.log('server listening');

app.use('/', routes(io));

app.set('views', __dirname + '/views'); // point res.render to the proper directory
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig
swig.setDefaults({
  cache: false
});


