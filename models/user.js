var db = require('../db.js');

exports.index = function(done) {

    db.get().query('select * from members', function(err, result) {
        db.release();

        if (result.length == 0) {
            done('empty');
        } else {
            done(null, result);
        }

    })
}

exports.show = function(id, done) {

    db.get().query('select * from members where member_id = 1', function(err, result) {
        db.release();

        if (result.length == 0) {
            done('empty');
        } else {
            done(null, result);
        }

    })
}