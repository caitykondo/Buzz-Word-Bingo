const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;


app.use((req, res, next)=>{
  console.log('app started');
  next();
});

app.get('/', (req, res, next) => {
  res.send('HTML here');
});

var server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s%s', host, port);
});