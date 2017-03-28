const redis = require('../../redis')['db_2'];
const check = require('./check');

exports.init = (req, res) => {
    let user = req.body.user;

    if (!user) {
        return res.status(401).json({msg: 'You need login'});
    }

    const targets = check.init();

    redis.set(user, targets);

    return res.status(200).json({'msg': 'store in redis, success'});
}

exports.findAndUpdate = (req, res) => {
    let user = req.user;
    let provider = req.params.provider;
    let type = req.query.type;

    if (!type) {
        return res.status(400).json({msg: 'Invalid parameter'});
    }

    if (!user) {
        return res.status(401).json({msg: 'You need login'});
    }

    redis.get(user, (err, reply) => {
        const obj = JSON.parse(reply);

        if (typeof(obj[provider][type]) == 'undefined') {
            return res.status(400).json({'msg': 'invalid parameter about ' + type});
        }

        obj[provider][type] = obj[provider][type] == 1 ? 0 : 1;

        redis.set(user, JSON.stringify(obj), (err, reply) => {
            if (err) throw err;
        });

        return res.status(204).end();

    })

}