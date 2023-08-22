'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('NOTES', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'USERS',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('NOTES', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'CATEGORIES',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('NOTES', 'UserId');
    await queryInterface.removeColumn('NOTES', 'CategoryId');
  }
};
