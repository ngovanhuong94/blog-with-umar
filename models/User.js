/*
 User model: 
 usernname: String,
 email: String,
 password: String

 - password need hash before model save in database
 - have a function comparePasswword to compare the password 
 from fontend with password which saved in database
 
*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')


// validate length username 3 -> 30 characters

var usernameLengthChecker = function (username) {
	if (!username) {
		return false;
	} else {
		if (username.length < 3 || username > 30) {
			return false
		} else {
			return true;
		}
	}
}

// validate alphanumeric username 

var usernameAlphaNumericChecker = function (username) {
	if (!username) {
		return false;
	} else {
		const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
		return regExp.test(username);
	}
}

// array username validators 

var usernameValidators = [
 {
 	validator: usernameLengthChecker,
 	message: 'Username must be least 3 characters but not more than 30 characters'
 },
 {
 	validator: usernameAlphaNumericChecker,
 	message: 'Username must be alphanumeric'
 }
]

// validate length username 5 -> 60 characters

var emailLengthChecker = function (email) {
	if (!email) {
		return false;
	} else {
		if (email.length < 5 || email.length > 60) {
			return false
		} else {
			return true;
		}
	}
}

// validate valid email

var emailValidChecker = function (email) {
	if (!email) {
		return false;
	} else {
		const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		return regExp.test(email);
	}
}


// array email validators

var emailValidators = [
 {
 	validator: emailLengthChecker,
 	message: 'Email must be least 5 characters but not more than 60 characters'
 },
 {
 	validator: emailValidChecker,
 	message: 'Must be a valid email'
 }
]

// validate length password

var passwordLengthChecker = (password) => {
	if (!password) {
		return false
	} else {
		if (password.length < 6 || password.length > 32) {
			return false;
		}else {
			return true;
		}
	}
}

// array password validators

var passwordValidators = [
 {
 	validator: passwordLengthChecker,
 	message: 'Password must be least 6 characters but no more than 32 characters'
 }
]
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		validate: usernameValidators
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: emailValidators
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate: passwordValidators
	},
	blogs: [
	  {
	  	type: mongoose.Schema.ObjectId,
	  	ref: 'Blog'
	  }
	]
})


UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
  	return next();
  }

  bcrypt.hash(user.password,null,null, function (err, hash) {
  	if (err) return next(err);
  	user.password = hash
  	next();
  })
})
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password); 
}
module.exports = mongoose.model('User', UserSchema)