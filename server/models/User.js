const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	name: String,
	googleId: String,
	facebookId: String,
	email: { type: String, lowercase: true },
	password: String
});

userSchema.pre('save', function(next) {
	console.log('THIS', this);
	const user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(currentPassword, callback) {
	bcrypt.compare(currentPassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}

		callback(null, isMatch);
	});
};

mongoose.model('user', userSchema);
