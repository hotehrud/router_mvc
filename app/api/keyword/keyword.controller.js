const models = require('../../models');
const redis = require('../../redis')['db_1'];

const Keyword = models['Keyword'];

exports.index = (req, res) => {
    return res.status(200).json({message: "Hello Keyword"});
}

exports.show = (req, res) => {
    let keyword = req.params.keyword;

    Keyword.findOne({
        where: {
            keyword_name: keyword
        }
    })
        .then(result => {

            return result ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

        });
}

exports.list = (req, res) => {
    let pageno = req.query.pageno ? req.query.pageno * 10 : 0;

    Keyword.findAll({
        offset: pageno,
        limit: 10
    })
        .then(result => {

            return result.length ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

        })
}

exports.rank = (req, res) => {
    let pageno = req.query.pageno ? req.query.pageno * 10 : 0;

    Keyword.findAll({
        order: 'keyword_count DESC',
        offset: pageno,
        limit: 10
    })
        .then(result => {

            return result.length ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

        })
}

exports.createOrIncrease = (req, res) => {
    let keyword = req.body.search_keyword;
    let group = req.body.search_group;
    let provider = req.body.setProvider;

    // redis key => keyword + group + provider
    let key = keyword + '&' + group + '&' + provider;

    redis.hgetall(key, (err, reply) => {
        if (err) throw err;

        if (reply) {
            redis.hmset(key, {count:++reply.count, provider:provider});
        } else {
            redis.hmset(key, {count:1, provider:provider});
        }

    })

    return res.status(204).end();
}