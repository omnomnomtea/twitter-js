//Required Modules
const express = require('express');
const tweetBank = require('../tweetBank');

//Configs
const router = express.Router();

//Router
router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

module.exports = router;
