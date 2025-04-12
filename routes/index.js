var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.json({
    message: 'Hello World'
  }).status(200);
});

module.exports = router;