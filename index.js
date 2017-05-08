const express = require('express');
const Api = require('./server/Api');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Max-Age", "3600");
  next();
});

app.use('/api', Api);

app.get('/*', (req, res) => {
  res.status(404).send('Cette page n\'existe pas.');
});

const port = process.env.PORT || 5000;
app.listen( port, function () {
  console.log(`Example app listening on port ${port}!`);
});
