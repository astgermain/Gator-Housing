// Post page
var express = require('express');
var router = express.Router();
var db = require('./db');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Public folder
router.use(express.static('./public'));

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
    res.render('dummyPost', {
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


// Processing user post data; need to move to user folder
router.post('/', userPost, (req, res) => {
    // Need to do input validation here
    console.log("Posting");
    // USING DUMMY POST EJS, CHANGE LATER
    res.render('dummyPost', {
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

// For registered user to be able to post; need to move to user folder
function userPost(req, res) {
    

    if (req.user != undefined) {
        upload(req, res, (err) => {
            if (err) {
                req.flash('danger', err);
                res.render('dummyPost', {
                    // Ejs variables being passed into index.ejs
                    results: 0,
                    searchTerm: "",
                    searchResult: "",
                    searchCategory: "",
                    sortType: "",
                    priceFilter: "",
                    distanceFilter: ""
                });
            } else {
                if (req.file == undefined) {
                    req.flash('danger', 'Error: No File Selected!');
                    res.render('dummyPost', {
                        // Ejs variables being passed into index.ejs
                        results: 0,
                        searchTerm: "",
                        searchResult: "",
                        searchCategory: "",
                        sortType: "",
                        priceFilter: "",
                        distanceFilter: ""
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
                    var image = req.file.filename;

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
                }
            }
        });

    } else {
        req.flash('danger', "Please login to post");
        res.redirect('/login');
    }

    }


module.exports = router;