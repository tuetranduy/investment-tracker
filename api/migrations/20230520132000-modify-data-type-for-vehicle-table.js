'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('vehicles', 'date_of_entry', {
                type: Sequelize.DATEONLY,
                allowNull: true,
            }),
            queryInterface.changeColumn('vehicles', 'date_of_exit', {
                type: Sequelize.DATEONLY,
                allowNull: true,
            }),
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
