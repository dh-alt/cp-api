'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'vans',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          license: {
            type: Sequelize.STRING,
          },
          make: {
            type: Sequelize.STRING,
          },
          model: {
            type: Sequelize.STRING,
          },
          year: {
            type: Sequelize.STRING,
          },
          status: {
            type: Sequelize.STRING,
            defaultValue: 'available',
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vans');
  },
};
