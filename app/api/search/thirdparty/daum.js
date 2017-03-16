const properties = require('../search.properties')['daum'];

module.exports = (() => {

    const mySearch = {};

    mySearch.parse = (function () {

        const parse = {};

        parse.setting = function (params, callback) {

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
                sort(options);
            }

            if (typeof (callback) == 'function') {
                callback(options);
            }

        }

        function next (pageno, options) {
            options['url'] += pageno < 4 ? '&pageno=' + pageno : '';
            options['url'] += '&start=' + (pageno * 10);
        }

        function sort (options) {
            options['url'] += '&sort=date';
        }

        return {
            params: parse.setting
        };

    })()

    return mySearch;

})()