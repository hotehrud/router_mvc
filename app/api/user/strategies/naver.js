const config = require('../user.properties')['naver'];
const NaverStrategy = require("passport-naver").Strategy;
const controller = require('../user.controller');

module.exports = function(passport) {
    passport.use(new NaverStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.callback_url
    }, (accessToken, refreshToken, profile, done) => {

        controller.saveOAuthUserProfile(JSON.stringify(profile), done);

    }));
};