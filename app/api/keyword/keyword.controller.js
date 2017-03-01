const models = require('../../models');

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

exports.create = (req, res) => {
    return res.status(200).json(req.body);
}