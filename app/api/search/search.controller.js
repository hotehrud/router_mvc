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

    // DB에 키워드가 존재하면 DB 데이터 리턴
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

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});

            const items = search.parse.extract(JSON.parse(body), params['sns']);
console.log(items);
            //if (typeof items == 'object') {
            //    items.map((item) => {
            //        console.log(item);
            //        //models.Search.create({
            //        //    search_keyword: params['keyword'],
            //        //    search_group: item
            //        //}).then((result) => res.status(201).json(result))
            //    })
            //}

            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });

};