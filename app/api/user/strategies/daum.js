const config = require('../user.properties')['daum'];
const DaumStrategy = require("passport-daum-oauth2").Strategy;
const controller = require('../user.controller');

module.exports = function(passport) {
    passport.use(new DaumStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.callback_url
    }, (accessToken, refreshToken, profile, done) => {

        const token = {};
        const properties = profile._json;
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;

        const providerUserProfile = {
            provider: 'daum',
            id: profile.id,
            providerData: {
                nickname: properties.nickname,
                profileImage: properties.bigImagePath,
                thumbnailImage: properties.imagePath
            },
            token: token
        };

        controller.saveOAuthUserProfile(providerUserProfile, done);

    }));
};