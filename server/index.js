const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log('app is listening on port ' + PORT);
});
