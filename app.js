//Require Modules
const express = require('express');
const chalk = require('chalk');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes');

//Configs and Template
const app = express();
const log = console.log;
app.use(volleyball);
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.use('/', routes);

//HTML & CSS Files
app.use(express.static('public'));

//Server Listening
app.listen(3000, function(request, result){
  log('It is running!');
});

