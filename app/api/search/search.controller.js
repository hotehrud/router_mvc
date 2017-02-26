const models = require('../../models');
const config = require('../../config/environments')['api'];
const search = require('./search');


exports.index = (req, res) => {
    // ...
    res.send("Hello Search");
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

    // Get - If keyword is exist in DB
    models.Keyword.findOne({
        where: {
            keyword_content: params['keyword']
        }
    }).then(keyword => {
        if (keyword) {
            return res.json(keyword);
        }
    });

    const request = require('request');
    const options = search.init(params);

    if (!options) {
        return res.status(404).json({error: 'Incorrect Path'});
    }

    // Request - Open API
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});

            // Parse - Return Value in Open API
            const items = search.parse.extract(JSON.parse(body), params['sns']);

            if (typeof items == 'object') {

                // Get - Sync database
                const promises = items.map(function(item) {
                    return models.Search.create({
                        search_keyword: params['keyword'],
                        search_group: params['type'],
                        search_title: item['title'],
                        search_link: item['link'],
                        search_desc: item['desc'],
                        search_author: item['author'],
                        search_image: item['image'],
                        search_data: item['data']
                    })
                        .catch(function(err) {
                            return Promise.reject();
                        });
                });

                Promise.all(promises)
                    .then(function() {

                        models.Search.findAll({
                            where: {
                                search_keyword: params['keyword']
                            }
                        })
                            .then(search => {
                                if (!search) {
                                    return res.status(404).json({error: 'Incorrect Keyword'});
                                }
                                return res.end(JSON.stringify(search));
                            });
                    })
                    .catch(function(err){
                        return res.status(500).json({error: err});
                    })

            } else {
                res.status(500).json({error: 'Inner Error'});
            }

        } else {
            res.status(response.statusCode).end();
        }
    });

};