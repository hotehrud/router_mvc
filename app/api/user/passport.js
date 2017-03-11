const passport = require("passport");

passport.serializeUser(function (id, done) {
    console.log("serializeUser")
    console.log(id);
    done(null, id);
});
passport.deserializeUser(function (user, done) {
    console.log("deserializeUser")
    done(null, user);
});

require('./strategies/naver.js')(passport);
require('./strategies/daum.js')(passport);

module.exports = passport;