// Registration page

var express = require('express');
var router = express.Router();
var db = require('./db');
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');


// Middleware
router.use(expressValidator());
router.use(bodyParser.urlencoded({extended: true})); 

router.get('/', (req, res) => {
    // Tells node to render this ejs file named index 
    // USING DUMMY REGISTRATION EJS, CHANGE LATER
    res.render('dummyRegistration', {
        // Ejs variables being passed into index.ejs
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        distanceFilter: ""
    });
});
// Processing registration form
router.post('/', (req,res) => {
    var userName = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    //Make sure to validate each name attribute from the form.
    req.checkBody('name').not().isEmpty().withMessage("Username required");
    req.checkBody('email').isEmail().withMessage("Invalid Email");
    req.checkBody('password')
        .not().isEmpty().withMessage("Password cannot be empty")
        .isAlphanumeric().withMessage('Alphanumeric characters only')
        .isLength({
            min: 10
        }).withMessage('Password must be at least 10 characters long');
    req.checkBody('password2').equals(password).withMessage("Passwords do not match");
        
    
    const errors = req.validationErrors();
    if(errors){
        res.render('dummyRegistration', {
        errors: errors,
        results: 0,
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        distanceFilter: ""
        });
    
    } else {
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
                req.flash('success', "Successfully registered! Please login.")
                res.redirect('/login');
            });
        });
    });
    }
});

module.exports = router;