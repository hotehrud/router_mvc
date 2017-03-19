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

    //mySearch.parse = (() => {
    //    const parse = {};
    //
    //    parse.extract = (obj, sns) => {
    //        const items = obj.hasOwnProperty('channel') ? obj['channel'] : obj;
    //        let name;
    //
    //        for (let v in items) {
    //            if (typeof items[v] == 'object') {
    //                name = v;
    //                break;
    //            }
    //        }
    //
    //        return parse.rename.getter(items[name], sns);
    //    }
    //
    //    parse.rename = (() => {
    //
    //        const company = {
    //            naver : (items) => create(items, properties['naver']['property']),
    //            daum : (items) => create(items, properties['daum']['property'])
    //        }
    //
    //        const create = (items, propertys) => {
    //
    //            // Object Property name Customizing
    //            return items.map( (item) => {
    //                return (() => {
    //                    const obj = {};
    //
    //                    Object.keys(item).forEach( (key) => {
    //                        propertys.hasOwnProperty(key) ? obj[propertys[key]] = item[key] : obj[key] = item[key]
    //                    })
    //
    //                    return obj;
    //                })()
    //            })
    //
    //        }
    //
    //        const get = (items, sns) => {
    //            return company[sns].call(null, items);
    //        }
    //
    //        return {
    //            getter : get
    //        }
    //
    //    })()
    //
    //    return parse;
    //})();

    mySearch.getHeader = () => {
        return properties['headers'];
    }

    return mySearch;

})()