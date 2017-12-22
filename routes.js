
module.exports = function (app) {
 


 app.use('/auth', require('./auth/index'));
 app.use('/api/users', require('./api/user'));
// redirect to angular routes

app.use('*', function(req,res) {
    res.redirect('/#'+req.originalUrl)
})


}