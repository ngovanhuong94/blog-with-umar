
// This is for storing enviroment variables
require('dotenv').config();
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// This is for logging requests made to the server
const logger = require('morgan');

//require the database connection file 
const DBURI = process.env.DBURI;

mongoose.connect(DBURI);
mongoose.connection.on('connected', ()=> {
  console.log('Connected to ', DBURI);

});

mongoose.connection.on('error', (error)=> {
  console.error(error);
});


mongoose.connection.on('disconnected', ()=> {
  console.log('Disconnected from ', DBURI);
})


const app = express()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(passport.initialize());
// setup static files
app.use(express.static(path.join(__dirname, 'public')))


require('./routes')(app)


app.listen(process.env.PORT || 8080, () => {
  console.log(`API SERVER AT http://localhost:${process.env.PORT || 8080}/api/`);
})

module.exports = app;