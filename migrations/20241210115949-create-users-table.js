'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-incremented field
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false, // `fullName` is required
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // `email` is required
        unique: true, // Ensures that email is unique
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // `password` is required
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Default to current time
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Default to current time
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users'); // Drop the `users` table if we need to undo the migration
  }
};
