const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const InvestmentType = sequelize.define(
    'investment-type',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    { underscored: true }
);

module.exports = InvestmentType;
