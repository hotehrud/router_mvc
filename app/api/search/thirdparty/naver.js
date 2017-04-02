const properties = require('../search.properties')['naver'];

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
                next(page, options);
            }

            if (sort == 'date') {
                sortRequest(options);
            }

            return {
                url: options['url']
            }
        }

        parse.rename = function (obj) {
            const items = obj['items'];
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
            // 1 ~ 1000
            options['url'] += '&start=' + (pageno * 10 + 1);
        }

        function sortRequest (options) {
            options['url'] += '&sort=date';
        }

        return {
            params: parse.params,
            custermizing: parse.rename,
            getHeader: () => properties['headers']
        };

})()