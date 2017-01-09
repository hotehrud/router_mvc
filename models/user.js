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