var url = require('url');
var page = url.pathname;
const mysql = require('mysql');
var express = require('express');
var path = require('path');
var database = require('./db')
var adminPage = require('./admin');


var app = express();
var port = 3000;
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/admin', adminPage);

app.get('/',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('index', {
        // Ejs variables being passed into index.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category
    });
});

app.get('/post',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('posting', {
        // Ejs variables being passed into index.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category
    });
});


app.get('/results',search, (req, res) => {
    var searchResult = req.searchResult;
        console.log(searchResult);
        // Tells node to render this ejs file named results
        res.render('results', {
            // Ejs variables being passed into results.ejs
            results: searchResult.length,
            searchTerm: req.searchTerm,
            searchResult: searchResult,
            searchCategory: req.query.category
        });
    });

    app.get('/results/:id', displayPost, (req, res) => {
        console.log(req.method, req.path)
        var searchResult = req.searchResult;
        //console.log("ID for post is: " + req.params.id);
        console.log(searchResult);
        res.render('posting', {
            // Ejs variables being passed into results.ejs
            results: searchResult.length,
            searchTerm: req.searchTerm,
            searchResult: searchResult,
            searchCategory: req.query.category
        });
    });
	
app.get('/login',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('login', {
        // Ejs variables being passed into index.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category
    });
});

app.get('/registration',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('registration', {
        // Ejs variables being passed into index.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category
    });
});


app.get('/userdash',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('userdash', {
        // Ejs variables being passed into index.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category
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

    database.query(query, (err, result) => {
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


function displayPost(req, res, next){
    var searchTerm = req.query.search;
    var searchCategory = req.query.category;
    var postID = req.params.id;
    let query = "SELECT * FROM post WHERE post_id = '" + postID +"'";
    database.query(query, (err, result) => {
        if (err){
            req.post_id = "Cannot find post ID.";
            req.searchResult = "Cannot find result";
            req.searchTerm = "Cannot find search term";
        }
        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.searchCategory = searchCategory;
        next();
    });
}











