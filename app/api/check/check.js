const properties = require('./check.properties');

module.exports = (() => {
    const myCheck = {};

    myCheck.init = () => {
        const result = {};

        for(let provider in properties) {
            result[provider] = {};
            const types = properties[provider]['types'];

            for(let provider in properties) {
                result[provider] = {};
                const types = properties[provider]['types'];

                types.forEach( (v) => {
                    result[provider][v] = 0;
                })

            }

        }
        return JSON.stringify(result);
    }

    return myCheck;

})()
