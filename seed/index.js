/*
Here is seed on server
Remove all data in database and load data default 
*/
// This is for storing enviroment variables
require('dotenv').config();
var mongoose = require('mongoose');

const DBURI = process.env.DBURI;
mongoose.connect(DBURI);

mongoose.connection.on('connected', ()=> {
  console.log('Connected to ', DBURI);

});

mongoose.connection.on('error', (err)=> {
  console.error(error);
});


mongoose.connection.on('disconnected', ()=> {
  console.log('Disconnected from ', DBURI);
})

//user model
var User = require('../api/user/user.model')
//user default data
var usersData = require('./users.json')

// Before each test we empty the database
User.remove({}, function (err) {
	if (err) throw err;
	console.log("deleted all users in database")

	// add default users to database
	usersData.forEach(data => {
		var user = new User({
			email: data.email,
			password: data.password,
			name: data.name
		})

		user.save(function (err) {
			if (err) throw err;
			console.log("Added a user to database")
		})
	})
})
