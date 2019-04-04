const mysql = require('mysql');
var express = require('express');
var path = require('path');


var app = express();
var port = 5000;
app.set('view engine', 'ejs');

const database = mysql.createConnection({
    host: 'team12db.ccdqjwmvzqxn.us-west-1.rds.amazonaws.com',
    user: 'team12',
    password: 'Team12%!',
    database: 'db_gator_housing_v1'
});

database.connect((err) => {
    if(err) console.log(err);
    else console.log('Connected to database!');
    database.query('USE db_gator_housing_v1');
});

app.get('/',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('index', {
        // Ejs variables being passed into index.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function search (req, res, next) {
    // User's search term
    var searchTerm = req.query.search;
    var searchCategory = req.query.category;
    let query = null;
    
   // Make sure WHERE statement is wrapped in single quotes is like this: WHERE something = 'this'
   if(searchTerm !=undefined && searchCategory == ""){
    query = "SELECT * FROM post WHERE post_name LIKE '%" + searchTerm +"%'";
    }
    else if(searchTerm != undefined && searchCategory != undefined){
        query = "SELECT * FROM post WHERE category = '" + searchCategory + "' AND post_name LIKE '%" + searchTerm +"%'";
    }
    else if (searchTerm ==undefined && searchCategory != undefined){
        query = "SELECT * FROM post WHERE category = '" + searchCategory + "'";
    }else if(searchTerm ==undefined && searchCategory == undefined){
        query = 'SELECT * FROM post';
    }

    database.query(query, (err, result) => {
        if (err){
            req.searchResult = "Cannot find result";
            req.searchTerm = "Cannot find search term";
        }
        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.searchCategory = "";
         next();
    });
    
}

