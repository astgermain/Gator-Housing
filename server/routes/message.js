var express = require('express');
var router = express.Router();
var db = require('../db');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

// Middleware
router.use(expressValidator());
router.use(bodyParser.urlencoded({extended: true})); 
router.use(express.static('../public'));

//Approve post
router.post('/', checkMessage, (req, res) => {
    if (req.user != undefined){
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var message = req.body.message;
    // Need to fix modal to pass post ID over
    var postID = req.body.postID;
    console.log(`Name: ${name}, Phone: ${phone}, Email: ${email} , Message: ${message}, Post ID: ${postID}`);
    let query = ` INSERT INTO messages (name, phone, email, text, post_id)
                   VALUES('${name}', '${phone}', '${email}', '${message}', '${postID}') `;
    db.query(query, (err, result) => {
        if (err) {
            console.log("Failed to insert into message table: " + err)
        }
        console.log("Inserted row: " + result);

    });
    req.flash('success', "Successfully sent message!")
    res.redirect('/');
        
    } else {
        req.flash('danger', "Please login to send a message");
        res.redirect('/login');
    }
    
});
"Hello, good sir. how are you? great!"

function checkMessage(req, res, next){
    //Make sure to validate each name attribute from the form.
    req.checkBody('name').not().isEmpty().withMessage("Name Required");
    req.checkBody('phone').optional().isMobilePhone().withMessage("Invalid Phone Number");
    req.checkBody('email').isEmail().withMessage("Invalid Email");
    req.checkBody('message').not().isEmpty().withMessage("Message Required")
                           .matches(/^[-@./#?!,&+\w\s]*$/).withMessage("Alphanumeric Characters Only") 
        
    
    const errors = req.validationErrors();
    var livePosts = "";
    if(errors){
        res.render('results', {
        livePost: livePosts,
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

