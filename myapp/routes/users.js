var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add/user', function (req, res) {
  res.send({
    	"age": 15,
	    "name": "Jean-2",
	    "type": "gentil"
  });
});

module.exports = router;
