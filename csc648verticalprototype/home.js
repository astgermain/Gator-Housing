// Results page
var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', search, (req, res) => {
    var searchResult = req.searchResult;
    console.log(searchResult);
    console.log(req.session);
    if(req.session.passport != undefined)console.log(req.user);
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

module.exports = router;