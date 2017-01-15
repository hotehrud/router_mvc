const model_user = require('../../models/user.js');
const models = require('../../models');

exports.index = (req, res) => {
    // ...

    models.User.findAll()
        .then(users => res.json(users));

};

exports.show = (req, res) => {
    // ...

    const id = parseInt(req.params.id, 10);

    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
    }

    models.User.findOne({
        where: {
            member_id: id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({error: 'No User'});
        }

        return res.json(user);
    });

};

exports.destroy = (req, res) => {
    // ...

    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
    }

    model_user.destory(id, function(msg) {
        if (msg === 'empty') {
            return res.status(404).json({error: 'Unknown user'});
        } else {
            return res.status(204).send();
        }
    });

};

exports.create = (req, res) => {
    // ...

    const id = req.body.member_id;
    const name = req.body.member_name;

    models.User.create({
        member_id: id,
        member_name: name
    }).then((user_result) => res.status(201).json(user_result))

};