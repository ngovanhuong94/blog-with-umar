/*
 User model: 
 name: String,
 email: String,
 password: String

 - password need hash before model save in database
 - have a function comparePasswword to compare the password 
 from fontend with password which saved in database
 
*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')


var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String
	},
	blogs: [
	  {
	  	type: mongoose.Schema.ObjectId,
	  	ref: 'Blog'
	  }
	]
})

UserSchema.pre('save', function (next) {
	var user = this

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, function (err, salt){
		if (err) return next (err)
		 bcrypt.hash(user.password, salt, function (err, hash) {
		 	if (err) return next(err)
		 		user.password = hash
		 	    next()
		 })
	})

})

UserSchema.methods.comparePassword = function (password, cb) {
	return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model('User', UserSchema)