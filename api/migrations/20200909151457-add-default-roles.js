'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.bulkInsert('roles', [
        { name: "admin", created_at: new Date(), updated_at: new Date() },
        { name: "user", created_at: new Date(), updated_at: new Date() },
      ])
    ];
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
