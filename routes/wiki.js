var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage', {});
});

router.post('/', function(req, res, next) {
  res.json(req.body);
});


module.exports = router;
