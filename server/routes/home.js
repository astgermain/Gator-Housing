// Results page
var express = require('express');
var router = express.Router();
var db = require('../db');
var functions = require('../functions');

router.get('/', functions.search, (req, res) => {
    var searchResult = req.searchResult;
    console.log(searchResult);
    var livePosts = 0;
    for (let i = 0; i < searchResult.length; i++ ){
        if (searchResult[i].isLive == 1)
        livePosts +=1;
    }

    // Tells node to render this ejs file named index 
    res.render('index', {
        // Ejs variables being passed into index.ejs
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


module.exports = router;