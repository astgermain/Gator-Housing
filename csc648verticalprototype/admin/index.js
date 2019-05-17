var express = require('express');
var router = express.Router();
var db = require('../db');
const {ensureAuthenticated} = require('../config/auth.js');
var app = express();
var fs = require('fs');
 

app.set('view engine', 'ejs');
router.use(express.static('../public'));

router.get('/', ensureAuthenticated, checkAdmin,  search, viewMessages, (req, res) => {
    var searchResult = req.searchResult;
    var messages = req.messageResult;
        // Tells node to render this ejs file named index 
        res.render('admin', {
            // Ejs variables being passed into index.ejs
            messageResult: messages,
            searchResult: searchResult,
            searchTerm: req.searchTerm,
            searchCategory: req.query.category
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
    
   // Make sure WHERE statement is wrapped in single quotes is like this: WHERE something = 'this'
   if(searchTerm !=undefined && searchCategory == ""){
    query = "SELECT * FROM post WHERE post_name LIKE '%" + searchTerm +"%'" + " OR location LIKE '%" + searchTerm +"%'"
    + " OR price LIKE '%" + searchTerm +"%'" + " OR category LIKE '%" + searchTerm +"%'";
    }
    else if(searchTerm != undefined && searchCategory != undefined){
        query = "SELECT * FROM post WHERE category = '" + searchCategory + "' AND (post_name LIKE '%" + searchTerm +"%'" 
        + " OR price LIKE '%" + searchTerm +"%'"+ " OR location LIKE '%" + searchTerm +"%')";
    }
    else if (searchTerm ==undefined && searchCategory != undefined){
        query = "SELECT * FROM post WHERE category = '" + searchCategory + "'";
    }else if(searchTerm ==undefined && searchCategory == undefined){
        query = 'SELECT * FROM post';
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
" SELECT m.*, p.post_name, p.image FROM messages m, post p WHERE p.user_id = 1 AND m.post_id = p.post_id; "
function viewMessages(req, res, next) {
    // Need to replace user id with req.user[0].id later
    let query = ` SELECT m.*, p.post_name, p.image FROM messages m, post p WHERE p.user_id = 1 AND m.post_id = p.post_id `;
    db.query(query, (err, result) => {
        if (err) {
            console.log("Failed retrieve messages: " + err)
        }
        console.log("Inserted row: " + result);
        req.messageResult = result;
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

