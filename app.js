const express = require('express');
const chalk = require('chalk');
const volleyball = require('volleyball');

const app = express();
const log = console.log;

app.use(volleyball);


app.listen(3000, function(request, result){
  log('It is running!');
});

