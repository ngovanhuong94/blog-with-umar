
// This is for storing enviroment variables
require('dotenv').config();
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
// This is for logging requests made to the server
const logger = require('morgan');

//require the database connection file 
require('./api/models/db');
// this is our api routes
const apiRoutes = require('./api/routes/index');


const app = express()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
// setup static files
app.use(express.static(path.join(__dirname, 'public')))

// redirect to angular routes
app.use('*', function(req,res) {
    res.redirect('/#'+req.originalUrl)
})


app.listen(process.env.PORT || 8080, () => {
  console.log(`API SERVER AT http://localhost:${process.env.PORT || 3000}/api/`);
})