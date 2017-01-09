var mysql = require('mysql'),
    async = require('async');

var env       = process.env.NODE_ENV || "development_mysql",
    config    = require(__dirname + '/config/config.json')[env];

var state = {
    pool: null,
    mode: null
}

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host: config.host,
        user: config.username,
        password: config.password,
        database: mode = config.database
    });

    state.mode = mode;
    done();
}

exports.escape = function(str) {
    return mysql.escape(str);
}

exports.get = function() {
    return state.pool;
}

exports.release = function() {
    return state.pool.getConnection(function (err, connection) {

        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        //console.log('connected as id ' + connection.threadId);

        connection.release();
    });
}

// 기본 테이블, 데이터 셋팅
exports.fixtures = function(data) {
    var pool = state.pool;
    if (!pool) {
        return done(new Error('Missing database connection.'));
    }

    var names = Object.keys(data.tables);

    async.each(names, function(name, cb) {

        async.each(data.tables[name], function(row, cb) {

            var keys = Object.keys(row),
                values = keys.map(function(key) {
                    return "'" + row[key] + "'";
                });

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb);

        }, cb);

    }, done);

}

exports.drop = function(tables, done) {
    var pool = state.pool;

    if (!pool) {
        return done(new Error('Missing database connection.'));
    }

    async.each(tables, function(name, cb) {
        pool.query('DELETE * FROM ' + name, cb);
    }, done);

}