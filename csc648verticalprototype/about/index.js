var express = require('express');
var router = express.Router();

var app = express();
app.set('view engine', 'ejs');

router.get('/', (req, res) => {
        // Tells node to render this ejs file named index 
        res.render('sunny', {
            // Ejs variables being passed into index.ejs
        results: 0,
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        distanceFilter: ""
        });
    });


    router.get('/andrew', (req, res) => {
        // Tells node to render this ejs file named index 
        res.render('andrew', {
            // Ejs variables being passed into index.ejs
        results: 0,
        searchTerm: "",
        searchResult: "",
        searchCategory: "",
        sortType: "",
        priceFilter: "",
        bedFilter: "",
        bathFilter: ""
        });
    });
    
    router.get('/david', (req, res) => {
        // Tells node to render this ejs file named index 
        res.render('david', {
            // Ejs variables being passed into index.ejs
            results: 0,
            searchTerm: "",
            searchResult: "",
            searchCategory: "",
            sortType: "",
            priceFilter: "",
            bedFilter: "",
            bathFilter: ""
        });
    });
    
    router.get('/peter', (req, res) => {
        // Tells node to render this ejs file named index 
        res.render('peter', {
            // Ejs variables being passed into index.ejs
            results: 0,
            searchTerm: "",
            searchResult: "",
            searchCategory: "",
            sortType: "",
            priceFilter: "",
            bedFilter: "",
            bathFilter: ""
        });
    });
    
    router.get('/sagar', (req, res) => {
        // Tells node to render this ejs file named index 
        res.render('sagar', {
            // Ejs variables being passed into index.ejs
            results: 0,
            searchTerm: "",
            searchResult: "",
            searchCategory: "",
            sortType: "",
            priceFilter: "",
            bedFilter: "",
            bathFilter: ""
        });
    });
    
    
    router.get('/steven', (req, res) => {
        // Tells node to render this ejs file named index 
        res.render('steven', {
            // Ejs variables being passed into index.ejs
            results: 0,
            searchTerm: "",
            searchResult: "",
            searchCategory: "",
            sortType: "",
            priceFilter: "",
            bedFilter: "",
            bathFilter: ""
        });
    });
    
    

    router.get('/sunny', (req, res) => {
        // Tells node to render this ejs file named index 
        res.render('sunny', {
            // Ejs variables being passed into index.ejs
            results: 0,
            searchTerm: "",
            searchResult: "",
            searchCategory: "",
            sortType: "",
            priceFilter: "",
            bedFilter: "",
            bathFilter: ""
        });
    });
    
router.get('/zolboo', (req, res) => {
    // Tells node to render this ejs file named index 
    res.render('zolboo', {
        // Ejs variables being passed into index.ejs
        results: 0,
            searchTerm: "",
            searchResult: "",
            searchCategory: "",
            sortType: "",
            priceFilter: "",
            bedFilter: "",
            bathFilter: ""
    });
});

module.exports = router;
