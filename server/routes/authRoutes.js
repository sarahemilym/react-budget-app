const passport = require('passport');

module.exports = app => {
	// const requireAuth = passport.authenticate('jwt', { session: false });
	// const requireSignin = passport.authenticate('local', { session: false });

	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/dashboard',
			failureRedirect: '/login'
		})
	);

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/dahsboard'
		})
	);

	app.post(
		'/auth/login',
		passport.authenticate('local-login', { failureRedirect: '/FAIL' }),
		function(req, res) {
			res.send(req.user);
		}
	);

	app.post('/auth/signup', passport.authenticate('local-signup'), function(
		err,
		req,
		res,
		existingUser
	) {
		if (existingUser) {
			console.log('USER ALREADY EXISTS');
		}
		res.send(req.user);
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		console.log('CURRENT USER RES', req.user);
		res.send(req.user);
	});

	app.get('/', (req, res) => {
		res.send({ hi: 'there' });
	});
};
