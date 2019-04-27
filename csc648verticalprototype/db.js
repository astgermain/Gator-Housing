const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'team12db.ccdqjwmvzqxn.us-west-1.rds.amazonaws.com',
    user: 'team12',
    password: 'Team12%!',
    database: 'db_gator_housing_v1'
});

database.connect((err) => {
    if(err) console.log(err);
    else console.log('Connected to database!');
    database.query('USE db_gator_housing_v1');
});

module.exports = database;