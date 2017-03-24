const passport = require('passport');
const request = require('request');

const redis = require('../../redis')['db_2'];

passport.serializeUser(function (id, done) {
    console.log("serializeUser" + id);

    done(null, id);
});
passport.deserializeUser(function (user, done) {
    console.log("deserializeUser")

    done(null, user);
});

require('./strategies/naver.js')(passport);
require('./strategies/daum.js')(passport);
require('./strategies/kakao.js')(passport);

module.exports = passport;