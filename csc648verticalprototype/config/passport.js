//Passport used for user authentication 

const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');
const bycrypt = require('bcryptjs');

module.exports = (passport) => {
    // Local Strategy
    passport.use(new LocalStrategy(
        // Defining credentials for LocalStrategy to check for custom form parameters
        {usernameField: 'email',
         passwordField: 'password',
         passReqToCallback : true // Allows us to pass back the entire request to the callback
        }, 
            (req,email,password,done) => {
                let query = ` SELECT * FROM users WHERE email = '${email}'`
                db.query(query, (err, result) => {
                    if (err){
                        console.log("Failed to query:" + err);
                    }
                    // Try to find email
                    if (result.length == 0) {
                        return done(null, false, req.flash('danger', "Invalid email"));
                    }
                        
                    if(result[0].isAdmin) {
                        bycrypt.compare(password, result[0].admin_password, (err, isMatch) => {
                            if(err) throw err;
                                console.log(password);
                                console.log(result[0].admin_password);
                            if(isMatch){
                                console.log("Successfully logged in");
                                return done(null, result[0].id);
                            }else {
                                console.log("Failed to login");
                                return done(null, false, req.flash('danger', "Admin invalid password"));
                            }
                        });
                    }else {  
                    // Try to match hash password from database
                    bycrypt.compare(password, result[0].password, (err, isMatch) => {
                        if(err) throw err;
                            console.log(password);
                            console.log(result[0].password);
                        if(isMatch){
                            console.log("Successfully logged in");
                            return done(null, result[0].id);
                        }else {
                            console.log("Failed to login");
                            return done(null, false, req.flash('danger', "Invalid password"));
                        }
                    });
                }

                });
    }));

    // Serialize user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // Deserialize user for the session
    passport.deserializeUser(function (id, done) {
        let query = ` SELECT * FROM users WHERE id = '${id}'`;
        db.query(query, (err, result) =>{
            // Data from database is stored in the row req.user variable
            done(err, result);
        });
    });
}