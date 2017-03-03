const redis = require('redis');
const config = require('./config/environments')['redis'];

module.exports = (use) => {
    const myRedis = {};
    const redisClient = redis.createClient(config.port,config.host);

    myRedis.init = (() => {

        redisClient.on('error', (err) => {
            if (err) throw err;
        });

        redisClient.auth(config.password, (err) => {
            if (err) throw err;
            console.log('auth success');

            myRedis.select(use);
        });

    })()

    myRedis.select = (use) => {
        redisClient.select(config[use], (err) => {
            if (err) throw err;

            console.log("database " + config[use] + " index, use " + config[use]);
        })
    }

    //myRedis.get = () => { redisClient }

    return redisClient;
};