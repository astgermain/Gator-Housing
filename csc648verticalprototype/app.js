var url = require('url');
var page = url.pathname;
const mysql = require('mysql');
var express = require('express');
var path = require('path');
var database = require('./db')
var adminPage = require('./admin');
var userPage = require('./user');


var app = express();
var port = 3000;
app.set('view engine', 'ejs');


app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/admin', adminPage);
app.use('/userdash', userPage);

app.get('/',search, (req, res) => {
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

app.get('/andrew',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('andrew', {
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

app.get('/david',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('david', {
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

app.get('/peter',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('peter', {
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

app.get('/sagar',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('sagar', {
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


app.get('/steven',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('steven', {
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

app.get('/sunny',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('sunny', {
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

app.get('/zolboo',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('zolboo', {
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

app.get('/post',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('posting', {
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


app.get('/results',search, (req, res) => {
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
	
app.get('/login',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('login', {
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

app.get('/registration',search, (req, res) => {
var searchResult = req.searchResult;
    console.log(searchResult);
    // Tells node to render this ejs file named index 
    res.render('registration', {
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





app.post('/userPost',userPost, (req, res) => {
    console.log("Posting");
   
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function search (req, res, next) {
    // User's search term
    var searchTerm = req.query.search;
    var searchCategory = req.query.category;
	var sortType = req.query.sortType;
    var priceFilter = req.query.priceFilter;
    var distanceFilter = req.query.distanceFilter;
    let query = null;
    
	{
        query = 'SELECT * FROM post';
		
		 if (searchTerm)
        {
            query = query + " WHERE (post_name LIKE '%" + searchTerm +"%'" + " OR location LIKE '%" + searchTerm +"%'"
            + " OR price LIKE '%" + searchTerm +"%'" + " OR category LIKE '%" + searchTerm +"%'" + " OR distance LIKE '%" 
            + searchTerm + "%')";

            if (priceFilter) query = query + " AND price <= '" + priceFilter +"'";

            if (searchCategory) query = query + " AND category = '" + searchCategory + "'";

            if (distanceFilter) query = query + " AND distance <= '" + distanceFilter + "'";           
        }
        else if (priceFilter || searchCategory || distanceFilter){
            query = query + ' WHERE';

            if (priceFilter){
                query = query + " price <= '" + priceFilter +"'";

                if (searchCategory) query = query + " AND category = '" + searchCategory + "'";

                if (distanceFilter) query = query + " AND distance <= '" + distanceFilter + "'";
            }
            else if (searchCategory){
                query = query + " category = '" + searchCategory + "'";

                if (distanceFilter) query = query + " AND distance <= '" + distanceFilter + "'";
            }
            else query = query + " distance <= '" + distanceFilter + "'";

        }
        if(sortType) query = query + " ORDER BY price " + sortType;
    }
	
	console.log(query);

    database.query(query, (err, result) => {
        if (err){
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
		req.sortType = sortType;
        req.priceFilter = priceFilter;
        req.distanceFilter = distanceFilter;
        next();
    });
}

app.get('/img/silhouette.jpeg',function(req,res){
	res.sendFile(__dirname + '/img/silhouette.jpeg');
});

app.get('/img/peter.jpg',function(req,res){
	res.sendFile(__dirname + '/img/peter.jpg');
});

app.get('/img/sunny.png',function(req,res){
	res.sendFile(__dirname + '/img/sunny.png');
});

app.get('/img/david.jpg',function(req,res){
	res.sendFile(__dirname + '/img/david.jpg');
});

app.get('/img/andrew.png',function(req,res){
	res.sendFile(__dirname + '/img/andrew.png');
});

app.get('/img/zolboo.jpg',function(req,res){
	res.sendFile(__dirname + '/img/zolboo.jpg');
});

app.get('/img/sagar.png',function(req,res){
	res.sendFile(__dirname + '/img/sagar.png');
});


function userPost(req, res)
{
    var postName = req.body.title;
    var price = req.body.price;
    var beds = req.body.beds;
    var baths = req.body.baths;
    var category = req.body.category;
    var location = req.body.location;
    var city = req.body.city;
    var state = req.body.state;
    var phone = req.body.phone;
    var email = req.body.email;
    var description = req.body.description;
    var image = req.body.image;


    let query = ` INSERT INTO post (post_name, price, beds, baths, category, location, city, state, phone, email, description, image)
                VALUES('${postName}', '${price}', '${beds}', '${baths}', '${category}', '${location}', '${city}', '${state}', '${phone}', 
                    '${email}', '${description}', '${image}') `;

    console.log(query);
    database.query(query, (err, result) => {
        if (err){
            console.log("Failed to insert into post table: " + err)
        }
        console.log("Inserted row: " + result);
        res.redirect('/');
    });
    
}









