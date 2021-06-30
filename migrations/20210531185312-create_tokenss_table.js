'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'tokens',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          token: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          type: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          expires: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          blacklisted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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

    await queryInterface.addIndex('tokens', ['token']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tokens');
  },
};
