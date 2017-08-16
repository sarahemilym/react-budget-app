const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	name: String,
	googleId: String,
	facebookId: String
});

mongoose.model('users', userSchema);
