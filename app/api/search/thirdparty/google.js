const properties = require('../search.properties')['google'];

const cheerio = require("cheerio");
var Iconv  = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

module.exports = (() => {

    const parse = {};

    parse.params = function (params) {

        let keyword = params['search_keyword'];
        let type = params['search_group'];
        let page = params['page'];
        let sort = params['sort'];

        if (typeof(properties[type]) == 'undefined') {
            return {
                url: {
                    msg: 'invalid type of parameter'
                }
            };
        }

        const options = {
            sub: {
                page: page,
                sort: sort
            }
        }

        options['keyword'] = keyword;
        options['type'] = type;
        options['url'] = properties[type] + keyword;

        // sub Options
        if (page > 1) {
            if (!next(page, options)) {
                return {
                    url: 'invalid'
                };
            }
        }

        if (sort == 'date') {
            sortRequest(options);
        }

        return {
            url: options['url']
        }
    }

    parse.crawling = function (body, params) {

        const $ = ( () => {
            let data = iconv.convert(body).toString();

            return cheerio.load(data, {
                withDomLvl1: true,
                normalizeWhitespace: false,
                xmlMode: false,
                decodeEntities: true
            });
        })()

        function group () {
            return {
                searchTotal: function () {
                    return $("#center_col .g").map(function () {
                        const datas = {};
                        const that = $(this);

                        datas['title'] = that.find('h3[class="r"]').text();
                        datas['desc'] = that.find('span[class="st"]').text();
                        datas['link'] = ( () => {
                            let link = that.find('h3[class="r"]').children('a').attr('href');
                            return link.substring(link.indexOf('q=') + 2);
                        })()
                        datas['image'] = that.find('img').attr('src');

                        return datas;
                    }).get();
                },
                image: function () {

                },
                news: function () {

                },
                video: function () {

                }
            }
        }
        return ( () => {
            let type = params['search_group'];

            return group()[type].call();
        })()
    }

    parse.rename = function (obj) {
        const items = obj.channel['item'];
        const property = properties['property'];

        return items.map( (item) => {
            return (() => {
                const renewal = {};

                Object.keys(item).forEach( (key) => {

                    property.hasOwnProperty(key)
                        ? renewal[property[key]] = item[key]
                        : renewal[key] = item[key]

                })

                return renewal;
            })()
        })
    }

    function next (pageno, options) {
        return options['url'] += '&pageno=' + pageno;
    }

    function sortRequest (options) {
        // ...
    }

    return {
        params: parse.params,
        custermizing: parse.crawling
    };

})()