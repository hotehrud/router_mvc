const redis = require('redis');
const config = require('./config/environments')['redis'];

module.exports = (() => {
    const myRedis = {};
    const redisClient = redis.createClient(config.port,config.host);

    myRedis.init = (use) => {

        redisClient.on('error', (err) => {
            if (err) throw err;
        });

        redisClient.auth(config.password, (err) => {
            if (err) throw err;
            console.log('auth success');

            myRedis.select(use);
        });

    }

    myRedis.select = (use) => {
        redisClient.select(config[use], (err) => {
            if (err) throw err;

            console.log("database " + config[use] + " index, use " + config[use]);
        })
    }

    return myRedis.init;
})();