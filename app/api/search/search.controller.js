const models = require('../../models');
const Search = models['Search'];
const Keyword = models['Keyword'];

const search = require('./search');
const redis = require('../../redis')['db_2'];

const request = require('request');
const async = require('async');

const naver = require('./thirdparty/naver');
const daum = require('./thirdparty/daum');

exports.index = (req, res) => {
    // ...
    let user = req.user;

    const params = {
        keyword: encodeURI(req.params.keyword),
        sns: req.query.sns,
        type: req.query.type,
        page: req.query.page,
        sort: req.query.sort
    }

    redis.hgetall(user, (err, targets) => {

        async.parallel({
            naver: function (callback) {

                if (targets['naver'] == 1) {

                    request('http://localhost:3000/search/naver?' + "&keyword=" + params['keyword'] + '&type=' + params['type'] + '&page=' + params['page'] + '&sort=' + params['sort'], (error, response, result) => {

                        if (!error && response.statusCode == 200) {

                        }
                        callback(null, result);
                    });

                } else {
                    callback(null, 'fail');
                }


            },
            daum: function (callback) {

                if (targets['daum'] == 1) {

                }

                callback();
            },
            google: function (callback) {

                if (targets['google'] == 1) {

                }

                callback();
            }
        }, (err, result) => {
            //console.log(result.naver)
            return res.status(200).json(JSON.parse(result.naver));

        });

    });

}

exports.getNaver = (req, res) => {
    console.log('getNaver')
    let keyword = req.query.keyword;
    let group = req.query.type;

    // Update scheduled (use count)
    Keyword.findOne({
        where: {
            keyword_name: keyword,
            keyword_group: group
        }
    })
        .then(instance => {
            if (!instance) {
                const options = {};
                const params = {
                    keyword: keyword,
                    type: group,
                    page: req.query.page,
                    sort: req.query.sort
                }

                options['url'] = 'http://localhost:3000/search/naver';
                options['api_url'] = naver.parse.params(params)['url'];

                // Insert search API, new contents about keyword
                request({url:options['url'], json: {api_url: options['api_url'],keyword: keyword, group: group}, method: 'POST'}, (error, response) => {

                    if (!error && response.statusCode == 204) {
                        return get(keyword, group, parse, res);
                    }

                });
            } else {
                return get(keyword, group, parse, res);
            }
        })

}

exports.insertNaver = (req, res) => {
    let api_url = encodeURI(req.body.api_url);
    let keyword = req.body.keyword;
    let group = req.body.group;

    const options = {};

    options['url'] = api_url;
    options['headers'] = naver.getHeader();

    // Get - Request Open API
    request(options, (error, response, body) => {

        if (!error && response.statusCode == 200) {

            // property rename - Return Value in Open API
            const items = naver.parse.custermizing(JSON.parse(body));

            // Insert DB
            async.forEach(items, (item, callback) => {

                Search.upsert({
                    search_keyword: keyword,
                    search_group: group,
                    search_naver: 'Y',
                    setProviderData: item
                }).then( result => {
                    callback();
                }).catch( (err) => {
                    if (err) throw err;
                })

            }, (err) => {
                if (err) throw err;

                // keyword insert
                request({url:'http://localhost:3000/keyword', json: {keyword: keyword, group: group, provider: 'naver'}, method: 'POST'}, (error, response) => {
                    if (!error && response.statusCode == 204) {
                        // .....
                        console.log('keyword insert suceess');
                    }
                });

                return res.status(204).end();
            });

        }

    });
}

exports.getDaum = (req, res) => {
    console.log('getDaum')
    let keyword = req.query.keyword;
    let group = req.query.type;

    // Update scheduled (use count)
    Keyword.findOne({
        where: {
            keyword_name: keyword,
            keyword_group: group
        }
    })
        .then(instance => {
            if (!instance) {
                const options = {};
                const params = {
                    keyword: keyword,
                    type: group,
                    page: req.query.page,
                    sort: req.query.sort
                }

                options['url'] = 'http://localhost:3000/search/daum';
                options['api_url'] = daum.parse.params(params)['url'];

                // Insert search API, new contents about keyword
                request({url:options['url'], json: {api_url: options['api_url'],keyword: keyword, group: group}, method: 'POST'}, (error, response) => {

                    if (!error && response.statusCode == 204) {
                        return get(keyword, group, parse, res);
                    }

                });
            } else {
                return get(keyword, group, parse, res);
            }
        })

}

exports.insertDaum = (req, res) => {
    let api_url = encodeURI(req.body.api_url);
    let keyword = req.body.keyword;
    let group = req.body.group;

    const options = {};

    options['url'] = api_url;
    options['headers'] = naver.getHeader();

    // Get - Request Open API
    request(options, (error, response, body) => {

        if (!error && response.statusCode == 200) {

            // property rename - Return Value in Open API
            const items = naver.parse.custermizing(JSON.parse(body));

            // Insert DB
            async.forEach(items, (item, callback) => {

                Search.upsert({
                    search_keyword: keyword,
                    search_group: group,
                    setProviderData: item,
                    search_daum: 'Y'
                }).then( result => {
                    callback();
                }).catch( (err) => {
                    if (err) throw err;
                })

            }, (err) => {
                if (err) throw err;

                // keyword insert
                request({url:'http://localhost:3000/keyword', json: {keyword: keyword, group: group, provider: 'daum'}, method: 'POST'}, (error, response) => {
                    if (!error && response.statusCode == 204) {
                        // .....
                        console.log('keyword insert suceess');
                    }
                });

                return res.status(204).end();
            });

        }

    });
}

exports.getGoogle = (req, res) => {

}

exports.insertGoogle = (req, res) => {

}

function get(keyword, group, callback, res) {
    // DB access
    Search.findAll({
        where: {
            search_keyword: keyword,
            search_group: group
        }
    })
        .then(result => {
            callback(result, res);
        })
        .catch(err => {
            if (err) throw err;
        })
}

function parse(datas, res) {
    // return values of database convert for json type
    const result = datas.map((data) => {
        return data['dataValues'];
    })

    res.status(200).end(JSON.stringify(result));
}