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
var bcrypt = require('bcryptjs')


var UserSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String
	}
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
	bcrypt.compare(password, this.password, function (err, isMatch) {
		if (err) return cb(err)
		cb(null, isMatch)
	})
}
module.exports = mongoose.model('User', UserSchema)