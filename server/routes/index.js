var express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const User=require('../models/User')
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

router.use(bodyParser.urlencoded({ extended: true }));

router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge:900000
  }
}));
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Routes
router.get('/', (req, res) => {
  res.render('index'); // Your home page
});

router.get('/login', (req, res) => {
console.log(req.sessionID);

  res.render('login'); // Your login page
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user in database
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.user = user.username;
   
    res.redirect('/dashboard');
  } else {
    res.send('Invalid credentials');
  }
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

router.get('/logout', (req, res) => {
console.log(req.sessionID);  
  
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.redirect('/');
  });
});



// router.get('/view.html', function(req, res, next) {
//   res.render('viewVisitors');
// });


module.exports = router;
