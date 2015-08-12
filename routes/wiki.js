var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

// function urlTitleGen(title) {
//   var randomLength = Math.floor(Math.random() * 50);
//   if(!title) {
//     for(var i=0; i < randomLength; i++) {
//       title += String.fromCharCode(Math.floor(Math.random()*(93) + 33));
//     }
//   }
//   return title.replace(/\s/g,'_').replace(/[^\w]/g, '');
// }

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage', {});
});

router.post('/', function(req, res, next) {
  var content = req.body.content;
  var title = req.body.title;
  var page = new Page({
    title: title,
    content: content
  });
  page.save()
  .then(function(page){
    res.redirect(page.route);
  })
  .then(null, console.error);
});

router.get('/:pageName', function(req,res,next) {
  var pageName = req.params.pageName;
  Page.findOne({'urlTitle': pageName}).exec()
  .then(function(page) {
    res.render('wikipage', page);
  })
  .then(null, console.error);
});


module.exports = router;
