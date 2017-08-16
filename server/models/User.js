const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	firstName: String,
	googleId: String
});

mongoose.model('users', userSchema);
