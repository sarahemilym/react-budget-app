const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientId,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}

			const user = await new User({
				name: profile.name.givenName + ' ' + profile.name.familyName,
				googleId: profile.id
			}).save();
			done(null, user);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientId,
			clientSecret: keys.facebookClientSecret,
			callbackURL: '/auth/facebook/callback',
			proxy: true
			// passReqToCallback: true
		},
		async (accessToken, refreshToken, profile, cb) => {
			console.log('profile', profile);
			const existingUser = await User.findOne({ facebookId: profile.id });
			console.log('HERE AFTER ID');
			if (existingUser) {
				existingUser.token = tokenForUser.tokenForUser(existingUser);
				console.log('FIRST TOKENNN', existingUser.token);
				return cb(null, existingUser);
			}

			const user = await new User({
				name: profile.displayName,
				facebookId: profile.id
			}).save();
			cb(err, user);
		}
	)
);

//  Passport strategy for email/password

const localLogin = new LocalStrategy(
	{ usernameField: 'email', proxy: true },
	function(email, password, done) {
		User.findOne({ email: email }, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}

			user.comparePassword(password, function(err, isMatch) {
				console.log('HERE CHECKING PASSWORD', user);
				if (err) {
					console.log('ERROR IN PASSWORD');
					return done(err);
				}
				if (!isMatch) {
					console.log('NO PASSWORD');
					return done(null, false, { message: 'Incorrect password' });
				}
				console.log('HERE FINISHED', user);
				return done(null, user);
			});
		});
	}
);

const localSignup = new LocalStrategy(
	{ usernameField: 'email', proxy: true, passReqToCallback: true },
	function(req, email, password, done) {
		User.findOne({ email: email }, function(err, user) {
			if (user) {
				console.log(user);
				return done(null, false, { message: 'User already exists' });
			}
			if (!user) {
				const user = new User({
					name: req.body.name,
					email: email,
					password: password
				});

				user.save(function(err) {
					if (err) {
						return next(err);
					}

					user.comparePassword(password, function(err, isMatch) {
						console.log('HERE CHECKING PASSWORD', user);
						if (err) {
							console.log('ERROR IN PASSWORD');
							return done(err);
						}
						if (!isMatch) {
							console.log('NO PASSWORD');
							return done(null, false, {
								message: 'Incorrect password'
							});
						}
						console.log('HERE FINISHED', user);
						return done(null, user);
					});
				});
			}
		});
	}
);

passport.use('local-login', localLogin);
passport.use('local-signup', localSignup);
