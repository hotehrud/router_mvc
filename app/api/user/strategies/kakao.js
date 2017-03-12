const config = require('../user.properties')['kakao'];
const KakaoStrategy = require("passport-kakao").Strategy;
const controller = require('../user.controller');

module.exports = function(passport) {
    passport.use(new KakaoStrategy({
            clientID: config.client_id,
            callbackURL: config.callback_url
        },
        function(accessToken, refreshToken, profile, done){

            const token = {};
            const properties = profile._json.properties;
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;

            const providerUserProfile = {
                username: profile.username,
                nickname: profile.displayName,
                provider: 'kakao',
                id: profile.id,
                profileImage: properties.profile_image,
                thumbnailImage: properties.thumbnail_image,
                token: token
            };

            controller.saveOAuthUserProfile(providerUserProfile, done);

        }

    ));
}
