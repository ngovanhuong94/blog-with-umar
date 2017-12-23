var passport  = require('passport');
var User = require('../models/User');
var expressJwt  = require('express-jwt');
var validateJwt = expressJwt({
	secret: process.env.JWT_SECRET
})
var jwt  = require('jsonwebtoken');
var compose = require('composable-middleware')

function isAuthenticated(req,res,next) {
	return compose()
	.use(function (req,res,next) {
		console.log(req.headers.Authorization);
		validateJwt(req,res,next);
	})
	.use(function (req,res,next) {
		req.user._id
		User.findOne({_id: req.user._id}, function (err, user) {
			if (err) {
				return next(err);
			} else {
				if (!user) {
					return res.status(401).end();
				} else {
					req.user = user;
					next();
				}
			}
		})
	})
}

function signToken (id) {
	return jwt.sign({_id: id}, process.env.JWT_SECRET, { expiresIn: '24h'})
}



exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;