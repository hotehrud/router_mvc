
var parse = require('./profile').parse
  , uri = require('url')
  , crypto = require('crypto')
  , util = require('util')
  , XML = require('xtraverse')
  , OAuthStrategy = require('passport-oauth1')
  , InternalOAuthError = require('passport-oauth1').InternalOAuthError
  , APIError = require('./errors/apierror');



function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'https://apis.daum.net/oauth/requestToken';
  options.accessTokenURL = options.accessTokenURL || 'https://apis.daum.net/oauth/accessToken';
  options.userAuthorizationURL = options.userAuthorizationURL || 'https://apis.daum.net/oauth/authorize';
  options.sessionKey = options.sessionKey || 'oauth:daum';
  
  OAuthStrategy.call(this, options, verify);
  this.name = 'daum';
  this._userProfileURL = options.userProfileURL || 'https://apis.daum.net';
  this._skipExtendedUserProfile = (options.skipExtendedUserProfile !== undefined) ? options.skipExtendedUserProfile : false;
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);


/**
 * Authenticate request by delegating to Daum using OAuth.
 *
 * @param {Object} req
 * @api protected
 */
 var oauth_verifier;
Strategy.prototype.authenticate = function(req, options) {
  if (req.query && req.query.denied) {
    return this.fail();
  }
  
  var self = this;
    if (req.query && req.query['oauth_token']) {
       
         var oauth_token = req.query['oauth_token'];
         oauth_verifier = req.query['oauth_verifier'];
        
    }
    
  // Call the base class for standard OAuth authentication.
  OAuthStrategy.prototype.authenticate.call(this, req, options);
};

Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
    
    if (!this._skipExtendedUserProfile) {
    var json;
    
        this._oauth.get(this._userProfileURL + '/profile/show.json' , token, tokenSecret, function (err, body, res) {
          if (err) {
          }
          try {
            json = JSON.parse(body);
          } catch (ex) {
            return done(new Error('Failed to parse user profile'));
          }
             var profile = parse(json);
              profile.provider = 'daum';
              profile._raw = body;
              profile._json = json;
              profile.id = json.user.id;
              profile.nickname = json.user.nickname;
              
              done(null, profile);
        });
    }
    
};



Strategy.prototype.userAuthorizationParams = function(options) {
  var params = {};
  if (options.forceLogin) {
    params.force_login = options.forceLogin;
  }
  if (options.screenName) {
    params.screen_name = options.screenName;
  }
  return params;
};


Strategy.prototype.parseErrorResponse = function(body, status) {
  var xml = XML(body)
    , msg = xml.children('error').t();
  return new Error(msg || body);
};

module.exports = Strategy;
