// Need to be authenticated to view user dashboard
module.exports ={
    ensureAuthenticated : (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('danger', 'Please log in to access the dashboard');
        res.redirect('/login');
    }
}
    