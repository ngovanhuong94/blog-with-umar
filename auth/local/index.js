var express = require('express');
var passport = require('passport');
var router = express.Router();
var jwt = require('jsonwebtoken');


router.post('/', function (req,res,next) {
	console.log(req.body)
	passport.authenticate('local', function (err, user, info) {
		var error = err || info;
		if (error) {
			return res.status(401).json(err);
		}
		if (!user) {
			return res.status(404).json({ message: 'Something went wrong . Please try again'})
		}
		var token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
		return res.json({ token: token })
	})(req,res,next)
})

module.exports = router;