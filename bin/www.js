const app = require('../index');
const config = require('../config/environments');

const syncDatabase = require('./sync-database');

app.listen(config.port, () => {
    console.log('Example app listening on port ' + config.port);

    syncDatabase().then(() => {
        console.log('Database sync');
    })
})