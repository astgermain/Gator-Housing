// Results page
var express = require('express');
var router = express.Router();
var db = require('../db');
var functions = require('../functions');

router.get('/', functions.search, (req, res) => {
    var searchResult = req.searchResult;
    console.log(searchResult);
    

    // Tells node to render this ejs file named index 
    res.render('index', {
        // Ejs variables being passed into index.ejs
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        searchCategory: req.query.category,
        sortType: req.query.sortType,
        priceFilter: req.query.priceFilter,
        distanceFilter: req.query.distanceFilter
    });
});


module.exports = router;