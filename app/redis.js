const redis = require('redis');
const config = require('./config/environments')['redis'];

module.exports = ( () => {
    const redisClient = {
        db_0: createClient(),
        db_1: createClient(),
        db_2: createClient(),
        init: function(next) {
            const select = redis.RedisClient.prototype.select;

            require('async').parallel([
                select.bind(redisClient.db_0, 0),
                select.bind(redisClient.db_1, 1),
                select.bind(redisClient.db_2, 2)
            ], next);

        }
    }

    function createClient() {
        const client = redis.createClient(config.port, config.host);

        client.auth(config.password, (err, reply) => {
            if (err) throw err;
        });

        client.on('error', (err, reply) => {
            if (err) throw err;

            console.log("Error " + reply);
        })

        return client;
    }

    return redisClient;
})();
