var express = require('express');

var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('landingpage');
});
// router.get('/contactus.html', function(req, res, next) {
//   res.render('contactus');
// });
 router.get('/visitorForm.html', function(req, res, next) {
  res.render('visitorForm');
});
router.get('/searchByPhone.html', function(req, res, next) {
  res.render('searchByPhone');
});



// router.get('/view.html', function(req, res, next) {
//   res.render('viewVisitors');
// });


module.exports = router;
