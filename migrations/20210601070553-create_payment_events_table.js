'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'payment_events',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          paymentIntentId: {
            type: Sequelize.STRING,
          },
          objectId: {
            type: Sequelize.STRING,
          },
          eventType: {
            type: Sequelize.STRING,
          },
          objectType: {
            type: Sequelize.STRING,
          },
          amount: {
            type: Sequelize.INTEGER,
          },
          status: {
            type: Sequelize.STRING,
          },
          raw: {
            type: Sequelize.JSONB,
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
    await queryInterface.dropTable('payment_events');
  },
};
