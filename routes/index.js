//Required Modules
const express = require('express');
const tweetBank = require('../tweetBank');

//Router
module.exports = function(io){
  const router = express.Router();

  router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true} );
  });

  router.post('/tweets', function (req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var id = tweetBank.add(name, text);
    io.sockets.emit('newTweet', {name, text, id});
    res.redirect('/');
  });

  router.get('/users/:name', function (req, res) {
    let tweets = tweetBank.find(function(object){
      return object.name.toLowerCase() === req.params.name.toLowerCase();
    });
    res.render( 'index', {tweets: tweets, showForm: true, name: req.params.name} );
  });

  router.get('/tweet/:id', function (req, res) {
    let tweets = tweetBank.find(function(object){
      return object.id === Number(req.params.id);
    });
    res.render( 'index', { tweets: tweets } );
  });
    return router;
};
