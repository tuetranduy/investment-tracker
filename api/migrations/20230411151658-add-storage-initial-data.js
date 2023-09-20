'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert('storages', [
        { name: "Kho số 1", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 2", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 3", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 4", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 5", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 6", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 7", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 8", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 9", created_at: new Date(), updated_at: new Date() },
        { name: "Kho số 10", created_at: new Date(), updated_at: new Date() },
      ])
    ];
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
