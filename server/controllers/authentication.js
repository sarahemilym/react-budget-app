const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.signup = function(req, res, next) {
	console.log('request sign up', req.body);
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res
			.status(422)
			.send({ error: 'You must provide and email and a password' });
	}

	User.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err) {
			if (err) {
				return next(err);
			}
		});
	});
};
