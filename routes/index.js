//Required Modules
const express = require('express');
//const tweetBank = require('../tweetBank');
const tweetBankDB = require('../tweetBankDB');
const timeSince = require('../public/utility/time');
const client = require('../db/index.js')

//Router
module.exports = function (io) {


  const router = express.Router();

  // router.get('/', function (req, res) {
  //   let tweets = tweetBank.list();
  //   tweets.forEach(function (tweet, i) {
  //     tweets[i].timeSinceString = timeSince.getTimeSince(tweet.date);
  //     tweets[i].timeSince = tweet.date.getTime();
  //   })
  //   res.render('index', { tweets: tweets, showForm: true });
  // });

  router.get('/', function (req, res, next) {
    // client.query('SELECT tweets.id, tweets.time_posted, tweets.user_id, users.name, tweets.content FROM tweets INNER JOIN users ON users.id = tweets.user_id;', function(err, result){
    //   if (err) return next(err);
    //   var tweets = result.rows;
    //   //console.log(tweets)
    //   res.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true})
    // });

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

    // tweetBankDB.getUserID(name).then(function(result) {
    //   console.log(result.rows[0].id);
    // }, function(err) {

    // })
    // console.log('user id is', );
    // res.end();
    // let promise = client.query(`select id from users WHERE users.name = $1`, [name]);

    // promise.then(function (result) {
    //   if (result.rows.length > 0) {
    //     let user_id = result.rows[0].id;

    //     let promise2 = client.query(`INSERT INTO tweets (user_id, content) VALUES ($1, $2)`, [user_id, text]);

    //     promise2.then(function (result) {
    //       console.log(text);
    //       let tweet = { name: name, content: text };
    //       io.sockets.emit('newTweet', tweet);
    //       res.sendStatus(204);
    //     });
    //   } else {
    //     let promise3 = client.query(`INSERT INTO users (name) VALUES ($1) RETURNING id`, [name]);

    //     promise3.then(function (result) {
    //       let userID = result.rows[0].id;
    //       return client.query(`INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING id`, [userID, text]);
    //     }).then(function (result) {
    //       let id = result.rows[0].id;
    //       let tweet = { name: name, content: text, id: id }
    //       io.sockets.emit('newTweet', tweet);
    //       res.sendStatus(204);
    //     }, function (err) {
    //       if (err) return next(err);
    //     })
    //   }
    // });

    // client.query(`select id from users WHERE users.name = $1`, [name], function(err, result){

    //   if (result.rows.length > 0) {
    //     let user_id = result.rows[0].id;

    //     client.query(`INSERT INTO tweets (user_id, content) VALUES ($1, $2)`, [user_id, text], function(err, result){
    //       if (err) return next(err);

    //       console.log(text);
    //       let tweet = {name: name, content: text};
    //       io.sockets.emit('newTweet', tweet);
    //       res.sendStatus(204);

    //       //res.redirect('/');

    //     });
    //   }
    //   else {

    //      client.query(`INSERT INTO users (name) VALUES ($1) RETURNING id`, [name], function(err, result){
    //       if (err) return next(err);

    //       let userID = result.rows[0].id;


    //       client.query(`INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING id`, [userID, text], function(err, result){
    //         if (err) return next(err);
    //         let id = result.rows[0].id;
    //         let tweet = {name: name, content: text, id: id}
    //         io.sockets.emit('newTweet', tweet);
    //         res.sendStatus(204);
    //         //res.redirect('/');
    //       });

    //     });
    //   }

    //   });

  });

  router.get('/users/:name', function (req, res, next) {
    client.query(`SELECT * FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE users.name = '${req.params.name}';`, function (err, result) {
      if (err) return next(err);
      var tweets = result.rows;
      //console.log(tweets)
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true, name: req.params.name })
    });
  });

  router.get('/tweet/:id', function (req, res, next) {
    client.query(`SELECT tweets.id, tweets.time_posted, tweets.user_id, users.name, tweets.content FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE tweets.id = ${req.params.id};`, function (err, result) {

      if (err) return next(err);

      console.log(result.rows);


      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true, name: tweets[0].name })
    });
  });

  return router;
}
