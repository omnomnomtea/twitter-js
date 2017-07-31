const express = require('express');
const app = express();


app.get('/', function(request, result){
  result.send("Hello world!")
})

app.listen(3000, function(request, result){
  console.log('It is running!');
});

