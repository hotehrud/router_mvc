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

        return mySearch.create.options(types['sns'], types['keyword'], types['type']);

    }

    mySearch.create = (function() {
        const create = {};

        create.options = function(sns, keyword, type) {

            variables['options'] = {};

            if (typeof(properties[sns]['headers']) != 'undefined') {
                variables['options']['headers'] = properties[sns]['headers'];
            }

            if (typeof(properties[sns][type]) == 'undefined') {
                return false;
            }

            variables['options']['url'] = properties[sns][type] + encodeURI(keyword);

            return variables['options'];
        }

        return create;
    }())

    return mySearch;

}())