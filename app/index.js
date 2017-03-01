const express = require('express');
const bodyParser = require('body-parser');

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

app.use('/user', require('./api/user/index.js'));

app.use('/keyword', require('./api/keyword/index.js'));

app.use('/search', require('./api/search/index.js'));

module.exports = app;