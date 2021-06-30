'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'promo_codes',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          discountAmount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
          },
          count: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            allowNull: false,
          },
          used: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          expires: {
            type: Sequelize.BIGINT,
            allowNull: false,
          },
          invalid: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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

    await queryInterface.addIndex('promo_codes', ['code']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('promo_codes');
  },
};
