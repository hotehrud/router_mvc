# Passport-Daum-Oauth2

[Passport](http://passportjs.org/) strategies for authenticating with [Daum](http://www.daum.net/) using OAuth 2.0.

This module lets you authenticate using Daum in your Node.js applications. By plugging into Passport, Daum authentication can be easily and unobtrusively integrated into any application or framework that supports [Connect](http://www.senchalabs.org/connect/)-style middleware, including [Express](http://expressjs.com/).

## Install

    $ npm install passport-daum-oauth2

## Usage of OAuth 2.0

#### Configure Strategy

The Daum OAuth 2.0 authentication strategy authenticates users using a Daum account and OAuth 2.0 tokens. The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as `options` specifying a client ID, client secret, and callback URL.

```Javascript
var DaumStrategy = require('passport-daum-oauth2').Strategy;

passport.use('daum', new DaumStrategy({
        clientID: DAUM_CLIENT_ID_ISSUED_BY_DAUM
        clientSecret: DAUM_CLIENT_SECRET_ISSUED_BY_DAUM
        callbackURL: YOUR_CALLBACK_URL_AFTER_AUTHENTICATION
	},
    function(accessToken, refreshToken, profile, done) {
    	// check profile._raw or profile.json for whole profile data

    	User.findOrCreate({daumId: profile.id}, function(err, user) {
    		return done(err, user);
		});
    }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'daum'` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/) application:

```Javascript
app.get('/daum'), passport.authenticate('daum'));

app.get('/daum/callback', passport.authenticate('daum', { failureRedirect: '/login'}), 
	function(req, res) {
		// successful authentication, redirect to home
		res.redirect('/');
	}
);
```

## Examples

For a complete working example, refer to 'examples' directory.
	
## Author

  - [Myungcheol Doo](http://github.com/myungcheol)
  
## License

[The MIT License](http://opensource.org/licenses/MIT)
