const models = require('../../models');
const search = require('./search');
const redis = require('../../redis')('search');

exports.index = (req, res) => {
    // ...
    let user = req.user;

    redis.hgetall(user, (err, targets) => {
        console.log(targets)
    });

    return res.status(200).json({message: "Hello Search"});
};

exports.show = (req, res) => {
    // ...
    const params = {
        keyword: req.params.keyword,
        sns: req.query.sns,
        type: req.query.type,
        page: req.query.page,
        sort: req.query.sort
    }
    let keyword = params['keyword'];
    let group = params['type'];

    if (typeof(params['sns']) == 'undefined' || typeof(params['type']) == 'undefined') {
        return res.status(404).json({error: 'Incorrect Parameters'});
    }

    // Get - If keyword is exist in DB
    models.Keyword.findOne({
        where: {
            keyword_name: keyword,
            keyword_group: group
        }
    })
        .then(instance => {

            if (instance) {

                models.Search.findAll({
                    where: {
                        search_keyword: keyword,
                        search_group: group
                    }
                })
                    .then(search => {
                        if (!search) {
                            return res.status(500).json({error: 'Database Error'});
                        }

                        return res.status(200).end(JSON.stringify(search));
                    });
            } else {
                const request = require('request');
                const options = search.init(params);

                if (!options) {
                    return res.status(404).json({error: 'Incorrect Path'});
                }

                // Request - Open API
                request.get(options, (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});

                        // Parse - Return Value in Open API
                        const items = search.parse.extract(JSON.parse(body), params['sns']);

                        if (typeof items == 'object') {

                            // Get - Sync database
                            const promises = items.map( (item) => {

                                return models.Search.create({
                                    search_keyword: keyword,
                                    search_group: params['type'],
                                    search_title: item['title'],
                                    search_link: item['link'],
                                    search_desc: item['desc'],
                                    search_author: item['author'],
                                    search_image: item['image'],
                                    search_date: item['date']
                                })
                                    .catch( (err) => {
                                        //console.log(err)
                                        return Promise.reject();
                                    });
                            });

                            Promise.all(promises)
                                .then( () => {

                                    models.Search.findAll({
                                        where: {
                                            search_keyword: keyword
                                        }
                                    })
                                        .then(search => {
                                            if (!search) {
                                                return res.status(404).json({error: 'Incorrect Keyword'});
                                            }

                                            // Keyword Insert
                                            models.Keyword.create({
                                                keyword_name: keyword,
                                                keyword_count: 1,
                                                keyword_group: group
                                            }).catch(function (err) {
                                                // handle error;
                                                if (err) throw err;
                                            });

                                            return res.status(200).end(JSON.stringify(search));
                                        });
                                })
                                .catch( (err) => {
                                    console.log(err)
                                    return res.status(500).json({error: err});
                                })

                        } else {
                            res.status(500).json({error: 'Inner Error'});
                        }

                    } else {
                        res.status(response.statusCode).end();
                    }
                });
            }
        })

};

exports.create = (req, res) => {

}