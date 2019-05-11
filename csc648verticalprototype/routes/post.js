// Post page
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res) => {
    // USING DUMMY POST EJS, CHANGE LATER
    res.render('post', {
        // Ejs variables being passed into index.ejs
        results: 0,
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        distanceFilter: ""
    });
});


// Processing user post data; need to move to user folder
router.post('/', userPost, (req, res) => {
    // Need to do input validation here
    console.log("Posting");
    // USING DUMMY POST EJS, CHANGE LATER
    res.render('post', {
        // Ejs variables being passed into index.ejs
        results: 0,
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        distanceFilter: ""
    });
});

// For registered user to be able to post; need to move to user folder
function userPost(req, res) {
    var id = req.user;
    var postName = req.body.title;
    var price = req.body.price;
    var beds = req.body.beds;
    var baths = req.body.baths;
    var category = req.body.category;
    var location = req.body.location;
    var city = req.body.city;
    var state = req.body.state;
    var phone = req.body.phone;
    var email = req.body.email;
    var description = req.body.description;
    var image = req.body.image;

    if (req.user != undefined) {
        console.log("post user id is: " + id);
        let query = ` INSERT INTO post (post_name, price, beds, baths, category, user_id, location, city, state, phone, email, description, image)
        VALUES('${postName}', '${price}', '${beds}', '${baths}', '${category}', '${id}', '${location}', '${city}', '${state}', '${phone}', 
            '${email}', '${description}', '${image}') `;

        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                console.log("Failed to insert into post table: " + err)
            }
            console.log("Inserted row: " + result);

        });
        req.flash('success', "Successfully submitted a post! Please wait at least 24 hours to give us a chance to review your post!")
        res.redirect('/');
    } else {
        req.flash('danger', "Please login to post");
        res.redirect('/login');
    }

}


module.exports = router;