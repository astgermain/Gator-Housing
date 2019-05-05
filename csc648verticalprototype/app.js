const url = require('url');
const page = url.pathname;
const mysql = require('mysql');
const express = require('express');
const path = require('path');
const database = require('./db')
const adminPage = require('./admin');
const userPage = require('./user');
const aboutPage = require('./about');
const registrationPage = require('./registration');
const loginPage = require('./login');
const postPage = require('./post');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const passport = require('passport');
const session = require('express-session');

// Passport config file
require('./config/passport')(passport)

var app = express();
var port = 3000;
app.set('view engine', 'ejs');
app.set('views', [__dirname + '/views', __dirname + '/about/views']);

// Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true})); 

// For displaying messages on success or error to user
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Routes
app.use('/admin', adminPage);
app.use('/userdash', userPage);
app.use('/about', aboutPage);
app.use('/registration', registrationPage);
app.use('/login', loginPage);
app.use('/post', postPage);

app.get('/', search, (req, res) => {
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

// Results page
app.get('/results', search, (req, res) => {
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
        searchCategory: req.query.category,
        sortType: req.query.sortType,
        priceFilter: req.query.priceFilter,
        distanceFilter: req.query.distanceFilter
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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

    database.query(query, (err, result) => {
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
    database.query(query, (err, result) => {
        if (err) {
            req.post_id = "Cannot find post ID.";
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

app.get('/img/silhouette.jpeg', function (req, res) {
    res.sendFile(__dirname + '/img/silhouette.jpeg');
});

app.get('/img/peter.jpg', function (req, res) {
    res.sendFile(__dirname + '/img/peter.jpg');
});

app.get('/img/sunny.png', function (req, res) {
    res.sendFile(__dirname + '/img/sunny.png');
});

app.get('/img/david.jpg', function (req, res) {
    res.sendFile(__dirname + '/img/david.jpg');
});

app.get('/img/andrew.png', function (req, res) {
    res.sendFile(__dirname + '/img/andrew.png');
});

app.get('/img/zolboo.jpg', function (req, res) {
    res.sendFile(__dirname + '/img/zolboo.jpg');
});

app.get('/img/sagar.png', function (req, res) {
    res.sendFile(__dirname + '/img/sagar.png');
});


