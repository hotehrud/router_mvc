const properties = require('./search.properties');

module.exports = (() => {

    const mySearch = {};
    const variables = {};

    mySearch.init = (types) => {

        const sub = {page:types['page'], sort:types['sort']};

        return mySearch.create.options(types['sns'], types['keyword'], types['type'], sub);

    }

    mySearch.create = (() => {
        const create = {};

        create.options = (sns, keyword, type, sub) => {

            variables['options'] = {};

            if (typeof(properties[sns]['headers']) != 'undefined') {
                variables['options']['headers'] = properties[sns]['headers'];
            }

            variables['options']['url'] = properties[sns][type] + encodeURI(keyword);

            // sub Options
            if (typeof(sub['page']) != 'undefined') {
                next(sub);
            }

            if (typeof(sub['sort']) != 'undefined') {
                sort();
            }

            return variables['options'];
        }

        const next = (sub) => {
            let pageno = sub['page'];

            variables['options']['url'] += pageno < 4 ? '&pageno=' + pageno : '';
            variables['options']['url'] += '&start=' + (pageno * 10);
        }

        const sort = () => {
            variables['options']['url'] += '&sort=date';
        }

        return create;
    })();

    mySearch.parse = (() => {
        const parse = {};

        parse.extract = (obj, sns) => {
            const items = obj.hasOwnProperty('channel') ? obj['channel'] : obj;
            let name;

            for (let v in items) {
                if (typeof items[v] == 'object') {
                    name = v;
                    break;
                }
            }

            return parse.rename.getter(items[name], sns);
        }

        parse.rename = (() => {

            const company = {
                naver : (items) => create(items, properties['naver']['property']),
                daum : (items) => create(items, properties['daum']['property'])
            }

            const create = (items, propertys) => {

                // Object Property name Customizing
                return items.map( (item) => {
                    return (() => {
                        const obj = {};

                        Object.keys(item).forEach( (key) => {
                            propertys.hasOwnProperty(key) ? obj[propertys[key]] = item[key] : obj[key] = item[key]
                        })

                        return obj;
                    })()
                })

            }

            const get = (items, sns) => {
                return company[sns].call(null, items);
            }

            return {
                getter : get
            }

        })()

        return parse;
    })();

    return mySearch;

})();