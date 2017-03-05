const models = require('../../models');
const redis = require('../../redis')('keyword');

exports.index = (req, res) => {
    return res.status(200).json({message: "Hello Keyword"});
}

exports.show = (req, res) => {
    let keyword = req.params.keyword;

    models.Keyword.findOne({
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

    models.Keyword.findAll({
        offset: pageno,
        limit: 10
    })
        .then(result => {

            return result.length ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

        })
}

exports.rank = (req, res) => {
    let pageno = req.query.pageno ? req.query.pageno * 10 : 0;

    models.Keyword.findAll({
        order: 'keyword_count DESC',
        offset: pageno,
        limit: 10
    })
        .then(result => {

            return result.length ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

        })
}

exports.create = (req, res) => {
    let keyword = req.body.keyword_name;

    redis.get(keyword, (err, reply) => {
        if (err) throw err;

        reply ? redis.set(keyword, ++reply) : redis.set(keyword, 1);
    })

    return res.status(204).end();
}