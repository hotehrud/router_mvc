const models = require('../../models');
const config = require('../../config/environments')['api'];
const search = require('./search');


exports.index = (req, res) => {
    // ...
    res.send("Hello Search");
};

exports.show = (req, res) => {
    // ...
    const types = {
        keyword: req.params.keyword,
        sns: req.query.sns,
        type: req.query.type,
        page: req.query.page,
        sort: req.query.sort
    }

    const request = require('request');
    const options = search.init(types);

    if (!options) {
        res.sendStatus(404);
    }

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });

};