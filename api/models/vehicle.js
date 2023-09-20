const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Vehicle = sequelize.define(
    'vehicle',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        plate_number: {
            type: Sequelize.STRING(30),
            allowNull: false,
            unique: true,
        },
        vehicle_type: Sequelize.STRING(100),
        classify: Sequelize.STRING(100),
        date_of_entry: {
            type: Sequelize.DATEONLY,
        },
        date_of_exit: {
            type: Sequelize.DATEONLY,
        },
        row_no: {
            type: Sequelize.STRING(200),
        },
        note: {
            type: Sequelize.STRING(5000),
        },
        status: {
            type: Sequelize.STRING(25),
        },
    },
    { underscored: true }
);

module.exports = Vehicle;
