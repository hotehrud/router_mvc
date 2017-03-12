const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);
const redis = require('./redis')('user');
const passport = require("passport");

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(express.static("asset"));

// Set content type GLOBALLY for any response.
app.use(function (req, res, next) {
    res.contentType('application/vnd.api+json');
    next();
});

//app.use(cookieParser('mygumi'));
app.use(session({
    store: new RedisStore({
        client: redis,
        host: 'localhost',
        port: 6379,
        prefix : "session:",
        resave: false,
        saveUninitialized: false
    }),
    secret: 'mygumi',
    cookie: { maxAge: 2592000000, secure: false } // secure - https request
}));

//set passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', require('./api/user/index.js'));

app.use('/keyword', require('./api/keyword/index.js'));

app.use('/search', require('./api/search/index.js'));

app.use('/bookmark', require('./api/bookmark/index.js'));

app.get('/', (req, res) => {
    let naver = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=NXUnBi1hGRDD0YALBt0h&redirect_uri=http://52.79.164.94:3000/user/auth/naver/callback&state=312';
    let daum = 'https://apis.daum.net/oauth2/authorize?client_id=8930561538932112719&redirect_uri=http://52.79.164.94:3000/user/auth/daum/callback&response_type=code';
    let kakao = 'https://kauth.kakao.com/oauth/authorize?client_id=b0ddc9d169e22739be7eef6dcac37fa9&redirect_uri=http://52.79.164.94:3000/user/auth/kakao/callback&response_type=code';

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ naver + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
+ "<a href='"+ daum + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
    + "<a href='"+ kakao + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
})

module.exports = app;