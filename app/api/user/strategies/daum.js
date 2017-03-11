const config = require('../user.properties')['daum'];
const DaumStrategy = require("passport-daum-oauth2").Strategy;
const controller = require('../user.controller');

module.exports = function(passport) {
    passport.use(new DaumStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.callback_url
    }, (accessToken, refreshToken, profile, done) => {

        controller.saveOAuthUserProfile(profile, done);

    }));
};