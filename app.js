var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig')

app.use(morgan('dev'));
app.get('/', function(req, res) {
  var people = [{
    name: 'Full'
  }, {
    name: 'Stacker'
  }, {
    name: 'Son'
  }];
  res.render('index', {
    title: 'Hall of Fame',
    people: people
  });
});
app.get('/special', function(req, res) {
  res.send('something')
})
app.set('views', __dirname + '/views'); // point res.render to the proper directory
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig
swig.setDefaults({
  cache: false
});
app.listen(3000)
console.log('server listening')
