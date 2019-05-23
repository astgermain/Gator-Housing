var express = require('express');
var router = express.Router();
var db = require('../db');
const {ensureAuthenticated} = require('../config/auth.js');
const functions = require('../functions');
var fs = require('fs');
var app = express();
app.set('view engine', 'ejs');

router.get('/', ensureAuthenticated, userdashfnc, functions.viewMessages, (req, res) => {
    var searchResult = req.searchResult;
    var messages = req.messageResult;
    // Tells node to render this ejs file named user 
    res.render('userdash', {
        // Ejs variables being passed into user.ejs
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

router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success', 'You have successfully logged out');
    res.redirect('/');
});

// Search function works for rendering the page first time
function userdashfnc (req, res, next) {
	var searchTerm = req.query.search;
    var searchCategory = req.query.category;
    let query = null;
    if(req.user != undefined) {
        console.log("User ID is: " + req.user[0].id);
        query = `SELECT * FROM post where user_id= ${req.user[0].id}`;
    }
    
    
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
 
    res.redirect('/userdash');
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
 
    res.redirect('/userdash');
});




module.exports = router;
