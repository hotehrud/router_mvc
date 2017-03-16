const app = require('../app');
const config = require('../app/config/environments');

const syncDatabase = require('./sync-database');

require('../app/redis').init(function(err) {
    if (err) throw err;

    app.listen(config.port, () => {
        console.log('Example app listening on port ' + config.port);

        syncDatabase().then(() => {
            console.log('Database sync');
        })
    })
});
