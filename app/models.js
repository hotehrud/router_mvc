const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const config = require('./config/environments');

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    {
        host: config.mysql.host,
        port: config.mysql.port,
        dialect: 'mysql',
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    }
);

const User = sequelize.define('members', {
    member_seq: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    member_id: Sequelize.INTEGER,
    member_name: Sequelize.STRING(10)
});

const Keyword = sequelize.define('keywords', {
    keyword_seq: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    keyword_content: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
});

const Search = sequelize.define('contents', {
    search_seq: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    search_keyword: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    search_group: Sequelize.STRING(10),
    search_title: Sequelize.STRING(50),
    search_link: Sequelize.STRING(50),
    search_desc: Sequelize.STRING(255),
    search_image: Sequelize.STRING(50),
    search_author: Sequelize.STRING(50),
    search_date: {
        type: DataTypes.DATEONLY
    }
});

module.exports = {
    sequelize: sequelize,
    User: User,
    Search: Search,
    Keyword: Keyword
}
