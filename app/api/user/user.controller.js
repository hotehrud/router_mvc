const models = require('../../models');
const user = require('./user');

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

    models.User.destroy({
        where: {
            member_id: id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({error: 'No User'});
        }
        res.status(204).send()
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

exports.update = (req, res) => {
    // ...

    const id = parseInt(req.params.id, 10);
    const name = req.body.member_name;

    models.User.update(
        { member_name: name }, /* set attributes' value */
        { where: { member_id : id }} /* where criteria */
    ).then(user => {
        if (!user) {
            return res.status(404).json({error: 'No User'});
        }

        res.status(204).send();
    });

}

exports.callback = (req, res) => {
    const params = {
        code: req.query.code,
        state: req.query.state
    }

    const request = require('request');
    const options = user.token(params)

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
}