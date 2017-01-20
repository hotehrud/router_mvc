const Sequelize = require('sequelize');
const config = require('./config/environments');

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password
)

const User = sequelize.define('members', {
    member_seq: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    member_id: Sequelize.INTEGER,
    member_name: Sequelize.STRING(10)
});

module.exports = {
    sequelize: sequelize,
    User: User
}
