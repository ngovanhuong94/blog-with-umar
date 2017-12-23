var router = require('express').Router();
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var Auth = require('./auth.service')



router.post('/register', function (req,res,next) {
	if (!req.body.username) {
		return res.json({ success: false, message: 'You must enter username'})
	} else {
		if (!req.body.password) {
			return res.json({ success: false, message: 'You must enter password'});
		} else {
			if (!req.body.email) {
				return res.json({ success: false, message: 'You must enter email'})
			} else {
				var user = new User({
					username: req.body.username,
					email: req.body.email,
					password: req.body.password
				})

				user.save(function (err) {
					if (err) {
						if (err.code === 11000) {
							return res.json({ success: false, message: 'Username or Email already exist'})
						}  else {
							if (err.errors) {
								if (err.errors.email) {
									return res.json({ success: false, message: err.errors.email.message})
								} else if (err.errors.username) {
									return res.json({ success: false, message: err.errors.username.message})
								} else if (err.errors.password) {
									return res.json({ success: false, message: err.errors.password.message})
								}
							} else {
								return res.json({ success: false, message: 'Could not save user. Error !'})
							}
						}
					} else {
						return res.json({ success: true, message: 'Account registered'})
					}
				})
			}
		}
	}
})


router.post('/login', function (req, res, next) {

	if(!req.body.email) {
		return res.json({ success: false, message: 'You must enter username'})
	} else {
		if (!req.body.password) {
			return res.json({ success: false, message: 'You must enter password'})
		} else {
			var {email, password} = req.body;
			User.findOne({ email: email}).exec(function (err, user) {
				if (err) {
					return res.json({ success: false, message: 'Something went wrong . Please try again !'})
				} else {
					if (!user) {
						return res.json({ success: false, message: 'Email or password was incorrect'})
					} else {
						var validPassword = user.comparePassword(password);
						if (!validPassword) {
							return res.json({ success: false, message: 'Email or password was incorrect'})
						} else {
							var token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '24h'})
							return res.json({ success: true, message: 'Success', token: token, username: user.username})
						}
					}
				}
			})
		}
	}
})

router.get('/profile', Auth.isAuthenticated(), function (req,res,next) {
	console.log(req.user);
})

module.exports = router;


