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
router.post('/', (req, res) => {
    if (req.user != undefined){
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var message = req.body.message;
    // Need to fix modal to pass post ID over
    var postID = 13;
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

    
module.exports = router;

