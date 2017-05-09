const express = require('express');
const Api = require('./server/Api');
const myApp = require('./myapp/app');
var request = require('request');

var users = require('./myapp/routes/users');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Max-Age", "3600");
  next();
});

app.use('/api', Api);

/* GET users listing. */
app.get('/users', function(req, res, next) {
  
  res.send('respond with a resource');
});

app.post('/add/user', function (req, res) {
  res.send({
    	"age": 15,
	    "name": "Jean-2",
	    "type": "gentil"
  });
});

app.get('/*', myApp);

const port = process.env.PORT || 5000;
app.listen( port, function () {
  console.log(`Example app listening on port ${port}!`);
});
