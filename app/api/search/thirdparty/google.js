const properties = require('../search.properties')['google'];

module.exports = (() => {

    const mySearch = {};

    mySearch.parse = ( () => {

        const parse = {};

        parse.params = function (params) {

            let keyword = params['keyword'];
            let type = params['type'] ? params['type'] : 'searchTotal';
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
            custermizing: parse.rename
        };

    })()

    return mySearch;

})()