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

app.get('/', (req, res) => {
    let api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=NXUnBi1hGRDD0YALBt0h&redirect_uri=http://52.79.164.94:3000/user/auth/naver/callback&state=312';
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
})

module.exports = app;