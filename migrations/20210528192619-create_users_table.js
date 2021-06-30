'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          paymentCustomerId: {
            type: Sequelize.STRING,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          firstname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          isEmailVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          emailVerifiedAt: {
            type: Sequelize.DATE,
          },
          status: {
            type: Sequelize.STRING,
            defaultValue: 'active',
            allowNull: false,
          },
          role: {
            type: Sequelize.STRING,
            defaultValue: 'user',
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
        },
    );

    await queryInterface.addIndex('users', ['paymentCustomerId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
