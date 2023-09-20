'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert('importers', [
        { name: "Đội Tuần tra dẫn đoàn", created_at: new Date(), updated_at: new Date() },
        { name: "Đội Tuyên truyền - Xử lý", created_at: new Date(), updated_at: new Date() },
        { name: "Đội CSGT Đường sắt", created_at: new Date(), updated_at: new Date() },
        { name: "Đội Cảnh sát Đường thuỷ", created_at: new Date(), updated_at: new Date() },
        { name: "Trạm CSGT Hoà Hiệp", created_at: new Date(), updated_at: new Date() },
        { name: "Trạm CSGT Hoà Nhơn", created_at: new Date(), updated_at: new Date() },
        { name: "Trạm CSGT Hoà Phước", created_at: new Date(), updated_at: new Date() },
        { name: "Trạm CSGT Hoà Hải", created_at: new Date(), updated_at: new Date() },
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
