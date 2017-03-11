var express      = require('express');
var passport     = require('passport');
var DaumStrategy = require('passport-daum-oauth2').Strategy;
var session      = require('express-session');

var clientID     = 'YOUR_CLIENT_ID';
var clientSecret = 'YOUR_CLIENT_SECRET';
var callbackURL  = '/daum/callback';

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use('daum', new DaumStrategy({
    clientID    : clientID,
    clientSecret: clientSecret,
    callbackURL : callbackURL
}, function(accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		return done(null, profile);
	});
}));

var app = express();

app.use(session({secret: '!)@(#*$&%^'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
	if (req.user == undefined) {
		res.json({user: 'Not logged in. Go to "http://localhost:3000/daum"'})
	} else {
		res.json({user: req.user});	
	}	
});

app.get('/daum', passport.authenticate('daum'));

app.get('/daum/callback', function(req, res, next) {
	passport.authenticate('daum', function (err, user, info) {
		if (err) {
			return next(err);				
		}
		
		if (!user) {
			// fail to authenticate
			return res.redirect('/');
		} else {
			// succeed in authenticating
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				} else {
					return res.redirect('/');
				}
			});
		}
	})(req, res, next);
});

app.listen(3000);