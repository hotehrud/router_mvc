const model_user = require('../../models/user.js');

exports.index = (req, res) => {
    // ...

    model_user.index(function(msg, data) {
        
        if (msg == 'empty') {
            res.end('empty');
        } else {
            res.json(data);
        }
    });
};

exports.show = (req, res) => {
    // ...
};

exports.destroy = (req, res) => {
    // ...
};

exports.create = (req, res) => {
    // ...
};