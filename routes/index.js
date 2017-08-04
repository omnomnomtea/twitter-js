//Required Modules
const express = require('express');
//const tweetBank = require('../tweetBank');
const tweetBankDB = require('../tweetBankDB');
const timeSince = require('../public/utility/time');
const client = require('../db/index.js')

//Router
module.exports = function (io) {


  const router = express.Router();


  router.get('/', function (req, res, next) {

    var promise = client.query('SELECT tweets.id, tweets.time_posted, tweets.user_id, users.name, tweets.content FROM tweets INNER JOIN users ON users.id = tweets.user_id;');

    promise.then(function (result) {
      var tweets = result.rows;
      console.log('tweets is', tweets)
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true })
    }).catch( function (err) {
      return next(err);
    });
  });


  router.post('/tweets', function (req, res, next) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBankDB.addTweet(name, text, io, () => res.sendStatus(204));
  });

  router.get('/users/:name', function (req, res, next) {
    client.query(`SELECT * FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE users.name = '${req.params.name}';`, function (err, result) {
      if (err) return next(err);
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true, name: req.params.name })
    });
  });

  router.get('/tweet/:id', function (req, res, next) {
    client.query(`SELECT tweets.id, tweets.time_posted, tweets.user_id, users.name, tweets.content FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE tweets.id = ${req.params.id};`, function (err, result) {
      if (err) return next(err);
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true, name: tweets[0].name })
    });
  });

  return router;
}
