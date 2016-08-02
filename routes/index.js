var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

router.get('/tweets/:id', function(req, res) {
	var id = req.params.id;
	var tweets = tweetBank.find( {id: +id} );
	console.log(id, tweets);
	res.render('index', {tweets: tweets});
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );

  res.render( 'index', { tweets: tweets } );
});

router.use(express.static('public'));


module.exports = router;

