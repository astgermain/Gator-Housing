var express = require('express');
var router = express.Router();
var db = require('../db');
const {ensureAuthenticated} = require('../config/auth.js');
var fs = require('fs');
var app = express();
app.set('view engine', 'ejs');

router.get('/', ensureAuthenticated ,userdashfnc, viewMessages, (req, res) => {
    var searchResult = req.searchResult;
    var messages = req.messageResult;
        // Tells node to render this ejs file named user 
        res.render('userdash', {
            // Ejs variables being passed into user.ejs
            messageResult: messages,
            searchResult: searchResult,
            searchTerm: req.searchTerm,
            searchCategory: req.query.category
        });
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

" SELECT m.*, p.post_name, p.image FROM messages m, post p WHERE p.user_id = 1 AND m.post_id = p.post_id; "
function viewMessages(req, res, next) {
    // Need to replace user id with req.user[0].id later
    let query = ` SELECT m.*, p.post_name, p.image FROM messages m, post p WHERE p.user_id = 42 AND m.post_id = p.post_id `;
    db.query(query, (err, result) => {
        if (err) {
            console.log("Failed retrieve messages: " + err)
        }
        console.log("Inserted row: " + result);
        req.messageResult = result;
        next();
    });
}

module.exports = router;
