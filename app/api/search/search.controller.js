const Search = require('../../models')['Search'];
const Keyword = require('../../models')['Keyword'];
const search = require('./search');
const redis = require('../../redis')['db_2'];

const request = require('request');

const naver = require('./thirdparty/naver');
const daum = require('./thirdparty/daum');

exports.index = (req, res) => {
    // ...
    const result = [];

    let user = req.user;

    const params = {
        keyword: req.params.keyword,
        sns: req.query.sns,
        type: req.query.type,
        page: req.query.page,
        sort: req.query.sort
    }

    redis.hgetall(user, (err, targets) => {

        require('async').parallel([
            function (callback) {

                if (targets['naver'] == 1) {

                    request('http://localhost:3000/search/naver?' + "&keyword=" + params['keyword'] + '&type=' + params['type'] + '&page=' + params['page'] + '&sort=' + params['sort'], (error, response, body) => {
                        console.log(body)
                        if (!error && response.statusCode == 200) {
                            console.log(body);
                        }
                        callback();
                    });

                } else {
                    callback();
                }


            },
            function (callback) {

                if (targets['daum'] == 1) {

                }

                callback();
            },
            function (callback) {

                if (targets['google'] == 1) {

                }

                callback();
            },
        ], () => {

            return res.status(200).json({message: "Hello Search"});

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

                request({url:options['url'], json: {api_url: options['api_url']}, method: 'POST'}, (error, response, body) => {

                    if (!error && response.statusCode == 200) {
                        res.status(200).end(JSON.stringify(body));
                    }
                });
            }
        })

}

exports.insertNaver = (req, res) => {
    console.log("'insertNaver");
    let api_url = encodeURI(req.body.api_url);

    const options = {};

    options['url'] = api_url;
    options['headers'] = naver.getHeader();

    request(options, (error, response, body) => {

        if (!error && response.statusCode == 200) {
            res.status(200).end(JSON.stringify(body));
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