const passport = require("passport");

passport.serializeUser(function (user, done) {
    done();
});
passport.deserializeUser(function (id, done) {
    done();
});

require('./strategies/naver.js')(passport);

module.exports = passport;