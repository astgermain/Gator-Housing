var express = require('express');
var router = express.Router();
var db = require('../db');
const {ensureAuthenticated} = require('../config/auth.js');
const functions = require('../functions');
var app = express();
var fs = require('fs');
 

app.set('view engine', 'ejs');
router.use(express.static('../public'));

router.get('/', ensureAuthenticated, checkAdmin, search, functions.viewMessages, (req, res) => {
    var searchResult = req.searchResult;
    var messages = req.messageResult;
    var postsToBeApproved = 0;
    for (let i = 0; i < searchResult.length; i++ ){
        if (searchResult[i].isLive == 0)
        postsToBeApproved +=1;
    }
    // Tells node to render this ejs file named index 
    res.render('admin', {
        // Ejs variables being passed into index.ejs
        postsToApprove: postsToBeApproved,
        messageResult: messages,
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category,
        sortType: req.query.sortType,
        priceFilter: req.query.priceFilter,
        bedFilter: req.query.bedFilter,
        bathFilter: req.query.bathFilter
    });
});
    
// Delete post 
router.post('/delete/:id', (req, res) => {

    var postID = req.params.id;
    console.log("Post id is: " + postID);
    let query = "SELECT * FROM post where post_id = '" + postID + "'";

    db.query(query, (err, result) => {
        if (err){
            req.searchResult = "Cannot delete post with ID: " + postID;
        }
        // Deletes image from relative path 
        fs.unlinkSync(`public/img/${result[0].image}`);
    });
    
    query = "DELETE FROM post where post_id = '" + postID + "'";
    db.query(query, (err, result) => {
        if (err){
            req.searchResult = "Cannot delete post with ID: " + postID;
        }
    });
 
    res.redirect('/admin');
});

// Delete message
router.post('/delete/message/:id', (req, res) => {

    var messageID = req.params.id;
    console.log("Message id is: " + messageID);    
    query = "DELETE FROM messages where id = '" + messageID + "'";
    db.query(query, (err, result) => {
        if (err){
            req.searchResult = "Cannot delete message with ID: " + messageID;
        }
    });
 
    res.redirect('/admin');
});



//Approve post
router.post('/approve/:id', (req, res) => {
    var postID = req.params.id;
    console.log("Post id is: " + postID);
    let query = "UPDATE post set isLive = '1' where post_id = '" + postID + "'";

    db.query(query, (err, result) => {
        if (err){
            req.searchResult = "Cannot delete post with ID: " + postID;
        }
        console.log('Deleted Row(s):', result);
    });
 
    res.redirect('/admin');
});

// Used for admin to see all posts to be approved
 function search (req, res, next) {
    // User's search term
    var searchTerm = req.query.search;
    var searchCategory = req.query.category;
    let query = 'SELECT * FROM post';
    db.query(query, (err, result) => {
        if (err){
            req.searchResult = "Cannot find result";
            req.searchTerm = "Cannot find search term";
        }
        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.searchCategory = searchCategory;
         next();
    });
    
}

 function checkAdmin(req, res, next){
    if(req.user!=undefined) {
        // req.user is an object, can call data using the following to access the variables inside
        // Checks if a user has admin access
        if (req.user[0].isAdmin != 1) {
            req.flash('danger', "Unauthorized access");
            res.redirect('/');
        } else {
            // If they do, then continue to the next 
            next();
        }
    }
 }


module.exports = router;

