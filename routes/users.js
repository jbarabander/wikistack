var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).exec()
  .then(function(users) {
    res.render('users', {users: users});
  }).then(null, console.error);
});

router.get('/:id', function(req, res, next) {
  User.findOne({_id: req.params.id}).exec()
  .then(function(user) {
    return Page.find({author: user._id}).exec();
  })
  .then(function(pages){
    res.render('user', {pages: pages});
  })
  .then(null, console.error);
});

module.exports = router;
