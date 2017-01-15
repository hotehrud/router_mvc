const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/environments');
const db = require('./db');

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(express.static("asset"));

app.get('/', (req, res) => {
    return res.json("dssd");
});
app.use('/users', require('./api/user/index.js'));

app.listen(config.port, () => {
    console.log('Example app listening on port ' + config.port);

    require('./models').sequelize.sync({force: false})
        .then(() => {
            console.log('Databases sync');
        });
});

module.exports = app;