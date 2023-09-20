const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Importer = sequelize.define('importer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, { underscored: true });

module.exports = Importer;