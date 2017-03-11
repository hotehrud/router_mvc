/**
 * Module dependencies.
 */
var util               = require('util');
var OAuth2Strategy     = require('passport-oauth2').Strategy;
var InternalOAuthError = require('passport-oauth2').InternalOAuthError;
 
/**
 * `Strategy` constructor
 * 
     	'authorizationURL': 'https://apis.daum.net/oauth2/authorize',
    	'tokenURL'        : 'https://apis.daum.net/oauth2/token',
    	'profileURL'      : 'https://apis.daum.net/user/v1/show.json'

 */
function Strategy(options, verify) {
	options = options || {};
 
	options.authorizationURL = options.authorizationURL || 'https://apis.daum.net/oauth2/authorize';
	options.tokenURL         = options.tokenURL         || 'https://apis.daum.net/oauth2/token';
 	options.profileURL       = options.profileURL       || 'https://apis.daum.net/user/v1/show.json';
	
	OAuth2Strategy.call(this, options, verify);
	this.name = 'daum'; 
	this.options = options;
};
 
/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuth2Strategy);
 
/**
 * Retrieve user profile from Naver.
 */
Strategy.prototype.userProfile = function(accessToken, done) {
	this._oauth2.get(this.options.profileURL, accessToken, function(err, body, res) {
		if (err) {
			return done(err);
		} else {
			try {
				json = JSON.parse(body);

				var profile = {
					provider    : 'daum',
					id          : json.result.id,
					token       : accessToken,
					displayName : json.result.nickname,
					_raw        : body,
					_json       : json.result
				};

				return done(null, profile);
			} catch (e) {
				return done(e);
			}			
		} 
	});
};

/**
* Expose `Strategy`.
*/
module.exports = Strategy;
