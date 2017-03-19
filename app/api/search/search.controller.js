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
            return res.status(200).end(JSON.parse(result.naver));

        });

    });

}

exports.getNaver = (req, res) => {
    console.log('getNaver')
    let keyword = req.query.keyword;
    let group = req.query.type;

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

                request({url:options['url'], json: {api_url: options['api_url'],keyword: keyword, group: group}, method: 'POST'}, (error, response, body) => {

                    if (!error && response.statusCode == 200) {
                        return res.status(200).end(JSON.stringify(get()));
                    }

                });
            } else {
                return res.status(200).end(JSON.stringify(get()));
            }
        })

    function get() {
        // DB access
    }
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

                models.Search.create({
                    search_keyword: keyword,
                    search_group: group,
                    setProviderData: item
                }).then( result => {
                    callback();
                }).catch( (err) => {
                    if (err) throw err;
                })

            }, (err) => {
                return res.status(200).end();
            });

        }

    });
}

exports.getDaum = (req, res) => {

}

exports.insertDaum = (req, res) => {

}

exports.getGoogle = (req, res) => {

}

exports.insertGoogle = (req, res) => {

}