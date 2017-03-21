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

exports.create = (req, res) => {
    let keyword = req.body.keyword;
    let group = req.body.group;
    let provider = req.body.provider;

    Keyword.upsert({
        keyword_name: keyword,
        keyword_group: group,
        keyword_provider: provider
    })

    return res.status(204).end();
}

exports.count = (req, res) => {
    let keyword = req.body.keyword_name;
    let group = req.body.keyword_group.split(',');

    for (let i in group) {
        let key = keyword + '&' + group[i];

        redis.get(key, (err, reply) => {
            if (err) throw err;

            reply ? redis.set(key, ++reply) : redis.set(key, 1);
        })
    }

    return res.status(204).end();
}