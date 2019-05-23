const url = require('url');
const page = url.pathname;
const express = require('express');
const path = require('path');
const adminPage = require('./admin');
const userPage = require('./user');
const aboutPage = require('./about');
const registrationPage = require('./routes/registration');
const loginPage = require('./routes/login');
const message = require('./routes/message');
const postPage = require('./routes/post');
const resultsPage = require('./routes/results');
const homePage = require('./routes/home');
const bodyParser = require('body-parser');
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

// Global variable to be set if someone logs in
app.use((req,res,next) => {
    if (req.user != null){
        app.locals.user = req.user;
    } else {
        app.locals.user = null;
    }
    next();
});

// Routes
app.use('/admin', adminPage);
app.use('/userdash', userPage);
app.use('/about', aboutPage);
app.use('/registration', registrationPage);
app.use('/login', loginPage);
app.use('/post', postPage);
app.use('/message', message);
app.use('/results', resultsPage);
app.use('/', homePage);





app.listen(port, () => console.log(`Example app listening on port ${port}!`));



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


