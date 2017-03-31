const properties = require('../search.properties')['google'];

const cheerio = require("cheerio");
var Iconv  = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

module.exports = (() => {

    const parse = {};

    parse.params = function (params) {

        let keyword = params['search_keyword'];
        let type = params['search_group'] ? params['search_group'] : 'searchTotal';
        let page = params['page'];
        let sort = params['sort'];

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
        const crawling = {};

        const $ = ( () => {
            let data = iconv.convert(body).toString();

            return cheerio.load(data, {
                withDomLvl1: true,
                normalizeWhitespace: false,
                xmlMode: false,
                decodeEntities: true
            });
        })()

        const init = ( () => {
            let type = params['search_group'] ? params['search_group'] : 'searchTotal';
            group()[type].call();
        })()

        function group () {
            return {
                searchTotal: function () {
                    $("#center_col .g").each(function () {
                        const that = $(this);
                        console.log(that.html())
                        console.log(that.find('h3[class="r"]').text());
                        console.log(that.find('span[class="st"]').text());
                        console.log(that.find('h3[class="r"]').children('a').attr('href'));
                        console.log(that.find('img').attr('src'))

                        console.log("@@")
                    });
                },
                image: function () {

                },
                news: function () {

                },
                video: function () {

                }
            }
        }
        return crawling;
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