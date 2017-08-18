const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const keys = require('./config/keys');
const app = express();
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// May change and use JWT
app.use(
	cookieSession({
		maxAge: 2 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log('app is listening on port ' + PORT);
});
