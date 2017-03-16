const redis = require('redis');
const config = require('./config/environments')['redis'];

module.exports = ( () => {
    const redisClient = {
        db_0: redis.createClient(config.port, config.host),
        db_1: redis.createClient(config.port, config.host),
        db_2: redis.createClient(config.port, config.host),
        init: function(next) {
            advanced();

            const select = redis.RedisClient.prototype.select;
            require('async').parallel([
                select.bind(redisClient.db_0, 0),
                select.bind(redisClient.db_1, 1),
                select.bind(redisClient.db_2, 2)
            ], next);
        }
    }

    function advanced() {
        const databases = ['db_0', 'db_1', 'db_2'];

        for(let i in databases) {
            redisClient[databases[i]].on('error', (err) => {
                if (err) throw err;

                console.log(i + ' on');
            })

            redisClient[databases[i]].auth(config.password, (err) => {
                if (err) throw err;

                console.log('auth success');
            })
        }
    }

    return redisClient;
})();
