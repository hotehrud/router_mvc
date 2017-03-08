const properties = require('./user.properties');

module.exports = (() => {

    const myUser = {};

    myUser.token = (args) => {
        let sns = args['state'].split('@')[0];
        const target = properties[sns];
        let url = target['token_url'];

        for(let i in target['token']) {
            let propety = target['token'][i];
            url += '&' + propety + '=';
            url += target[propety] ? target[propety] : args[propety];
        }

        return {
            url: url,
            headers: typeof (properties[sns]['headers']) == 'undefined' ? '' : properties[sns]['headers']
        }
    }

    return myUser;

})()