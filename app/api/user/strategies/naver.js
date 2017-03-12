const config = require('../user.properties')['naver'];
const NaverStrategy = require("passport-naver").Strategy;
const controller = require('../user.controller');

module.exports = function(passport) {
    passport.use(new NaverStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.callback_url
    }, (accessToken, refreshToken, profile, done) => {

        const token = {};
        const properties = profile._json;
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;

        const providerUserProfile = {
            provider: 'naver',
            id: profile.id,
            providerData: {
                email: properties.email,
                nickname: properties.nickname,
                thumbnailImage: properties.profile_image,
                age: properties.age,
                birthday: properties.birthday
            },
            token: token
        };

        controller.saveOAuthUserProfile(providerUserProfile, done);

    }));
};