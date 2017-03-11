const config = require('../user.properties')['kakao'];
const KakaoStrategy = require("passport-kakao").Strategy;
const controller = require('../user.controller');

module.exports = function(passport) {
    passport.use(new KakaoStrategy({
            clientID: config.client_id,
            callbackURL: config.callback_url
        },
        function(accessToken, refreshToken, profile, done){

            controller.saveOAuthUserProfile(profile, done);

        }

    ));
}
