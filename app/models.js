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
    member_provider: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    member_id: Sequelize.STRING(50),
    member_name: Sequelize.STRING(50),
    member_nickname: Sequelize.STRING(50),
    member_email: Sequelize.STRING(50),
    member_image: Sequelize.STRING(50),
    member_age: Sequelize.STRING(50),
    member_birthday: Sequelize.STRING(50),
    member_thumbnail: Sequelize.STRING(50),
    member_accessToken: Sequelize.STRING(100),
    member_refreshToken: Sequelize.STRING(100)
}, {
    getterMethods: {
        getToken: function() {
            return this.member_accessToken + '*' + this.member_refreshToken;
        },
        getId: function() {
            return this.member_id;
        }
    },
    setterMethods: {
        setToken: function(token) {
            this.member_accessToken = token.accessToken;
            this.member_refreshToken = token.refreshToken;
        },
        setProviderData: function(data) {
            this.member_name = data['username'] ? data['username'] : null;
            this.member_nickname = data['nickname'] ? data['nickname'] : null;
            this.member_email = data['email'] ? data['email'] : null;
            this.member_image = data['profileImage'] ? data['profileImage'] : null;
            this.member_age = data['age'] ? data['age'] : null;
            this.member_birthday = data['birthday'] ? data['birthday'] : null;
            this.member_thumbnail = data['thumbnailImage'] ? data['thumbnailImage'] : null;
        }
    },
    indexes: [
        {
            index: true,
            fields: ['member_provider']
        }
    ]

});

const Keyword = sequelize.define('keywords', {
    keyword_seq: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    keyword_name: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    keyword_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    keyword_group: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['keyword_name', 'keyword_group']
        },
        {
            index: true,
            fields: ['keyword_count']
        }
    ]

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
    search_group: Sequelize.STRING(20),
    search_title: Sequelize.STRING(50),
    search_link: Sequelize.STRING(50),
    search_desc: Sequelize.STRING(255),
    search_image: Sequelize.STRING(50),
    search_author: Sequelize.STRING(50),
    search_date: {
        type: DataTypes.DATEONLY
    }
}, {
    getterMethods: {

    },
    setterMethods: {
        setProviderData: function(data) {
            this.search_title = data['title'] ? data['title'] : null;
            this.search_link = data['link'] ? data['link'] : null;
            this.search_desc = data['desc'] ? data['desc'] : null;
            this.search_image = data['image'] ? data['image'] : null;
            this.search_author = data['author'] ? data['author'] : null;
            this.search_date = data['date'] ? data['date'] : null;
        }
    },
    indexes: [
        {
            index: true,
            fields: ['search_keyword']
        }
    ]

});

const Bookmark = sequelize.define('bookmark', {
    bookmark_seq : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookmark_id: Sequelize.INTEGER,
    bookmark_user: Sequelize.STRING(50)
}, {
    indexes: [
        {
            index: true,
            fields: ['bookmark_user']
        }
    ]

});

module.exports = {
    sequelize: sequelize,
    User: User,
    Search: Search,
    Keyword: Keyword,
    Bookmark: Bookmark
}
