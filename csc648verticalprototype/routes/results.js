// Results page
var express = require('express');
var router = express.Router();
var db = require('../db');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');


// Middleware
router.use(expressValidator());
router.use(bodyParser.urlencoded({extended: true})); 

router.get('/', checkSearch, search, (req, res) => {
    var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named results
    res.render('results', {
        // Ejs variables being passed into results.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category,
        sortType: req.query.sortType,
        priceFilter: req.query.priceFilter,
        distanceFilter: req.query.distanceFilter
    });
});

// Display information for a specific post a user clicks
router.get('/:id', displayPost, (req, res) => {
    console.log(req.method, req.path)
    var searchResult = req.searchResult;
    //console.log("ID for post is: " + req.params.id);
    console.log(searchResult);
    res.render('results', {
        // Ejs variables being passed into results.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category,
        sortType: req.query.sortType,
        priceFilter: req.query.priceFilter,
        distanceFilter: req.query.distanceFilter
    });
});

function checkSearch(req, res, next) {
    //Make sure to validate each name attribute from the form.
    req.checkQuery('search')
        .isAlphanumeric().withMessage('Please enter a location or price')
        .isLength({
            max: 40
        }).withMessage('Only enter up to at most 40 characters');
    const errors = req.validationErrors();

    if (errors) {
        errors.forEach(function (errors) {
            var msg = errors.msg;
            req.flash('danger', msg);
        });
    }
    next();
}


// General search for all users
function search(req, res, next) {
    // Need to do input validation here
    // User's search term
    var searchTerm = req.query.search;
    var searchCategory = req.query.category;
    var sortType = req.query.sortType;
    var priceFilter = req.query.priceFilter;
    var distanceFilter = req.query.distanceFilter;
    let query = null;

    {
        query = 'SELECT * FROM post';

        if (searchTerm) {
            query = query + " WHERE (post_name LIKE '%" + searchTerm + "%'" + " OR location LIKE '%" + searchTerm + "%'" +
                " OR price LIKE '%" + searchTerm + "%'" + " OR category LIKE '%" + searchTerm + "%'" + " OR distance LIKE '%" +
                searchTerm + "%')";

            if (priceFilter) query = query + " AND price <= '" + priceFilter + "'";

            if (searchCategory) query = query + " AND category = '" + searchCategory + "'";

            if (distanceFilter) query = query + " AND distance <= '" + distanceFilter + "'";
        } else if (priceFilter || searchCategory || distanceFilter) {
            query = query + ' WHERE';

            if (priceFilter) {
                query = query + " price <= '" + priceFilter + "'";

                if (searchCategory) query = query + " AND category = '" + searchCategory + "'";

                if (distanceFilter) query = query + " AND distance <= '" + distanceFilter + "'";
            } else if (searchCategory) {
                query = query + " category = '" + searchCategory + "'";

                if (distanceFilter) query = query + " AND distance <= '" + distanceFilter + "'";
            } else query = query + " distance <= '" + distanceFilter + "'";

        }
        if (sortType) query = query + " ORDER BY price " + sortType;
    }

    console.log(query);

    db.query(query, (err, result) => {
        if (err) {
            req.searchResult = "Cannot find result";
            req.searchTerm = "Cannot find search term";
        }
        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.searchCategory = searchCategory;
        req.sortType = sortType;
        req.priceFilter = priceFilter;
        req.distanceFilter = distanceFilter;
        next();
    });

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
        req.distanceFilter = "";
        next();
    });
}
module.exports = router;