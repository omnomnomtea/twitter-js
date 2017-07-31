const express = require('express');
const chalk = require('chalk');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks')

const app = express();
const log = console.log;

nunjucks.configure('views');
nunjucks.render('index.html', {title: 'Hi there', people: [{name: "Tess"},{name: "Jan"}]}, function(err, output){
  log(output);
});


app.use(volleyball);


app.listen(3000, function(request, result){
  log('It is running!');
});

