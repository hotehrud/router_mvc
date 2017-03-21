const properties = require('../search.properties')['daum'];

module.exports = (() => {

    const mySearch = {};

    mySearch.parse = ( () => {

        const parse = {};

        parse.params = function (params) {

            let keyword = params['keyword'];
            let type = params['type'];
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
            if (page != 'undefined') {
                next(page, options);
            }

            if (sort != 'undefined') {
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
            options['url'] += pageno < 4 ? '&pageno=' + pageno : '';
            options['url'] += '&start=' + (pageno * 10);
        }

        function sortRequest (options) {
            options['url'] += '&sort=date';
        }

        return {
            params: parse.params,
            custermizing: parse.rename
        };

    })()

    return mySearch;

})()