var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../../api/user/user.model');




passport.use(new LocalStrategy({ usernameField: 'email'}, function (email, password, done) {
	User.findOne({ email: email}, (err, user) => {
		if (err) {
			return done(err);
		} else {
			if (!user) {
				return done(null, false, { message: 'This email is not registed' })
			} else {
				var validPassword = user.comparePassword(password);
				if (!validPassword) {
					return done(null, false, { message: 'Password is not correctly'})
				} else {
					return done(null, user);
				}
			}
		}
	})
}))