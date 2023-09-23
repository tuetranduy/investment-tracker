const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ApiInformation = sequelize.define(
    'api-information',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        api_key: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        api_secret: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    { underscored: true }
);

module.exports = ApiInformation;
