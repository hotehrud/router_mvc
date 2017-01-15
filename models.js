const Sequelize = require('sequelize');
const sequelize = new Sequelize('mvc', 'mvc', 'mvc');

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
