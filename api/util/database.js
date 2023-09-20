const Sequelize = require('sequelize');
const { DB_USERNAME, DB_PASSWORD, DB_HOST } = require('../config');

const sequelize = new Sequelize('qlptgt-db', DB_USERNAME, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST
});

module.exports = sequelize;