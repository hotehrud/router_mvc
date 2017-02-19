const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(express.static("asset"));

app.use('/users', require('./api/user/index.js'));

app.use('/search', require('./api/search/index.js'));

module.exports = app;