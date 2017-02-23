// Load jsdom, and create a window.
const jsdom = require("jsdom").jsdom;
const doc = jsdom();
const window = doc.defaultView;

const properties = require('./search.properties');

// Load jQuery with the simulated jsdom window.
$ = require('jquery')(window);

module.exports = (function() {

    const mySearch = {};
    const variables = {};

    mySearch.init = function(types) {

        const sub = {page:types['page'], sort:types['sort']};

        return mySearch.create.options(types['sns'], types['keyword'], types['type'], sub);

    }

    mySearch.create = (function() {
        const create = {};

        create.options = function(sns, keyword, type, sub) {

            variables['options'] = {};

            if (typeof(properties[sns]['headers']) != 'undefined') {
                variables['options']['headers'] = properties[sns]['headers'];
            }

            if (typeof(properties[sns][type]) == 'undefined') {
                return false;
            }

            variables['options']['url'] = properties[sns][type] + encodeURI(keyword);

            // sub Options
            if (typeof(sub['page']) != 'undefined') {
                next();
            }

            if (typeof(sub['sort']) != 'undefined') {
                sort();
            }

            function next() {
                let pageno = sub['page'];

                variables['options']['url'] += pageno < 4 ? '&pageno=' + pageno : '';
                variables['options']['url'] += '&start=' + (pageno * 10);
            }

            function sort() {
                variables['options']['url'] += '&sort=date';
            }

            return variables['options'];
        }

        return create;
    }())

    mySearch.parse = (function() {
        const parse = {};

        parse.extract = function(obj) {
            const result = obj.hasOwnProperty('channel') ? obj['channel'] : obj;

            return $.map(result, function(i,v) {

                if (typeof result[v] == 'object') {
                    return result[v];
                }

            });

        }

        return parse;
    }())

    return mySearch;

}())