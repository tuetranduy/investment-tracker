const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const InvestmentDetail = sequelize.define(
    'investment-detail',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amount: {
            type: Sequelize.DECIMAL,
        },
    },
    { underscored: true }
);

module.exports = InvestmentDetail;
