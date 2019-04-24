var express = require('express');
var router = express.Router();
var db = require('../db');

var app = express();
app.set('view engine', 'ejs');

router.get('/',search, (req, res) => {
    var searchResult = req.searchResult;
        // Tells node to render this ejs file named index 
        res.render('admin', {
            // Ejs variables being passed into index.ejs
            searchResult: searchResult,
            searchTerm: req.searchTerm,
            searchCategory: req.query.category
        });
    });
    
    router.get('/removepost', (req, res) =>{
        res.send("UI to remove post");
    }); 

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

module.exports = router;

