var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

module.exports = function (io) {

router.use(bodyParser.urlencoded())
router.use(bodyParser.json())
router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets,showForm: true } );
});

router.post('/tweets', function(req,res) {
  console.log(req)
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name,text);
  io.sockets.emit('newTweet', {name:name, content:text})
  res.redirect('/')
})

router.get('/tweets/:id', function(req, res) {
	var id = req.params.id;
	var tweets = tweetBank.find( {id: +id} );
	console.log(id, tweets);
	res.render('index', {tweets: tweets});
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  console.log(typeof tweets[0].name)
  res.render( 'index', { tweets: tweets ,showForm: true,username: name} );
});

router.use(express.static('public'));
return router
}



