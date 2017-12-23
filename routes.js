
module.exports = function (app) {
 


app.use('/auth', require('./auth/index'));
// redirect to angular routes

app.use('*', function(req,res) {
    res.redirect('/#'+req.originalUrl)
})


}