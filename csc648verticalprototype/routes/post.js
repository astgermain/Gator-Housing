// Post page
var express = require('express');
var router = express.Router();
var db = require('../db');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

// Middleware
router.use(expressValidator());
router.use(bodyParser.urlencoded({extended: true})); 

// Public folder
router.use(express.static('../public'));

// Set storage engine
const storage = multer.diskStorage({
    destination:'./public/img/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + 
        // Sets the extension from the uploaded file to this new filepath i.e. jpg will stay jpg
        path.extname(file.originalname));
    }
});
// Init upload 
const upload = multer({
    //Directs the file upload to the /public/uploads folder
    storage: storage,
    // Limit file size to 10MB
    limits: {fileSize: 10*1024*1024},
    fileFilter: function(req, file, cb){
        checkFileType(req, file, cb);
    }
    // Single image upload and retrieves the name tag attribute from EJS
}).single('image');


//Check file type
function checkFileType(req, file, cb){
    // Allowed extensions
    const fileTypes = /jpeg|jpg|png/;
    // Check file extension
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimeType = file.mimetype.startsWith('image/');

    if(mimeType && extname){
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

router.get('/', (req, res) => {
    // USING DUMMY POST EJS, CHANGE LATER
    res.render('post', {
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


// Processing user post data; need to move to user folder
router.post('/', checkUpload, checkPost, (req, res) => {
    // Need to do input validation here
    console.log("Posting");
    // USING DUMMY POST EJS, CHANGE LATER
    res.render('post', {
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

// For registered user to be able to post; need to move to user folder
function checkUpload(req, res, next) {
    if (req.user != undefined) {
        upload(req, res, (err) => {
            if (err) {
                req.flash('danger', err);
                res.render('post', {
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
            } else {
                if (req.file == undefined) {
                    req.flash('danger', 'Error: No File Selected!');
                    res.render('post', {
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
                } else {
                    next();
                    
                }
            }
        });

    } else {
        req.flash('danger', "Please login to post");
        res.redirect('/login');
    }

}

function checkPost(req, res, next) {
    // Need validations for each.
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
    req.checkBody('title').not().isEmpty().withMessage("Title cannot be empty")
                          .matches(/^[-/?!,&+\w\s]*$/).withMessage("Alphanumeric Characters Only")                      
    req.checkBody('price').not().isEmpty().isNumeric({no_symbols: true}).withMessage("Numbers only") 
    req.checkBody('beds').not().isEmpty().withMessage("Beds Selection Required") 
    req.checkBody('baths').not().isEmpty().withMessage("Baths Selection Required") 
    req.checkBody('category').not().isEmpty().withMessage("Category Selection Required")
    req.checkBody('location').not().isEmpty().withMessage("Street Address Required")
                             .matches(/^[-@./#?!,&+\w\s]*$/).withMessage("Alphanumeric Characters Only") 

    req.checkBody('city').not().isEmpty().withMessage("City Required")
                        .matches(/^[-@./#?!,&+\w\s]*$/).withMessage("Alpha Characters Only") 

    req.checkBody('state').not().isEmpty().withMessage("State Required")
                            .matches(/^[-@./#?!,&+\w\s]*$/).withMessage("Alphanumeric Characters Only")
                            
    req.checkBody('phone').not().isEmpty().withMessage("Phone Required") 
                            .isMobilePhone().withMessage("Invalid Phone Number")

    req.checkBody('email').not().isEmpty().withMessage("Email cannot be empty") 
                            .isEmail().withMessage("Invalid Email");

    req.checkBody('description').not().isEmpty().withMessage("Description required")   
                                .matches(/^[-@./#?!,&+\w\s]*$/).withMessage("Alphanumeric Characters Only") 
                                
    const errors = req.validationErrors();
    if (errors) {
        res.render('post', {
            errors: errors,
            results: 0,
            searchTerm: "",
            searchResult: "",
            searchCategory: "",
            sortType: "",
            priceFilter: "",
            bedFilter: "",
            bathFilter: ""
        });

    } else {
        // Need validations for each.
        var id = req.user[0].id;
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
        // Image validation already done.
        var image = req.file.filename;
        
        console.log(location);
        // Handle upload to database.
        console.log("post user id is: " + id);
        let query = ` INSERT INTO post (post_name, price, beds, baths, category, user_id, location, city, state, phone, email, description, image)
                       VALUES('${postName}', '${price}', '${beds}', '${baths}', '${category}', '${id}', '${location}', '${city}', '${state}', '${phone}', 
                              '${email}', '${description}', '${image}') `;

        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                console.log("Failed to insert into post table: " + err)
            }
            console.log("Inserted row: " + result);

        });
        req.flash('success', "Successfully submitted a post! Please wait at least 24 hours to give us a chance to review your post!")
        res.redirect('/');
        next();
    }

}


module.exports = router;
