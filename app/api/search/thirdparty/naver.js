const properties = require('../search.properties')['naver'];

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
            options['url'] = properties[type] + encodeURI(keyword);

            // sub Options
            if (typeof(page) != 'undefined') {
                next(page, options);
            }

            if (typeof(sort) != 'undefined') {
                sortRequest(options);
            }

            return {
                url: options['url']
            }
        }

        function next (pageno, options) {
            options['url'] += pageno < 4 ? '&pageno=' + pageno : '';
            options['url'] += '&start=' + (pageno * 10);
        }

        function sortRequest (options) {
            options['url'] += '&sort=date';
        }

        return {
            params: parse.params
        };

    })()

    mySearch.request = ( () => {
        const request = {};

        request.profile = function (options) {
            require('request').get(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {

                }

            });

        }

        return {
            profile: request.profile
        }
    })()

    mySearch.getHeader = () => {
        return properties['headers'];
    }

    return mySearch;

})()