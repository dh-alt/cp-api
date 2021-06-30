'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'cars',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
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
            defaultValue: 'primary',
            allowNull: false,
          },
          userId: {
            type: Sequelize.BIGINT,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'CASCADE',
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
    await queryInterface.dropTable('cars');
  },
};
