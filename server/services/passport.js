const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
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
		},
		async (accessToken, refreshToken, profile, cb) => {
			const existingUser = await User.findOne({ facebookId: profile.id });
			if (existingUser) {
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

const localLogin = new LocalStrategy({ usernameField: 'email' }, function(
	email,
	password,
	done
) {
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				console.log('THEY DO NOT MATCH');
				return done(null, false);
			}
			console.log('THEY MATCH');
			return done(null, user);
		});
	});
});

passport.use(localLogin);
