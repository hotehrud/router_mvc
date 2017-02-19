const environments = {
    development: {
        host: "localhost",
        port: "3000",
        mysql: {
            username: 'mygumi',
            password: 'mygumi*0707~!',
            database: 'mygumi',
            host: 'mygumidb.clipq5ouodgr.ap-northeast-2.rds.amazonaws.com',
            port: '3306'
        },
        redis: {
            password: "redis",
            host: "localhost",
            port: 6379
        }
    },

    test: {
        host: "localhost",
        port: "4000",
        mysql: {
            username: 'mygumi',
            password: 'mygumi*0707~!',
            database: 'mygumi',
            host: 'mygumidb.clipq5ouodgr.ap-northeast-2.rds.amazonaws.com',
            port: '3306'
        },
        redis: {
            password: "redis",
            host: "localhost",
            port: 6379
        }
    },

    production: {
        host: "localhost",
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
