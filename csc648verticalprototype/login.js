// Login page

var express = require('express');
var router = express.Router();
var db = require('./db');
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

// Middleware
router.use(bodyParser.urlencoded({extended: true})); 

router.get('/', (req, res) => {
    // Tells node to render this ejs file named index 
    res.render('login', {
        // Ejs variables being passed into index.ejs
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        distanceFilter: ""
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