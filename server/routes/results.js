// Results page
var express = require('express');
var router = express.Router();
var db = require('../db');
var functions = require('../functions');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');


// Middleware
router.use(expressValidator());
router.use(bodyParser.urlencoded({extended: true})); 

router.get('/', checkSearch, functions.search, (req, res) => {
    var searchResult = req.searchResult;
    var livePosts = 0;
    for (let i = 0; i < searchResult.length; i++ ){
        if (searchResult[i].isLive == 1)
        livePosts +=1;
    }
    console.log(searchResult);
    // Tells node to render this ejs file named results
    res.render('results', {
        // Ejs variables being passed into results.ejs
        livePost: livePosts,
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

// Display information for a specific post a user clicks
router.get('/:id', displayPost, (req, res) => {
    console.log(req.method, req.path)
    var searchResult = req.searchResult;
    var livePosts = 0;
    for (let i = 0; i < searchResult.length; i++ ){
        if (searchResult[i].isLive == 1)
        livePosts +=1;
    }
    //console.log("ID for post is: " + req.params.id);
    console.log(searchResult);
    res.render('results', {
        // Ejs variables being passed into results.ejs
        livePost: livePosts,
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

function checkSearch(req, res, next) {
    //Make sure to validate each name attribute from the form.
    req.checkQuery('search')
        .matches(/^[-@./#?!,&+\w\s]*$/).withMessage("Alphanumeric Characters Only") 
        .isLength({
            max: 40
        }).withMessage('Only enter up to at most 40 characters');
    const errors = req.validationErrors();

    if (errors) {
        errors.forEach(function (errors) {
            var msg = errors.msg;
            req.query.search = "";
            req.flash('danger', msg);
        });
    }
    next();
}

// For displaying the post that a user clicked
function displayPost(req, res, next) {
    var searchTerm = req.query.search;
    var searchCategory = req.query.category;
    var postID = req.params.id;
    let query = "SELECT * FROM post WHERE post_id = '" + postID + "'";
    db.query(query, (err, result) => {
        if (err) {
            req.post_id = "Cannot find post ID.";
            req.searchResult = "Cannot find result";
            req.searchTerm = "Cannot find search term";
        }
        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.searchCategory = searchCategory;
        req.sortType = "";
        req.priceFilter = "";
        req.bedFilter = "";
        req.bathFilter = "";
        next();
    });
}
module.exports = router;