const environments = {
    development: {
        host: "222.239.249.154",
        port: "3000",
        mysql: {
            username: 'mvc',
            password: 'mvc',
            database: 'mvc'
        },
        redis: {
            password: "redis",
            host: "localhost",
            port: 6379
        }
    },

    test: {
        host: "222.239.249.154",
        port: "4000",
        mysql: {
            username: 'mvc',
            password: 'mvc',
            database: 'mvc_test'
        },
        redis: {
            password: "redis",
            host: "localhost",
            port: 6379
        }
    },

    production: {
        host: "222.239.249.154",
        port: "3000",
        mysql: {
            username: 'mvc',
            password: 'mvc',
            database: 'mvc_test'
        },
        redis: {
            password: "redis",
            host: "localhost",
            port: 6379
        }
    }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];
