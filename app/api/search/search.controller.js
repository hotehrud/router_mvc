const models = require('../../models');
const Search = models['Search'];

const redis = require('../../redis')['db_2'];

const request = require('request');
const async = require('async');

const naver = require('./thirdparty/naver');
const daum = require('./thirdparty/daum');

exports.init = (req, res) => {
    // ...
    let user = req.user;

    const params = {
        keyword: encodeURI(req.params.keyword),
        sns: req.query.sns,
        page: req.query.page,
        sort: req.query.sort
    }

    if (!user) {
        return res.status(401).json({msg: 'You need login'});
    }

    redis.get(user, (err, reply) => {
        const obj = JSON.parse(reply);
        const naver = obj['naver'];
        const daum = obj['daum'];
        const google = obj['google'];

        const resultArray = [];

        // Use parallel + forEach of Async-process, For inner property of provider
        async.parallel({
            naver: function (done) {
                async.forEach(Object.keys(naver), function (key, callback){
                    console.log(key)
                    let value = naver[key];

                    if (value == 1) {
                        console.log('naver ' + key + ' ' + value)
                        request('http://localhost:3000/search/naver?' + "&keyword=" + params['keyword'] + '&type=' + key + '&page=' + params['page'] + '&sort=' + params['sort'], (error, response, result) => {

                            resultArray.push(JSON.parse(result));
                            callback();

                        });

                    } else {
                        callback(null, 'fail');
                    }

                }, function (err) {
                    done();
                });
            },
            daum: function(done) {
                async.forEach(Object.keys(daum), function (key, callback){
                    let value = daum[key];

                    if (value == 1) {

                        request('http://localhost:3000/search/daum?' + "&keyword=" + params['keyword'] + '&type=' + key + '&page=' + params['page'] + '&sort=' + params['sort'], (error, response, result) => {

                            resultArray.push(JSON.parse(result));
                            callback();

                        });

                    } else {
                        callback(null, 'fail');
                    }

                }, function (err) {
                    done();
                });
            },
            google: function(done) {
                async.forEach(Object.keys(google), function (key, callback){
                    callback(null, 'fail');

                }, function (err) {

                    //resultArray.push(result);
                    done();
                });
            }
        }, (err) => {
            const output = [];

            for (let i in resultArray) {

                for (let p in resultArray[i]) {

                    if (typeof(resultArray[i][p]) == 'object') {
                        output.push(resultArray[i][p]);
                    }

                }

            }

            return res.status(200).json(output);

        });

    })

}

exports.getNaver = (req, res) => {
    let keyword = req.query.keyword;
    let group = req.query.type;

    // Update scheduled (use count)
    Search.count({
        where: {
            search_keyword: keyword,
            search_group: group,
            search_provider: 'naver'
        }
    })
        .then(cnt => {
            const params = {
                keyword: keyword,
                type: group,
                page: req.query.page == 'undefined' ? 0 : req.query.page,
                sort: req.query.sort,
                provider: 'naver'
            }

            if (!cnt || params['page'] * 10 >= cnt) {
                const options = {};

                options['url'] = 'http://localhost:3000/search/naver';
                options['api_url'] = naver.parse.params(params)['url'];

                // Insert search API, new contents about keyword
                request({url:options['url'], json: {api_url: options['api_url'],keyword: keyword, group: group}, method: 'POST'}, (error, response) => {

                    if (!error && response.statusCode == 204) {
                        return get(params, parse, res);
                    }

                });
            } else {
                return get(params, parse, res);
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
                    setProvider: 'naver',
                    setProviderData: item
                }).then( result => {
                    callback();
                }).catch( (err) => {
                    if (err) throw err;
                })

            }, (err) => {
                if (err) throw err;

                // keyword insert
                request({url:'http://localhost:3000/keyword/create', json: {keyword: keyword, group: group, provider: 'naver'}, method: 'POST'}, (error, response) => {
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
    let keyword = req.query.keyword;
    let group = req.query.type;

    Search.count({
        where: {
            search_keyword: keyword,
            search_group: group,
            search_provider: 'daum'
        }
    })
        .then(cnt => {
            const params = {
                keyword: keyword,
                type: group,
                page: req.query.page == 'undefined' ? 0 : req.query.page,
                sort: req.query.sort,
                provider: 'daum'
            }

            if (!cnt || params['page'] * 10 >= cnt) {
                const options = {};

                options['url'] = 'http://localhost:3000/search/daum';
                options['api_url'] = daum.parse.params(params)['url'];

                // Daum API pageno excess
                if (options['api_url'] == 'invalid') {
                    return res.status(400).end('Invalid Argument');
                }

                // Insert search API, new contents about keyword
                request({url:options['url'], json: {api_url: options['api_url'],keyword: keyword, group: group}, method: 'POST'}, (error, response) => {

                    if (!error && response.statusCode == 204) {
                        return get(params, parse, res);
                    }

                });
            } else {
                return get(params, parse, res);
            }
        })

}

exports.insertDaum = (req, res) => {
    let api_url = encodeURI(req.body.api_url);
    let keyword = req.body.keyword;
    let group = req.body.group;

    const options = {};

    options['url'] = api_url;

    // Get - Request Open API
    request(options, (error, response, body) => {

        if (!error && response.statusCode == 200) {

            // property rename - Return Value in Open API
            const items = daum.parse.custermizing(JSON.parse(body));

            // Insert DB
            async.forEach(items, (item, callback) => {

                Search.upsert({
                    search_keyword: keyword,
                    search_group: group,
                    setProvider: 'daum',
                    setProviderData: item
                }).then( datas => {
                    callback();
                }).catch( (err) => {
                    if (err) throw err;
                })

            }, (err) => {
                if (err) throw err;

                // keyword insert
                request({url:'http://localhost:3000/keyword/create', json: {keyword: keyword, group: group, provider: 'daum'}, method: 'POST'}, (error, response) => {
                    if (!error && response.statusCode == 204) {
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

function get(datas, callback, res) {
    let keyword = datas['keyword'];
    let group = datas['type'];
    let provider = datas['provider'];
    let pageno = (typeof(datas['page']) == 'undefined' || datas['page'] == 0 || datas['page'] == 1)
        ? 0
        : (datas['page'] - 1) * 10;

    // DB access
    Search.findAll({
        where: {
            search_keyword: keyword,
            search_group: group,
            search_provider: provider
        },
        offset: pageno,
        limit: 10
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

    if (typeof(res) == 'undefined') {
        return result;
    }

    if (result.length == 0) {
        return res.status(200).json({msg: 'empty'});
    }

    return res.status(200).end(JSON.stringify(result));
}