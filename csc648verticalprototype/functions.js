var db = require('./db');
module.exports ={
    search: 
        // General search for all users
        function (req, res, next) {
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
    },

    viewMessages: function (req, res, next) {
        let query = ` SELECT m.*, p.post_name, p.image FROM messages m, post p WHERE p.user_id = ${req.user[0].id} AND m.post_id = p.post_id `;
        db.query(query, (err, result) => {
            if (err) {
                console.log("Failed retrieve messages: " + err)
            }
            console.log("Inserted row: " + result);
            req.messageResult = result;
            next();
        });
    }
}