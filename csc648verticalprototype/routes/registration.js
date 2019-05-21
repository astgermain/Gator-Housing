// Registration page

var express = require('express');
var router = express.Router();
var db = require('../db');
const bcrypt = require('bcryptjs');
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
    // USING DUMMY REGISTRATION EJS, CHANGE LATER
    res.render('registration', {
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
// Processing registration form
router.post('/', checkUser, checkRegistration, (req, res, next) => {
    
    var userName = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
     
        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            // Storing hash password in DB
            let query = ` INSERT INTO users (name, email, password)
                              VALUES ('${userName}', '${email}', '${hash}')`;
    
            console.log(query);
    
            db.query(query, (err, result) => {
                if (err) {
                    console.log("Failed to insert into user table: " + err)
                }
                console.log("Inserted row: " + result);
                // If successfully registered, authenticate right away
                passport.authenticate('local', {
                    successRedirect: '/',
                    failureRedirect: '/registration',
                    successFlash: 'Welcome!',
                    failureFlash: true
                })(req, res, next);
            });
        });
    });
});

function checkUser(req, res, next) {
    let query = ` SELECT * FROM users WHERE name = '${req.body.name}' OR email = '${req.body.email}'`;
    db.query(query, (err, result) => {
        if (err) {
            console.log("Failed to query in checkUser method: " + err);
        }
        if(result.length > 0) {
            req.flash('danger', 'Username or email is already taken');
            res.redirect('/registration');
        } else {
            next();
        }
    });

}

function checkRegistration(req, res, next) {
    //Make sure to validate each name attribute from the form.
    req.checkBody('name').not().isEmpty().withMessage("Username required");
    req.checkBody('email').isEmail().withMessage("Invalid Email");
    req.checkBody('password')
        .not().isEmpty().withMessage("Password cannot be empty")
        .isAlphanumeric().withMessage('Alphanumeric characters only')
        .isLength({
            min: 10
        }).withMessage('Password must be at least 10 characters long');
    req.checkBody('password2').equals(req.body.password).withMessage("Passwords do not match");
        
    
    const errors = req.validationErrors();
    if(errors){
        res.render('registration', {
        errors: errors,
        results: 0,
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        bedFilter: "",
        bathFilter: ""
        });
    
    } else {
        next();
    }

}

module.exports = router;