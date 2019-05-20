// Login page

var express = require('express');
var router = express.Router();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const passport = require('passport');

// Passport config file
require('../config/passport')(passport)
// Middleware
router.use(expressValidator());
router.use(bodyParser.urlencoded({extended: true})); 
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
    // Tells node to render this ejs file named index 
    res.render('login', {
        // Ejs variables being passed into index.ejs
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        bedFilter: "",
        bathFilter: ""
    });
});

// Login authentication
router.post('/', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: 'Welcome!',
        failureFlash: true
    })(req, res, next);
});


module.exports = router;