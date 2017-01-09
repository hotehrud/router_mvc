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

    const id = parseInt(req.params.id, 10);

    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
    } else {
        model_user.show(id, function(msg, data) {

            if (msg == 'empty') {
                res.end('empty');
            } else {
                res.json(data);
            }
        });
    }
};

exports.destroy = (req, res) => {
    // ...
};

exports.create = (req, res) => {
    // ...
};