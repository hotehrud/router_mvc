const User = require('../../models')['User'];

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

    User.findOne({
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

    User.destroy({
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

    User.create({
        member_id: id,
        member_name: name
    }).then((user_result) => res.status(201).json(user_result))

};

exports.update = (req, res) => {
    // ...

    const id = parseInt(req.params.id, 10);
    const name = req.body.member_name;

    User.update(
        { member_name: name }, /* set attributes' value */
        { where: { member_id : id }} /* where criteria */
    ).then(user => {
            if (!user) {
                return res.status(404).json({error: 'No User'});
            }

            res.status(204).send();
        });

}

exports.saveOAuthUserProfile = (profile, done) => {

    User.findOne({
        where: {
            member_provider: profile.provider,
            member_id: profile.id
        }
    })
        .then(user => {

            if (!user) {

                User.create({
                    member_provider: profile.provider,
                    member_id: profile.id,
                    setToken: profile.token
                })
                    .then(user => {
                        done(null, user.getId);
                    })
                    .catch(function (err) {
                        // handle error;
                        if (err) throw err;
                    });


            } else {
                done(null, profile.id);
            }
        })

}