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

        const sns = types['sns'].split(',');

        for (let i in sns) {
            mySearch.create.options(sns[i], types['keyword'], types['type']);
        }

        return variables['options'];
    }

    mySearch.start = function() {

    }

    mySearch.create = (function() {
        const create = {};

        create.options = function(sns, keyword, type) {

            variables['options'] = {};

            variables['options']['headers'] = properties[sns]['headers'];
            variables['options']['url'] = properties[sns][type] + encodeURI(keyword);

        }

        return create;
    }())

    return mySearch;

}())